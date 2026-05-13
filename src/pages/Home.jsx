import React from 'react';
import { useLang } from "@/lib/i18n.jsx";
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Zap, CloudUpload, ArrowRight, Server, Activity,
  Lock, Eye, Database, Monitor, Globe, Clock, CheckCircle2,
  BarChart3, Users, Award, Headphones
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import SEO from '../components/SEO';

export default function Home() {
  const { t } = useLang();
  const page = t.pages?.home || {};

  return (
    <div className="w-full">
      <SEO
        title="Enterprise Infrastructure, Security & Web Management"
        description="NORTPLEX provides 24/7 enterprise-grade web infrastructure management, advanced cybersecurity protection, cloud migrations, and monitoring. Based in Chișinău, Moldova."
        path="/"
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-cyan-300 font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              {page.heroBadge || "Enterprise-grade infrastructure management"}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tighter mb-8 text-white">
              {page.heroTitle || "We Manage Your Entire Web Infrastructure So You Can Focus On Business"}
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              {page.heroSubtitle || "NortPlex provides 24/7 proactive monitoring, military-grade security, and seamless cloud migrations. Stop worrying about servers and start scaling."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-black bg-white hover:scale-105 hover:bg-zinc-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                {page.heroCtaStart || "Start Free Assessment"} <ArrowRight size={18} />
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-white glass-panel hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
              >
                {page.heroCtaExplore || "Explore Services"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: page.statsUptime || 'Uptime Guarantee', value: '99.99%' },
              { label: page.statsResponse || 'Response Time', value: '< 15 mins' },
              { label: page.statsThreats || 'Threats Blocked', value: '10M+' },
              { label: page.statsRegions || 'Global Regions', value: '35+' }
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Companies */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-sm text-zinc-500 font-medium uppercase tracking-widest">{page.trustedBy || "Trusted by companies worldwide"}</p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-50 hover:opacity-70 transition-opacity duration-500">
              {[
                { name: "Shopify", w: "120" },
                { name: "Stripe", w: "90" },
                { name: "Notion", w: "100" },
                { name: "Vercel", w: "95" },
                { name: "GitLab", w: "95" },
                { name: "Cloudflare", w: "130" },
                { name: "DigitalOcean", w: "140" },
                { name: "MongoDB", w: "120" },
              ].map((company, i) => (
                <div key={i} className="text-zinc-400 font-bold text-xl md:text-2xl tracking-tight select-none" style={{ fontFamily: 'var(--font-display)' }}>
                  {company.name}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.platformTitle || "Everything Your Business Needs Online"}</h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              {page.platformSubtitle || "From building your website to protecting, optimizing, and maintaining it — Nortplex handles everything so you can focus on your business."}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Globe size={24} />, title: page.platformWebsite || "Website Creation", desc: page.platformWebsiteDesc || "Custom websites built from scratch — landing pages, business sites, e-commerce stores, and web apps with modern design and SEO.", color: "indigo" },
              { icon: <ShieldCheck size={24} />, title: page.platformSecurity || "Security & Protection", desc: page.platformSecurityDesc || "DDoS protection, firewall, malware scanning, and vulnerability detection keeping your website safe 24/7.", color: "blue" },
              { icon: <Zap size={24} />, title: page.platformSpeed || "Speed & Performance", desc: page.platformSpeedDesc || "CDN, caching, database tuning, and server optimization that make your website load in under 1 second.", color: "cyan" },
              { icon: <Server size={24} />, title: page.platformServer || "Server Management", desc: page.platformServerDesc || "Updates, backups, monitoring, and infrastructure management so you never worry about technical issues.", color: "purple" },
              { icon: <CloudUpload size={24} />, title: page.platformMigration || "Migration & Hosting", desc: page.platformMigrationDesc || "Zero-downtime migrations to modern cloud platforms. We move your website safely and make it faster.", color: "emerald" },
              { icon: <Monitor size={24} />, title: page.platformMonitoring || "24/7 Monitoring", desc: page.platformMonitoringDesc || "Real-time uptime checks, instant alerts, and automated failover. Your website is always online and fast.", color: "orange" },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="glass-panel p-6 rounded-2xl h-full group hover:border-white/15 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${
                    item.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                    item.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                    item.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' :
                    item.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-400' :
                    item.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                    'bg-orange-500/10 text-orange-400'
                  }`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-28 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.featuresTitle || "Built for the Modern Web"}</h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              {page.featuresSubtitle || "Everything you need to ensure your applications run flawlessly, securely, and cost-effectively."}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="glass-panel p-8 rounded-3xl h-full hover:-translate-y-2 hover:border-blue-500/30 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{page.feature1Title || "Advanced Security"}</h3>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  {page.feature1Desc || "Military-grade DDoS protection, WAF implementation, and continuous vulnerability scanning to keep your data safe from every known attack vector."}
                </p>
                <Link href="/security" className="text-blue-400 font-medium inline-flex items-center gap-2 hover:text-blue-300">
                  {page.learnMore || "Learn more"} <ArrowRight size={16} />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="glass-panel p-8 rounded-3xl h-full hover:-translate-y-2 hover:border-cyan-500/30 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px]"></div>
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Server size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{page.feature2Title || "Website Management"}</h3>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  {page.feature2Desc || "Proactive server patching, automated backups, and 24/7 performance tuning. We handle the DevOps complexity so you can focus on growth."}
                </p>
                <Link href="/management" className="text-cyan-400 font-medium inline-flex items-center gap-2 hover:text-cyan-300">
                  {page.learnMore || "Learn more"} <ArrowRight size={16} />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="glass-panel p-8 rounded-3xl h-full hover:-translate-y-2 hover:border-purple-500/30 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CloudUpload size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{page.feature3Title || "Cloud Migration"}</h3>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  {page.feature3Desc || "Seamless, zero-downtime migrations to AWS, GCP, or Azure. We architect for scale, cost-efficiency, and resilience with tested rollback plans."}
                </p>
                <Link href="/migration" className="text-purple-400 font-medium inline-flex items-center gap-2 hover:text-purple-300">
                  {page.learnMore || "Learn more"} <ArrowRight size={16} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Businesses Trust Nortplex */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.whyTitle || "Why Businesses Trust NortPlex"}</h2>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                {page.whySubtitle || "Infrastructure failures cost businesses an average of $5,600 per minute. Companies choose Nortplex because we eliminate that risk entirely with proactive monitoring, battle-tested security, and a team that treats your systems like their own."}
              </p>

              <div className="space-y-6">
                {[
                  { icon: <Award size={20} />, title: page.whyTrackTitle || "Proven Track Record", desc: page.whyTrackDesc || "200+ successful migrations, zero data loss incidents, and 99.99% uptime across all managed clients." },
                  { icon: <Users size={20} />, title: page.whyTeamTitle || "Dedicated Expert Team", desc: page.whyTeamDesc || "Senior DevOps and security engineers assigned to your account. No junior staff, no outsourcing." },
                  { icon: <Headphones size={20} />, title: page.whySupportTitle || "24/7 Human Support", desc: page.whySupportDesc || "Real engineers available around the clock. Critical incidents acknowledged within 15 minutes, guaranteed." },
                  { icon: <BarChart3 size={20} />, title: page.whyReportTitle || "Transparent Reporting", desc: page.whyReportDesc || "Monthly performance reports, real-time dashboards, and clear SLA tracking so you always know where you stand." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2} className="relative">
              <div className="absolute inset-0 bg-blue-600/15 blur-[100px] rounded-full" />
              <div className="glass-panel p-8 rounded-3xl relative z-10">
                <div className="text-center mb-8">
                  <div className="text-6xl font-black text-white mb-2">150+</div>
                  <p className="text-zinc-400 font-medium">{page.companiesProtected || "Companies Protected Worldwide"}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: page.avgTenure || "Average Client Tenure", value: "3.2 years" },
                    { label: page.clientSat || "Client Satisfaction", value: "98.7%" },
                    { label: page.incidentsPrevented || "Incidents Prevented", value: "12,000+" },
                    { label: page.dataRecovered || "Data Recovered", value: "100%" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.03] rounded-xl p-4 border border-white/5 text-center">
                      <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                      <p className="text-xs text-zinc-500">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="mt-8 p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                  <p className="text-zinc-300 text-sm leading-relaxed italic mb-4">
                    "{page.testimonial || "Since partnering with NortPlex, we haven't had a single minute of unplanned downtime. Their security team blocked a major DDoS attack during our product launch without us even noticing."}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">JK</div>
                    <div>
                      <p className="text-white font-semibold text-sm">{page.testimonialName || "James Keller"}</p>
                      <p className="text-zinc-500 text-xs">{page.testimonialRole || "CTO, Meridian Commerce"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Professional Maintenance Services */}
      <section className="py-28 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.maintenanceTitle || "Professional Maintenance Services"}</h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              {page.maintenanceSubtitle || "Every aspect of your web infrastructure is continuously maintained, optimized, and protected."}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(page.maintenanceServices || [
                "24/7 Server Monitoring & Alerting",
                "Automated Security Patching",
                "Database Performance Tuning",
                "SSL Certificate Management",
                "CDN Configuration & Optimization",
                "Automated Backup & Recovery",
                "Load Balancer Management",
                "DNS Management & Failover",
                "Application Performance Profiling",
                "Container Orchestration",
                "Log Aggregation & Analysis",
                "Compliance & Audit Support"
              ]).map((service, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 hover:bg-white/[0.04] transition-all">
                  <CheckCircle2 size={18} className="text-blue-400 shrink-0" />
                  <span className="text-zinc-300 text-sm font-medium">{service}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/30 blur-[100px] -z-10"></div>

          <AnimatedSection className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">{page.ctaTitle || "Ready to Upgrade Your Infrastructure?"}</h2>
            <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
              {page.ctaSubtitle || "Join leading companies that trust NortPlex with their critical operations. Get a free infrastructure audit today."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex px-8 py-4 rounded-full font-bold text-lg text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] transition-all duration-300 hover:-translate-y-1"
              >
                {page.ctaButton || "Get a Free Infrastructure Audit"}
              </Link>
              <Link
                href="/pricing"
                className="inline-flex px-8 py-4 rounded-full font-bold text-lg text-white glass-panel hover:bg-white/10 transition-all duration-300"
              >
                {page.ctaPricing || "View Pricing"}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
