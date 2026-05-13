import React from 'react';
import { Link } from 'wouter';
import {
  Shield, ServerCog, CloudLightning, Activity, Database, Lock,
  Wrench, HardDrive, Gauge, Monitor, RefreshCw, Cpu,
  ArrowRight, CheckCircle2, Clock, Zap, Globe, PenTool
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { useLang } from "@/lib/i18n.jsx";
import SEO from '../components/SEO';

const services = [
  {
    title: "Website Creation",
    description: "Custom website design and development from scratch. Business sites, landing pages, e-commerce stores, and web applications built with modern technologies, responsive design, and SEO optimization included.",
    icon: <PenTool size={32} />,
    link: "/pricing",
    color: "indigo"
  },
  {
    title: "Website Maintenance",
    description: "Continuous software updates, plugin patching, CMS upgrades, and dependency management. We ensure your application stack remains current, secure, and performant without any effort on your part.",
    icon: <Wrench size={32} />,
    link: "/management",
    color: "cyan"
  },
  {
    title: "Infrastructure Monitoring",
    description: "24/7 real-time monitoring of server health, network performance, resource utilization, and application responsiveness. Instant alerts and automated incident escalation keep your systems running flawlessly.",
    icon: <Monitor size={32} />,
    link: "/management",
    color: "blue"
  },
  {
    title: "Performance Optimization",
    description: "Global CDN implementation, advanced caching strategies, database query optimization, image compression, and code minification. We drop your page load times below 1 second.",
    icon: <Gauge size={32} />,
    link: "/contact",
    color: "green"
  },
  {
    title: "Backup Systems",
    description: "Multi-region automated backup strategies with incremental snapshots, geographic redundancy, encryption at rest, and point-in-time recovery. Your data is always safe and instantly restorable.",
    icon: <HardDrive size={32} />,
    link: "/management",
    color: "purple"
  },
  {
    title: "Database Maintenance",
    description: "Index optimization, query performance tuning, replication health monitoring, automated cleanup routines, and capacity planning for MySQL, PostgreSQL, MongoDB, and Redis deployments.",
    icon: <Database size={32} />,
    link: "/management",
    color: "orange"
  },
  {
    title: "Server Optimization",
    description: "Kernel tuning, resource allocation optimization, connection pooling, memory management, and process scheduling to extract maximum performance from your infrastructure.",
    icon: <Cpu size={32} />,
    link: "/management",
    color: "rose"
  },
  {
    title: "Advanced Security",
    description: "Enterprise-grade protection against DDoS attacks, SQL injection, XSS, and malware. We implement zero-trust architectures, WAF rules, intrusion detection, and continuous vulnerability scanning.",
    icon: <Shield size={32} />,
    link: "/security",
    color: "blue"
  },
  {
    title: "Uptime Monitoring",
    description: "Multi-location synthetic monitoring with HTTP, TCP, and DNS checks running every 30 seconds. Automated failover, status page management, and SLA compliance reporting.",
    icon: <Activity size={32} />,
    link: "/management",
    color: "emerald"
  },
  {
    title: "Cloud Migration",
    description: "Zero-downtime migrations from legacy hosting to AWS, GCP, or Azure. We handle server transfers, database migration, DNS cutover, and post-migration optimization.",
    icon: <CloudLightning size={32} />,
    link: "/migration",
    color: "purple"
  },
];

const process = [
  { step: "01", title: "Assessment", desc: "We audit your current infrastructure, identify bottlenecks, security gaps, and optimization opportunities." },
  { step: "02", title: "Strategy", desc: "A custom plan is created outlining the services, timelines, and KPIs tailored to your business requirements." },
  { step: "03", title: "Implementation", desc: "Our engineering team deploys monitoring, security layers, backup systems, and optimization improvements." },
  { step: "04", title: "Ongoing Management", desc: "24/7 proactive monitoring, maintenance, and continuous improvement with monthly performance reports." },
];

export default function Services() {
  const { t } = useLang();
  const page = t.pages?.services || {};

  return (
    <>
      <SEO title="Our Services — Infrastructure, Security & Cloud" description="Comprehensive web infrastructure management services by NORTPLEX. Advanced security, cloud migration, server management, and performance optimization." path="/services" />
      <div className="w-full">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-28 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-cyan-300 font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              End-to-End Infrastructure Services
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              {page.title || "Our Services"}
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              {page.subtitle || "Comprehensive, end-to-end infrastructure management designed for high-growth companies that cannot afford downtime. Every service is enterprise-grade and critical for business operations."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.07}>
                <Link href={service.link}>
                  <div className="glass-panel p-8 rounded-3xl h-full flex flex-col group hover:-translate-y-2 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                      service.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' :
                      service.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                      service.color === 'green' ? 'bg-emerald-500/10 text-emerald-400' :
                      service.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                      service.color === 'orange' ? 'bg-orange-500/10 text-orange-400' :
                      service.color === 'rose' ? 'bg-rose-500/10 text-rose-400' :
                      service.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-400' :
                      'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{page.list?.[index]?.title || service.title}</h3>
                    <p className="text-zinc-400 leading-relaxed flex-grow text-sm">
                      {page.list?.[index]?.description || service.description}
                    </p>
                    <div className="mt-8 font-medium text-white flex items-center gap-2 group-hover:gap-4 transition-all text-sm">
                      {page.explore || "Explore"} <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-28 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.howWeWorkTitle || "How We Work"}</h2>
            <p className="text-lg text-zinc-400">
              {page.howWeWorkSubtitle || "A structured approach that delivers measurable results from day one."}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.12}>
                <div className="glass-panel p-8 rounded-3xl h-full relative overflow-hidden group hover:border-blue-500/20 transition-all">
                  <div className="absolute top-4 right-4 text-6xl font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors">{item.step}</div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-sm font-bold mb-6">{item.step}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{page.processSteps?.[i]?.title || item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{page.processSteps?.[i]?.desc || item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Nortplex */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.whyTitle || "Why Companies Choose Nortplex"}</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Clock size={20} />, title: "24/7 Expert Support", desc: "Senior DevOps and security engineers available around the clock for incident response and technical guidance." },
                { icon: <Zap size={20} />, title: "Sub-15 Minute SLA", desc: "Critical incidents are acknowledged and under active investigation within 15 minutes, guaranteed." },
                { icon: <Shield size={20} />, title: "Enterprise Security", desc: "Military-grade protection including WAF, DDoS mitigation, IDS, and zero-trust architecture as standard." },
                { icon: <RefreshCw size={20} />, title: "Zero-Downtime Updates", desc: "Rolling deployments, blue-green strategies, and canary releases ensure updates never interrupt your service." },
                { icon: <Activity size={20} />, title: "Proactive Monitoring", desc: "We detect and resolve issues before they impact users. Most incidents are fixed before you even know they existed." },
                { icon: <CheckCircle2 size={20} />, title: "Compliance Ready", desc: "SOC2, HIPAA, GDPR, and PCI-DSS compliant infrastructure management with full audit trails." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{page.whyItems?.[i]?.title || item.title}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{page.whyItems?.[i]?.desc || item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/30 blur-[100px] -z-10" />
          <AnimatedSection className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">{page.ctaTitle || "Ready to Get Started?"}</h2>
            <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
              {page.ctaSubtitle || "Get a free infrastructure audit and discover how Nortplex can transform your web operations."}
            </p>
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 rounded-full font-bold text-lg text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] transition-all duration-300 hover:-translate-y-1"
            >
              {page.ctaButton || "Get Free Infrastructure Audit"}
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
    </>
  );
}