"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    _hsq?: unknown[];
  }
}

export type TrackingEvent =
  | "page_view"
  | "view_content"
  | "add_to_cart"
  | "begin_checkout"
  | "add_payment_info"
  | "purchase"
  | "sign_up"
  | "lead"
  | "complete_registration"
  | "search"
  | "view_template"
  | "use_template";

export type TrackParams = {
  value?: number;
  currency?: string;
  contentId?: string;
  contentName?: string;
  contentCategory?: string;
  contents?: { id: string; quantity: number; price?: number }[];
  numItems?: number;
  email?: string;
  searchQuery?: string;
  customerId?: string;
};

const isClient = () => typeof window !== "undefined";

const fbqEventMap: Record<TrackingEvent, string> = {
  page_view: "PageView",
  view_content: "ViewContent",
  add_to_cart: "AddToCart",
  begin_checkout: "InitiateCheckout",
  add_payment_info: "AddPaymentInfo",
  purchase: "Purchase",
  sign_up: "CompleteRegistration",
  lead: "Lead",
  complete_registration: "CompleteRegistration",
  search: "Search",
  view_template: "ViewContent",
  use_template: "AddToCart",
};

export const trackEvent = (event: TrackingEvent, params: TrackParams = {}) => {
  if (!isClient()) return;

  if (window.gtag) {
    const gaParams: Record<string, unknown> = {
      value: params.value,
      currency: params.currency || "TRY",
      items: params.contents?.map((c) => ({
        item_id: c.id,
        quantity: c.quantity,
        price: c.price,
      })),
    };
    if (params.contentName) gaParams.content_name = params.contentName;
    if (params.contentCategory) gaParams.content_category = params.contentCategory;
    if (params.searchQuery) gaParams.search_term = params.searchQuery;

    window.gtag("event", event, gaParams);
  }

  if (window.fbq) {
    const fbqEvent = fbqEventMap[event];
    const fbqParams: Record<string, unknown> = {
      value: params.value,
      currency: params.currency || "TRY",
    };
    if (params.contentId) fbqParams.content_ids = [params.contentId];
    if (params.contentName) fbqParams.content_name = params.contentName;
    if (params.contentCategory) fbqParams.content_category = params.contentCategory;
    if (params.contents) {
      fbqParams.contents = params.contents.map((c) => ({ id: c.id, quantity: c.quantity }));
      fbqParams.num_items = params.numItems || params.contents.length;
    }
    if (params.searchQuery) fbqParams.search_string = params.searchQuery;

    window.fbq("track", fbqEvent, fbqParams);
  }

  if (window.dataLayer) {
    window.dataLayer.push({ event, ...params });
  }
};

export const identifyUser = (userId: string, email?: string) => {
  if (!isClient()) return;
  if (window.gtag) {
    window.gtag("set", "user_properties", { user_id: userId });
  }
  if (window.fbq && email) {
    window.fbq("init", process.env.NEXT_PUBLIC_META_PIXEL_ID || "", { em: email });
  }
};

export type StoredUtm = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  fbclid?: string;
  gclid?: string;
  captured_at?: string;
  landing_page?: string;
};

export const getStoredUtm = (): StoredUtm | null => {
  if (!isClient()) return null;
  try {
    const raw = localStorage.getItem("mindid_utm");
    if (!raw) return null;
    return JSON.parse(raw) as StoredUtm;
  } catch {
    return null;
  }
};
