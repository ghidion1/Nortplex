import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie, Shield, BarChart2, Settings2, Megaphone, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { COOKIE_CATEGORIES } from "@/hooks/useCookieConsent";
import { useCookieConsentContext } from "@/context/CookieConsentContext";

const categoryIcons = {
  necessary: Shield,
  analytics: BarChart2,
  functional: Settings2,
  marketing: Megaphone,
};

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
        disabled
          ? "cursor-not-allowed opacity-60 bg-blue-600"
          : checked
          ? "cursor-pointer bg-blue-600"
          : "cursor-pointer bg-zinc-700"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function CategoryRow({ category, enabled, onChange }) {
  const [open, setOpen] = useState(false);
  const Icon = categoryIcons[category.id] || Cookie;

  return (
    <div className="border border-white/[0.08] rounded-xl overflow-hidden">
      <div className="flex items-center gap-4 p-4">
        <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0">
          <Icon size={16} className="text-blue-400" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">{category.label}</span>
            {category.required && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Always On
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Toggle
            checked={enabled}
            onChange={onChange}
            disabled={category.required}
          />
          <button
            onClick={() => setOpen((o) => !o)}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-label="Toggle details"
          >
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 text-xs text-zinc-400 leading-relaxed border-t border-white/[0.05] pt-3">
              {category.description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CookiePreferencesModal() {
  const { showModal, closeModal, consent, acceptAll, rejectNonEssential, saveCustom } =
    useCookieConsentContext();

  const [prefs, setPrefs] = useState({
    necessary: true,
    analytics: false,
    functional: false,
    marketing: false,
  });

  // Sync with current consent when modal opens
  useEffect(() => {
    if (showModal && consent) {
      setPrefs({ ...consent, necessary: true });
    }
  }, [showModal, consent]);

  function handleToggle(id, val) {
    setPrefs((p) => ({ ...p, [id]: val }));
  }

  if (!showModal) return null;

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
          >
            <div className="w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl bg-zinc-900 border border-white/[0.1] shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Cookie size={16} className="text-blue-400" />
                  </div>
                  <h2 id="cookie-modal-title" className="text-base font-bold text-white">
                    Cookie Preferences
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.05] transition-all"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  We use cookies to enhance your experience. Choose which categories you consent to.
                  Strictly necessary cookies are always active. See our{" "}
                  <Link href="/cookies" onClick={closeModal} className="text-blue-400 hover:underline">
                    Cookie Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" onClick={closeModal} className="text-blue-400 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>

                {Object.values(COOKIE_CATEGORIES).map((cat) => (
                  <CategoryRow
                    key={cat.id}
                    category={cat}
                    enabled={prefs[cat.id]}
                    onChange={(val) => handleToggle(cat.id, val)}
                  />
                ))}
              </div>

              {/* Footer buttons */}
              <div className="px-6 py-4 border-t border-white/[0.08] flex flex-col sm:flex-row gap-2">
                <button
                  onClick={rejectNonEssential}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/20 text-sm font-medium transition-all"
                >
                  Reject Non-Essential
                </button>
                <button
                  onClick={() => saveCustom(prefs)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-sm font-medium transition-all"
                >
                  Save Preferences
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all"
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
