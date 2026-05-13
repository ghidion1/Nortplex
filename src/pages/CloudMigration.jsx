import React from 'react';
import { useLang } from "@/lib/i18n.jsx";
import { Link } from 'wouter';
import {
  CloudUpload, ArrowRightLeft, Boxes, Zap, ArrowRight,
  CheckCircle2, Database, Globe, RefreshCw, ShieldCheck,
  Server, Clock, AlertTriangle, Gauge, HardDrive, Network
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import SEO from '../components/SEO';

const migrationTypes = [
  {
    icon: <Server size={24} />,
    title: "Server-to-Server Transfer",
    desc: "Full-stack migration between hosting providers including application code, databases, configurations, cron jobs, SSL certificates, and DNS records.",
    color: "purple"
  },
  {
    icon: <Boxes size={24} />,
    title: "Platform Migration",
    desc: "Move from shared hosting, VPS, or dedicated servers to modern cloud platforms like AWS, GCP, or Azure with containerized architectures.",
    color: "blue"
  },
  {
    icon: <Database size={24} />,
    title: "Database Migration",
    desc: "Schema migration, data transformation, replication setup, and performance optimization for MySQL, PostgreSQL, MongoDB, and NoSQL transitions.",
    color: "cyan"
  },
  {
    icon: <Globe size={24} />,
    title: "DNS Management",
    desc: "Zero-downtime DNS cutover with TTL pre-staging, CNAME flattening, geo-routing configuration, and automated health check failover.",
    color: "emerald"
  },
  {
    icon: <Gauge size={24} />,
    title: "Post-Migration Optimization",
    desc: "After migration, we optimize caching layers, CDN configuration, database indexes, and application performance to exceed pre-migration benchmarks.",
    color: "orange"
  },
  {
    icon: <RefreshCw size={24} />,
    title: "Rollback Safety Systems",
    desc: "Every migration includes tested rollback procedures. If anything goes wrong, we restore your original environment within minutes, not hours.",
    color: "red"
  }
];

const risks = [
  { title: "Data Loss", desc: "Incomplete database transfers or corrupted backups can result in permanent data loss affecting customer records and transactions." },
  { title: "Extended Downtime", desc: "Poor planning leads to hours or days of downtime during DNS propagation, database sync, and configuration debugging." },
  { title: "Broken Functionality", desc: "Missing environment variables, incompatible PHP/Node versions, or misconfigured file permissions cause cascading application failures." },
  { title: "SEO Damage", desc: "Incorrect redirects, missing SSL certificates, or duplicate content during migration can tank your search engine rankings overnight." },
  { title: "Security Exposure", desc: "Temporary misconfigurations during migration can expose databases, admin panels, and API keys to attackers." },
  { title: "Performance Degradation", desc: "Without proper optimization, migrated sites often run slower than before due to suboptimal server configuration and missing caching." },
];

export default function CloudMigration() {
  const { t } = useLang();
  const page = t.pages?.cloudMigration || {};
  return (
    <>
      <SEO title="Cloud Migration Services" description="Zero-downtime cloud migration by NORTPLEX. Seamless migrations to AWS, GCP, and Azure with expert architecture and rollback plans." path="/migration" />
      <div className="w-full">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-28 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 font-medium text-sm border border-purple-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                {page.badge || "Zero-Downtime Migration"}
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
                {page.title || "Seamless Migration to Modern Infrastructure"}
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 mb-8 leading-relaxed max-w-xl">
                {page.desc || "Move away from legacy hardware. Nortplex architects and executes complex website migrations to modern cloud platforms with zero downtime. Containerization, serverless, and edge computing made accessible."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold bg-white text-black hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                  {page.cta || "Plan Your Migration"} <ArrowRight size={18} />
                </Link>
                <Link href="/case-studies" className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white glass-panel hover:bg-white/10 transition-all duration-300">
                  {page.viewCaseStudies || "View Case Studies"}
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2} className="relative">
              <div className="absolute inset-0 bg-purple-600/20 blur-[100px] rounded-full" />
              <div className="glass-panel p-8 rounded-3xl relative z-10">
                {/* Migration visual */}
                <div className="flex items-center justify-between mb-10 text-zinc-500">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700">
                      <Boxes size={36} />
                    </div>
                    <span className="text-sm font-medium text-center">{(page.legacyLabel || "Legacy\nInfrastructure").split("\n").map((line, i, arr) => <React.Fragment key={i}>{line}{i < arr.length - 1 && <br/>}</React.Fragment>)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400 flex-1 mx-4">
                    <span className="h-[2px] flex-1 bg-gradient-to-r from-zinc-700 to-purple-500/50 rounded" />
                    <ArrowRightLeft size={24} className="animate-pulse shrink-0" />
                    <span className="h-[2px] flex-1 bg-gradient-to-l from-zinc-700 to-purple-500/50 rounded" />
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/50 text-purple-300">
                      <CloudUpload size={36} />
                    </div>
                    <span className="text-sm font-medium text-white text-center">{(page.modernLabel || "Modern\nCloud").split("\n").map((line, i, arr) => <React.Fragment key={i}>{line}{i < arr.length - 1 && <br/>}</React.Fragment>)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-start gap-4">
                    <Zap className="text-purple-400 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-white font-semibold mb-1">{page.guaranteeTitle || "Zero-Downtime Guarantee"}</h4>
                      <p className="text-sm text-zinc-400">{page.guaranteeDesc || "Blue-green deployments ensure your users never experience a service interruption during the switch."}</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-4">
                    <ShieldCheck className="text-blue-400 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-white font-semibold mb-1">{page.rollbackTitle || "Tested Rollback Plan"}</h4>
                      <p className="text-sm text-zinc-400">{page.rollbackDesc || "Every migration has a verified fallback. If anything fails, your original environment is restored in minutes."}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "200+", label: "Migrations Completed" },
              { value: "0", label: "Data Loss Incidents" },
              { value: "< 30s", label: "Average DNS Cutover" },
              { value: "100%", label: "Rollback Success Rate" },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">{page.statsLabels?.[i] || stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Types */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.servicesTitle || "Migration Services"}</h2>
            <p className="text-lg text-zinc-400">
              {page.servicesSubtitle || "Whether you're moving between hosting providers, upgrading to the cloud, or restructuring your database architecture, Nortplex handles every step with precision."}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {migrationTypes.map((svc, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="glass-panel p-8 rounded-3xl h-full group hover:-translate-y-2 transition-all duration-300 hover:border-purple-500/20">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                    svc.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                    svc.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                    svc.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' :
                    svc.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                    svc.color === 'orange' ? 'bg-orange-500/10 text-orange-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {svc.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{page.migrationTypes?.[i]?.title || svc.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">{page.migrationTypes?.[i]?.desc || svc.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Process */}
      <section className="py-28 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.processTitle || "Our Migration Process"}</h2>
            <p className="text-lg text-zinc-400">
              {page.processSubtitle || "A battle-tested 5-phase methodology that eliminates risk and guarantees zero-downtime transitions."}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: "01", title: "Discovery & Audit", desc: "Full infrastructure mapping, dependency analysis, and risk assessment." },
              { step: "02", title: "Architecture Planning", desc: "Design target environment optimized for performance and cost." },
              { step: "03", title: "Staging & Testing", desc: "Complete migration rehearsal on staging with automated test suites." },
              { step: "04", title: "Live Migration", desc: "Blue-green deployment with real-time monitoring and instant rollback." },
              { step: "05", title: "Optimization", desc: "Post-migration performance tuning, monitoring, and documentation." },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="glass-panel p-6 rounded-2xl h-full relative overflow-hidden group hover:border-purple-500/20 transition-all">
                  <div className="absolute top-3 right-3 text-4xl font-black text-white/[0.04] group-hover:text-white/[0.07] transition-colors">{item.step}</div>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 text-sm font-bold mb-4">{item.step}</div>
                  <h3 className="text-white font-bold mb-2">{page.processSteps?.[i]?.title || item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{page.processSteps?.[i]?.desc || item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why DIY Migrations Fail */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left" className="lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 font-medium text-sm border border-red-500/20 mb-6">
                <AlertTriangle size={14} />
                {page.pitfallsBadge || "Common Pitfalls"}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.diyTitle || "Why DIY Migrations Break Websites"}</h2>
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                {page.diyDesc1 || "Website migrations are among the most complex operations in web engineering. Even experienced developers frequently underestimate the number of moving parts involved."}
              </p>
              <p className="text-zinc-500 leading-relaxed mb-8">
                {page.diyDesc2 || "A single misconfiguration in DNS, database connection strings, file permissions, or SSL settings can take an entire business offline. Nortplex's systematic approach eliminates these risks entirely through staging environments, automated testing, and proven rollback procedures."}
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-purple-400 font-medium hover:text-purple-300 transition-colors">
                {page.diyLink || "Talk to a migration specialist"} <ArrowRight size={16} />
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="space-y-4">
                {risks.map((risk, i) => (
                  <div key={i} className="glass-panel p-6 rounded-2xl group hover:border-red-500/20 transition-all">
                    <div className="flex items-start gap-4">
                      <AlertTriangle size={20} className="text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-white font-semibold mb-1">{page.risks?.[i]?.title || risk.title}</h4>
                        <p className="text-zinc-400 text-sm leading-relaxed">{page.risks?.[i]?.desc || risk.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/30 blur-[100px] -z-10" />
          <AnimatedSection className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">{page.ctaTitle || "Ready to Modernize Your Stack?"}</h2>
            <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
              {page.ctaDesc || "Get a free migration assessment. We'll map your current infrastructure and design a risk-free migration plan."}
            </p>
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 rounded-full font-bold text-lg text-white bg-purple-600 hover:bg-purple-500 shadow-[0_0_40px_rgba(147,51,234,0.4)] hover:shadow-[0_0_60px_rgba(147,51,234,0.6)] transition-all duration-300 hover:-translate-y-1"
            >
              {page.ctaButton || "Get Free Migration Assessment"}
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
    </>
  );
}