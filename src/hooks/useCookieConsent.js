import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "nortplex_cookie_consent";
const CONSENT_VERSION = "1.0";

export const COOKIE_CATEGORIES = {
  necessary: {
    id: "necessary",
    label: "Strictly Necessary",
    description:
      "Essential for the website to function. Cannot be disabled. Includes session management, security tokens, and your consent preferences.",
    required: true,
  },
  analytics: {
    id: "analytics",
    label: "Analytics",
    description:
      "Help us understand how visitors use our site (Google Analytics). Data is anonymized and used only to improve performance.",
    required: false,
  },
  functional: {
    id: "functional",
    label: "Functional",
    description:
      "Remember your preferences such as language and theme so you don't have to re-select them on every visit.",
    required: false,
  },
  marketing: {
    id: "marketing",
    label: "Marketing",
    description:
      "Used to show relevant ads and track campaign effectiveness (Facebook Pixel, etc.). We currently use these minimally.",
    required: false,
  },
};

function defaultPreferences(accepted = false) {
  return {
    necessary: true, // always true
    analytics: accepted,
    functional: accepted,
    marketing: accepted,
  };
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Re-validate consent version — bump CONSENT_VERSION to force re-consent
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...data, version: CONSENT_VERSION, timestamp: Date.now() })
    );
  } catch {
    // localStorage blocked (private browsing etc.) — fail silently
  }
}

export function useCookieConsent() {
  const [loaded, setLoaded] = useState(false);
  // null = not decided yet, object = decided
  const [consent, setConsent] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      setConsent(stored.preferences);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
    setLoaded(true);
  }, []);

  // Load tracking scripts once consent is granted
  useEffect(() => {
    if (!consent) return;
    if (consent.analytics) loadGoogleAnalytics();
    if (consent.marketing) loadFacebookPixel();
  }, [consent]);

  const acceptAll = useCallback(() => {
    const prefs = defaultPreferences(true);
    setConsent(prefs);
    saveToStorage({ preferences: prefs });
    setShowBanner(false);
    setShowModal(false);
  }, []);

  const rejectNonEssential = useCallback(() => {
    const prefs = defaultPreferences(false);
    setConsent(prefs);
    saveToStorage({ preferences: prefs });
    setShowBanner(false);
    setShowModal(false);
  }, []);

  const saveCustom = useCallback((prefs) => {
    const final = { ...prefs, necessary: true };
    setConsent(final);
    saveToStorage({ preferences: final });
    setShowBanner(false);
    setShowModal(false);
  }, []);

  const openPreferences = useCallback(() => {
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return {
    loaded,
    consent,
    showBanner,
    showModal,
    acceptAll,
    rejectNonEssential,
    saveCustom,
    openPreferences,
    closeModal,
  };
}

// ─── Tracking loaders ────────────────────────────────────────────────────────
// Replace GA_MEASUREMENT_ID and FB_PIXEL_ID with your real IDs.

function loadGoogleAnalytics() {
  const GA_ID = "G-1KBSP6CVW7"; // TODO: replace with real Measurement ID
  if (document.getElementById("ga-script")) return; // already loaded

  const script1 = document.createElement("script");
  script1.id = "ga-script";
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script1);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });
}

function loadFacebookPixel() {
  const FB_PIXEL_ID = "XXXXXXXXXXXXXXXXXX"; // TODO: replace with real Pixel ID
  if (document.getElementById("fb-pixel")) return;

  /* eslint-disable */
  !function(f,b,e,v,n,t,s){
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.id="fb-pixel";t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
  }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  window.fbq("init", FB_PIXEL_ID);
  window.fbq("track", "PageView");
}
