import React, { createContext, useContext } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";

const CookieConsentContext = createContext(null);

export function CookieConsentProvider({ children }) {
  const value = useCookieConsent();
  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsentContext() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsentContext must be used inside CookieConsentProvider");
  return ctx;
}
