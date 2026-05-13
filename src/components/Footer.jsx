import React, { useState } from "react";
import { Link } from "wouter";
import { useCookieConsentContext } from "@/context/CookieConsentContext";
import { motion } from "framer-motion";
import {
  Twitter, Github, Linkedin, Youtube,
  Mail, MapPin, Phone, ArrowRight,
  Shield, Zap, Globe, Clock, Cookie,
} from "lucide-react";
import logoPng from "../assets/logo_no_bg.png";
import { useLang, languages } from "@/lib/i18n.jsx";

const stats = [
  { icon: Zap,    valueKey: "99.9%", labelKey: "uptime" },
  { icon: Globe,  valueKey: "150+",  labelKey: "clients" },
  { icon: MapPin, valueKey: "32",    labelKey: "countries" },
  { icon: Clock,  valueKey: "24/7",  labelKey: "support" },
];

export default function Footer() {
  const { t, lang, setLang } = useLang();
  const { openPreferences } = useCookieConsentContext();
  const f = t.footer;
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === lang);

  function handleSubscribe(e) {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  }

  return (
    <footer className="relative bg-zinc-950 overflow-hidden" role="contentinfo" itemScope itemType="https://schema.org/WPFooter">
      {/* Ambient glows */}
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] bg-purple-900/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Stats bar */}
      <div className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, valueKey, labelKey }) => (
              <motion.div
                key={labelKey}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Icon size={18} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white tracking-tight">{valueKey}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{f.stats[labelKey]}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-5 outline-none group w-fit">
              <div className="flex items-center justify-center w-10 h-10 group-hover:scale-110 transition-transform duration-300">
                <img src={logoPng} alt="NORTPLEX Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" loading="lazy" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                Nort<span className="font-light text-cyan-400">Plex</span>
              </span>
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-sm">{f.tagline}</p>

            <div className="flex items-center gap-3 mb-8">
              {[
                { Icon: Twitter,  color: "hover:text-sky-400  hover:border-sky-400/30", label: "Twitter" },
                { Icon: Github,   color: "hover:text-white    hover:border-white/30", label: "GitHub" },
                { Icon: Linkedin, color: "hover:text-blue-400 hover:border-blue-400/30", label: "LinkedIn" },
                { Icon: Youtube,  color: "hover:text-red-400  hover:border-red-400/30", label: "YouTube" },
              ].map(({ Icon, color, label }, i) => (
                <a key={i} href="#" aria-label={label} className={`w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-zinc-500 transition-all duration-200 ${color}`}>
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
              <h5 className="text-white font-semibold text-sm mb-1">{f.newsletter}</h5>
              <p className="text-zinc-500 text-xs leading-relaxed mb-4">{f.newsletterSub}</p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                  <Shield size={16} /> ✓ Subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2" aria-label="Newsletter subscription">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={f.emailPlaceholder}
                    required
                    aria-label="Email address"
                    className="flex-1 min-w-0 bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                  <button type="submit" aria-label="Subscribe" className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors flex items-center flex-shrink-0">
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">

            {/* Services */}
            <nav aria-label="Services">
              <h4 className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />{f.sections.services}
              </h4>
              <ul className="flex flex-col gap-3 text-sm">
                {[
                  ["/management", f.links.management],
                  ["/security",   f.links.security],
                  ["/migration",  f.links.migration],
                  ["/services",   f.links.allServices],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-1.5 group">
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200" />{label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Company */}
            <nav aria-label="Company">
              <h4 className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" />{f.sections.company}
              </h4>
              <ul className="flex flex-col gap-3 text-sm">
                {[
                  ["/about",        f.links.about],
                  ["/case-studies",  f.links.caseStudies],
                  ["/pricing",      f.links.pricing],
                  ["/status",       "Status"],
                ].map(([href, label], i) => (
                  <li key={i}>
                    <Link href={href} className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5 group">
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200" />{label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Legal */}
            <nav aria-label="Legal">
              <h4 className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />{f.sections.legal}
              </h4>
              <ul className="flex flex-col gap-3 text-sm">
                {[
                  ["/privacy", f.links.privacy],
                  ["/terms",   f.links.terms],
                  ["/cookies", f.links.cookies],
                  ["/security", f.links.security],
                ].map(([href, label], i) => (
                  <li key={i}>
                    <Link href={href} className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5 group">
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200" />{label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <nav aria-label="Contact">
              <h4 className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />{f.sections.contact}
              </h4>
              <ul className="flex flex-col gap-4 text-sm">
                <li>
                  <Link href="/contact" className="text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <Mail size={14} className="text-blue-400/60 group-hover:text-blue-400 transition-colors flex-shrink-0" />{f.links.contactUs}
                  </Link>
                </li>
                <li>
                  <a href="mailto:nortplex@gmail.com" className="text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <Mail size={14} className="text-blue-400/60 group-hover:text-blue-400 transition-colors flex-shrink-0" />nortplex@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-2 text-zinc-600">
                  <MapPin size={14} className="text-blue-400/40 mt-0.5 flex-shrink-0" />
                  <address className="text-xs leading-relaxed not-italic">
                    Strada Ștefan cel Mare 42<br />
                    Chișinău, Moldova MD-2001
                  </address>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Trust badges */}
        <div className="border-t border-white/5 pt-6 pb-6 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600">
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-emerald-500/60" />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-blue-500/60" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-purple-500/60" />
              <span>SOC2 Ready</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-cyan-500/60" />
              <span>99.99% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-orange-500/60" />
              <span>24/7 Monitoring</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">© {new Date().getFullYear()} {f.copyright}</p>
          <button
            onClick={openPreferences}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-blue-400 transition-colors"
          >
            <Cookie size={13} />
            Cookie Settings
          </button>
          <p className="text-zinc-700 text-xs hidden md:block">{f.builtFor}</p>

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/20 transition-all text-sm"
              aria-label="Change language"
            >
              <span>{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute bottom-full mb-2 right-0 w-44 rounded-xl border border-white/10 bg-zinc-900/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50"
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${lang === l.code ? "text-blue-400 bg-blue-500/10" : "text-zinc-400"}`}
                  >
                    <span className="text-base">{l.flag}</span>
                    <span>{l.label}</span>
                    {lang === l.code && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
