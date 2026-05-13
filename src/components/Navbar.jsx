import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logoPng from "../assets/logo_no_bg.png";
import { useLang, useTheme, languages } from "@/lib/i18n.jsx";
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const { t, lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const currentLang = languages.find((l) => l.code === lang);

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: t.nav.services,    path: '/services' },
    { name: t.nav.security,    path: '/security' },
    { name: t.nav.management,  path: '/management' },
    { name: t.nav.migration,   path: '/migration' },
    { name: t.nav.caseStudies, path: '/case-studies' },
    { name: t.nav.pricing,     path: '/pricing' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4 glass-panel border-b border-white/5' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group outline-none">
          <div className="relative flex items-center justify-center w-12 h-12 group-hover:scale-110 transition-transform duration-300">
            <img 
              src={logoPng} 
              alt="NortPlex Logo" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]"
            />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors duration-300">
            Nort<span className="font-light text-cyan-400">Plex</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className={`text-sm font-medium transition-colors duration-200 hover:text-white ${
                location === link.path ? 'text-white' : 'text-zinc-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {/* Language switcher */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/20 transition-all text-sm"
            >
              <span>{currentLang.flag}</span>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute top-full mt-2 right-0 w-44 rounded-xl border border-white/10 bg-zinc-900/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50"
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

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/20 transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Link
            href="/login"
            className="px-5 py-2.5 rounded-full text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-zinc-200 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            {t.nav.getStarted}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-zinc-300 hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 glass-panel border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path}
                  className="text-lg font-medium text-zinc-300 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10" />
              <div className="flex items-center justify-between">
                <Link
                  href="/login"
                  className="text-lg font-medium text-zinc-300 hover:text-white"
                >
                  Login
                </Link>
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white transition-all"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
              <Link
                href="/register"
                className="w-full text-center px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
              >
                {t.nav.getStarted}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
