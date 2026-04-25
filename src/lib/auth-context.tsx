"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export type CustomerProfile = {
  uid: string;
  email: string;
  name: string;
  company: string;
  phone: string;
  plan: "free" | "starter" | "growth" | "agency";
  credits: number;
  createdAt: Date;
};

type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  isCustomer: boolean;
  customerData: CustomerProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isCustomer: false,
  customerData: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Check admin
        try {
          const adminDoc = await getDoc(doc(db, "admins", firebaseUser.uid));
          if (adminDoc.exists()) {
            const data = adminDoc.data();
            if (data.email === firebaseUser.email && data.role) {
              setIsAdmin(true);
              setIsCustomer(false);
              setCustomerData(null);
              setLoading(false);
              return;
            }
          }
        } catch {
          // Firestore error — treat as non-admin
        }

        // Check customer
        try {
          const custDoc = await getDoc(doc(db, "mindid_customers", firebaseUser.uid));
          if (custDoc.exists()) {
            const data = custDoc.data();
            setIsCustomer(true);
            setCustomerData({
              uid: firebaseUser.uid,
              email: data.email || firebaseUser.email || "",
              name: data.name || "",
              company: data.company || "",
              phone: data.phone || "",
              plan: data.plan || "free",
              credits: data.credits ?? 0,
              createdAt: data.createdAt?.toDate?.() || new Date(),
            });
          }
        } catch {
          // Firestore error — treat as non-customer
        }

        setIsAdmin(false);
      } else {
        setUser(null);
        setIsAdmin(false);
        setIsCustomer(false);
        setCustomerData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setIsAdmin(false);
    setIsCustomer(false);
    setCustomerData(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isCustomer, customerData, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
