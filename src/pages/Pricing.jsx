import React, { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { CheckCircle2, HelpCircle, ArrowRight, Calculator, Plus, Minus } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { useLang } from "@/lib/i18n.jsx";
import SEO from '../components/SEO';

const plans = [
  {
    name: "Basic",
    desc: "For small websites that need reliable hosting and basic care.",
    price: "€49",
    period: "/mo",
    features: [
      "Uptime monitoring 24/7",
      "Weekly backups",
      "Basic SSL certificate",
      "Monthly security scan",
      "Email support (48h response)",
    ]
  },
  {
    name: "Standard",
    desc: "For growing businesses that need speed, security, and regular updates.",
    price: "€99",
    period: "/mo",
    popular: true,
    features: [
      "Everything in Basic",
      "Daily automated backups",
      "Performance optimization",
      "Firewall & DDoS protection",
      "Plugin & CMS updates",
      "Priority email support (24h)",
    ]
  },
  {
    name: "Business",
    desc: "For companies with high traffic and advanced security requirements.",
    price: "€199",
    period: "/mo",
    features: [
      "Everything in Standard",
      "Hourly backups",
      "Advanced WAF protection",
      "CDN & speed optimization",
      "Database optimization",
      "Slack support (4h response)",
      "Monthly performance report",
    ]
  },
  {
    name: "Enterprise",
    desc: "Full infrastructure management with a dedicated engineer for your team.",
    price: "€499",
    period: "/mo",
    features: [
      "Everything in Business",
      "Dedicated DevOps engineer",
      "Zero-trust security",
      "Multi-region redundancy",
      "Custom cloud architecture",
      "Phone & Slack (1h response)",
      "SOC2/GDPR compliance support",
      "Weekly strategy calls",
    ]
  }
];

const serviceItems = [
  { id: "site-landing", name: "Landing Page (1-5 pages)", price: 350, type: "once", category: "Website Creation" },
  { id: "site-business", name: "Business Website (5-15 pages)", price: 800, type: "once", category: "Website Creation" },
  { id: "site-ecommerce", name: "E-Commerce Store", price: 1500, type: "once", category: "Website Creation" },
  { id: "site-webapp", name: "Custom Web Application", price: 3000, type: "once", category: "Website Creation" },
  { id: "site-redesign", name: "Website Redesign", price: 500, type: "once", category: "Website Creation" },
  { id: "maint-basic", name: "Basic Maintenance (updates & backups)", price: 49, type: "monthly", category: "Maintenance" },
  { id: "maint-full", name: "Full Maintenance (updates, backups, optimization)", price: 99, type: "monthly", category: "Maintenance" },
  { id: "sec-basic", name: "Basic Security (SSL + firewall)", price: 29, type: "monthly", category: "Security" },
  { id: "sec-advanced", name: "Advanced Security (WAF + DDoS + scanning)", price: 79, type: "monthly", category: "Security" },
  { id: "perf-cdn", name: "CDN & Speed Optimization", price: 39, type: "monthly", category: "Performance" },
  { id: "perf-db", name: "Database Optimization", price: 49, type: "monthly", category: "Performance" },
  { id: "monitor", name: "24/7 Uptime Monitoring & Alerts", price: 19, type: "monthly", category: "Monitoring" },
  { id: "backup", name: "Daily Automated Backups", price: 25, type: "monthly", category: "Backup" },
  { id: "migration", name: "Website Migration (server to server)", price: 250, type: "once", category: "Migration" },
  { id: "migration-platform", name: "Platform Migration (e.g. to AWS/cloud)", price: 600, type: "once", category: "Migration" },
  { id: "seo-basic", name: "SEO Optimization Setup", price: 200, type: "once", category: "SEO" },
  { id: "support-priority", name: "Priority Support (4h response)", price: 59, type: "monthly", category: "Support" },
];

const faqs = [
  { q: "Can I switch plans anytime?", a: "Yes, upgrade or downgrade at any time. Changes take effect on your next billing cycle." },
  { q: "Is there a setup fee?", a: "No setup fees for any plan. You pay only what you see — no hidden costs." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards, bank transfers, and PayPal." },
  { q: "Do you offer discounts for annual payments?", a: "Yes — 20% off when you pay annually on any monthly plan." },
  { q: "What if I only need a website built?", a: "Use the Price Calculator below — pick only 'Website Creation' services. You pay a one-time fixed price, no monthly fees." },
  { q: "Can I combine a plan with extra services?", a: "Absolutely. Choose a plan for ongoing care and add one-time services like website creation or migration on top." },
];

export default function Pricing() {
  const [selected, setSelected] = useState({});
  const [openFaq, setOpenFaq] = useState(null);
  const { t } = useLang();
  const page = t.pages?.pricing || {};

  const toggleService = (id) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const { oneTimeTotal, monthlyTotal, selectedServices } = useMemo(() => {
    let once = 0, monthly = 0;
    const svcs = [];
    serviceItems.forEach(s => {
      if (selected[s.id]) {
        if (s.type === "once") once += s.price;
        else monthly += s.price;
        svcs.push(s);
      }
    });
    return { oneTimeTotal: once, monthlyTotal: monthly, selectedServices: svcs };
  }, [selected]);

  const categories = [...new Set(serviceItems.map(s => s.category))];

  return (
    <>
      <SEO title="Pricing — Transparent & Simple" description="NORTPLEX pricing plans for infrastructure management. From starter to enterprise — transparent pricing with no hidden fees." path="/pricing" />
      <div className="w-full">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-24 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              {page.title || "Clear, Honest Pricing"}
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              {page.subtitle || "Pick a plan that fits your business — or build your own price below. No hidden fees, no surprises. You see exactly what you pay."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ 4 PLANS ═══ */}
      <section className="pb-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {plans.map((plan, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className={`glass-panel p-7 rounded-3xl relative h-full flex flex-col ${
                  plan.popular
                    ? 'border-blue-500/50 shadow-[0_0_40px_rgba(37,99,235,0.15)] bg-zinc-900/80'
                    : 'bg-zinc-950/50'
                }`}>
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-xs font-bold text-white shadow-lg whitespace-nowrap">
                      {page.mostPopular || "MOST POPULAR"}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-1">{page.plans?.[i]?.name || plan.name}</h3>
                  <p className="text-zinc-400 text-sm mb-6 min-h-[2.5rem]">{page.plans?.[i]?.desc || plan.desc}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-black text-white">{page.plans?.[i]?.price || plan.price}</span>
                    <span className="text-zinc-500 font-medium">{page.plans?.[i]?.period || plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-zinc-300 text-sm">
                        <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${plan.popular ? "text-blue-400" : "text-zinc-500"}`} />
                        <span>{page.plans?.[i]?.features?.[idx] || f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`block w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                      plan.popular
                        ? 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                        : 'bg-zinc-800 text-white hover:bg-zinc-700'
                    }`}
                  >
                    {page.getStarted || "Get Started"}
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CUSTOM PRICE CALCULATOR ═══ */}
      <section className="py-28 px-6 bg-white/[0.01] border-y border-white/5" id="calculator">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-medium text-sm border border-blue-500/20 mb-6">
              <Calculator size={16} />
              {page.calcBadge || "Build Your Own Price"}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.calcTitle || "Price Calculator"}</h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              {page.calcSubtitle || "Pick only the services you need. See the exact price instantly — one-time fees and monthly costs shown separately."}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Service picker */}
              <div className="lg:col-span-2 space-y-6">
                {categories.map(cat => (
                  <div key={cat}>
                    <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {cat}
                    </h4>
                    <div className="space-y-2">
                      {serviceItems.filter(s => s.category === cat).map(svc => (
                        <button
                          key={svc.id}
                          onClick={() => toggleService(svc.id)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 ${
                            selected[svc.id]
                              ? 'bg-blue-500/10 border-blue-500/30 text-white'
                              : 'bg-white/[0.02] border-white/5 text-zinc-300 hover:border-white/15 hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                              selected[svc.id] ? 'bg-blue-500 border-blue-500' : 'border-zinc-600'
                            }`}>
                              {selected[svc.id] && <CheckCircle2 size={14} className="text-white" />}
                            </div>
                            <span className="font-medium text-sm">{svc.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`font-bold text-sm ${selected[svc.id] ? 'text-blue-400' : 'text-zinc-400'}`}>
                              €{svc.price}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              svc.type === 'once'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                            }`}>
                              {svc.type === 'once' ? (page.oneTime || 'one-time') : (page.perMonth || '/month')}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price summary (sticky) */}
              <div className="lg:sticky lg:top-28 h-fit">
                <div className="glass-panel p-6 rounded-2xl border-blue-500/20">
                  <h3 className="text-white font-bold text-lg mb-6">{page.summaryTitle || "Your Price Summary"}</h3>

                  {selectedServices.length === 0 ? (
                    <p className="text-zinc-500 text-sm mb-6">{page.summaryEmpty || "Select services to see your price."}</p>
                  ) : (
                    <div className="space-y-3 mb-6">
                      {selectedServices.map(svc => (
                        <div key={svc.id} className="flex items-center justify-between text-sm">
                          <span className="text-zinc-300 truncate pr-2">{svc.name}</span>
                          <span className="text-white font-medium whitespace-nowrap">€{svc.price}{svc.type === 'monthly' ? '/mo' : ''}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-white/10 pt-4 space-y-3">
                    {oneTimeTotal > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400 text-sm">{page.oneTimeTotal || "One-time total"}</span>
                        <span className="text-emerald-400 font-bold text-xl">€{oneTimeTotal}</span>
                      </div>
                    )}
                    {monthlyTotal > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400 text-sm">{page.monthlyTotal || "Monthly total"}</span>
                        <span className="text-purple-400 font-bold text-xl">€{monthlyTotal}/mo</span>
                      </div>
                    )}
                    {oneTimeTotal === 0 && monthlyTotal === 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500 text-sm">Total</span>
                        <span className="text-zinc-500 font-bold text-xl">€0</span>
                      </div>
                    )}
                  </div>

                  <Link
                    href="/contact"
                    className={`block w-full text-center py-3.5 rounded-xl font-bold text-sm mt-6 transition-all duration-300 ${
                      selectedServices.length > 0
                        ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.3)]'
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    {selectedServices.length > 0 ? (page.getQuote || 'Get This Quote') : (page.selectFirst || 'Select services first')}
                  </Link>

                  {selectedServices.length > 0 && (
                    <button
                      onClick={() => setSelected({})}
                      className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 mt-3 transition-colors"
                    >
                      {page.clearAll || "Clear all selections"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.faqTitle || "Frequently Asked Questions"}</h2>
          </AnimatedSection>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.04}>
                <div className="glass-panel rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-white font-semibold pr-4">{page.faqs?.[i]?.q || faq.q}</span>
                    <HelpCircle size={20} className={`text-zinc-500 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180 text-blue-400' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6">
                      <p className="text-zinc-400 text-sm leading-relaxed">{page.faqs?.[i]?.a || faq.a}</p>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/30 blur-[100px] -z-10" />
          <AnimatedSection className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">{page.ctaTitle || "Not Sure What You Need?"}</h2>
            <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
              {page.ctaSubtitle || "Contact us for a free consultation. We'll analyze your website and recommend exactly what you need — no pressure, no obligations."}
            </p>
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 rounded-full font-bold text-lg text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all duration-300 hover:-translate-y-1"
            >
              {page.ctaButton || "Get Free Consultation"}
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
    </>
  );
}