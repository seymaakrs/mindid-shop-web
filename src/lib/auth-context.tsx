"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const adminDoc = await getDoc(doc(db, "admins", firebaseUser.uid));
          if (adminDoc.exists()) {
            const data = adminDoc.data();
            if (data.email === firebaseUser.email && data.role) {
              setUser(firebaseUser);
              setIsAdmin(true);
              setLoading(false);
              return;
            }
          }
        } catch {
          // Firestore error — treat as non-admin
        }
        setUser(firebaseUser);
        setIsAdmin(false);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
