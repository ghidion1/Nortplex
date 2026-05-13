import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Link } from "wouter";
import { useCookieConsentContext } from "@/context/CookieConsentContext";
import CookiePreferencesModal from "./CookiePreferencesModal";

export default function CookieBanner() {
  const { loaded, showBanner, acceptAll, rejectNonEssential, openPreferences } =
    useCookieConsentContext();

  // Don't render anything until localStorage has been checked (avoids flash)
  if (!loaded) return null;

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            key="cookie-banner"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-[9990] p-3 sm:p-4"
            role="region"
            aria-label="Cookie consent"
            aria-live="polite"
          >
            <div className="max-w-5xl mx-auto rounded-2xl border border-white/[0.1] bg-zinc-900/95 backdrop-blur-xl shadow-2xl px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Icon + text */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mt-0.5">
                    <Cookie size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-0.5">
                      We value your privacy
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      We use cookies to enhance your browsing experience and analyze site traffic.
                      No tracking cookies load without your consent.{" "}
                      <Link
                        href="/cookies"
                        className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                      >
                        Cookie Policy
                      </Link>{" "}
                      ·{" "}
                      <Link
                        href="/privacy"
                        className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                      >
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                  <button
                    onClick={openPreferences}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-all"
                  >
                    Customize
                  </button>
                  <button
                    onClick={rejectNonEssential}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white border border-white/[0.12] hover:border-white/25 bg-white/[0.05] hover:bg-white/[0.08] transition-all"
                  >
                    Reject Non-Essential
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/30"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal is always mounted but internally controls its own visibility */}
      <CookiePreferencesModal />
    </>
  );
}
