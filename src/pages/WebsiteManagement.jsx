import React from 'react';
import { Link } from 'wouter';
import { useLang } from "@/lib/i18n.jsx";
import {
  Server, Activity, Wrench, Clock, Database, HardDrive,
  ArrowRight, CheckCircle2, BarChart3, RefreshCw, Cpu,
  Cloud, FileText, Gauge, ShieldCheck
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import SEO from '../components/SEO';

const managementServices = [
  {
    icon: <Server size={24} />,
    title: "Server Management",
    desc: "Full lifecycle server administration including provisioning, configuration, security hardening, OS patching, and performance tuning across bare metal and cloud instances.",
    color: "cyan"
  },
  {
    icon: <Cloud size={24} />,
    title: "Cloud Infrastructure Control",
    desc: "Expert management of AWS, GCP, and Azure environments. We optimize resource allocation, manage auto-scaling policies, and maintain cost efficiency across your cloud estate.",
    color: "blue"
  },
  {
    icon: <Database size={24} />,
    title: "Database Monitoring",
    desc: "Real-time query performance analysis, index optimization, replication health checks, and automated alerting for MySQL, PostgreSQL, MongoDB, and Redis clusters.",
    color: "purple"
  },
  {
    icon: <FileText size={24} />,
    title: "Log Analysis",
    desc: "Centralized log aggregation with structured parsing, anomaly detection, and custom dashboards. Trace issues across distributed systems in seconds, not hours.",
    color: "orange"
  },
  {
    icon: <HardDrive size={24} />,
    title: "Automated Backups",
    desc: "Incremental and full backup strategies with geographic redundancy, point-in-time recovery, encryption at rest, and automated restoration testing every 24 hours.",
    color: "emerald"
  },
  {
    icon: <Gauge size={24} />,
    title: "System Health Monitoring",
    desc: "Comprehensive observability across CPU, memory, disk I/O, network throughput, and application-layer metrics with intelligent alerting and capacity planning.",
    color: "rose"
  }
];

const benefits = [
  {
    title: "Eliminate Downtime",
    desc: "Proactive monitoring catches issues before they impact users. Our 99.99% uptime SLA is backed by redundancy at every layer."
  },
  {
    title: "Reduce Operational Costs",
    desc: "A dedicated infrastructure team costs $300K+ per year. Nortplex provides the same expertise at a fraction of the cost."
  },
  {
    title: "Scale Without Friction",
    desc: "Auto-scaling policies, load balancer configuration, and capacity planning ensure your infrastructure grows with your traffic."
  },
  {
    title: "Focus on Your Product",
    desc: "Stop spending engineering hours on server maintenance. Redirect that talent toward building features your customers love."
  },
  {
    title: "Compliance & Audit Ready",
    desc: "Managed logging, access controls, and change management processes keep you compliant with SOC2, HIPAA, and GDPR requirements."
  },
  {
    title: "Expert On-Call 24/7",
    desc: "Senior DevOps engineers available around the clock for incident response, escalation, and emergency infrastructure changes."
  }
];

export default function WebsiteManagement() {
  const { t } = useLang();
  const page = t.pages?.websiteManagement || {};

  return (
    <>
      <SEO title="Website & Server Management" description="Professional website and server management by NORTPLEX. 24/7 monitoring, automated backups, performance tuning, and 99.99% uptime SLA." path="/management" />
      <div className="w-full">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-28 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-medium text-sm border border-cyan-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                {page.badge || "Proactive Management"}
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
                {page.title || "Never Worry About Servers Again"}
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 mb-8 leading-relaxed max-w-xl">
                {page.desc || "We handle the grueling DevOps work. From OS patching and dependency updates to continuous performance profiling and capacity planning. Nortplex ensures your application remains lightning-fast and universally available."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold bg-white text-black hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                  {page.cta || "Get Managed Hosting"} <ArrowRight size={18} />
                </Link>
                <Link href="/pricing" className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white glass-panel hover:bg-white/10 transition-all duration-300">
                  {page.viewPlans || "View Plans"}
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2} className="relative">
              <div className="absolute inset-0 bg-cyan-600/20 blur-[100px] rounded-full" />
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {[
                  { title: "99.99% Uptime", desc: "SLA Guaranteed", icon: <Clock size={24} /> },
                  { title: "Auto Scaling", desc: "Traffic Spikes Handled", icon: <Activity size={24} /> },
                  { title: "Zero-Day Patching", desc: "Immediate Response", icon: <Wrench size={24} /> },
                  { title: "Hourly Backups", desc: "Point-in-Time Recovery", icon: <RefreshCw size={24} /> }
                ].map((feature, i) => (
                  <div key={i} className="glass-panel p-6 rounded-2xl flex flex-col justify-between aspect-square group hover:border-cyan-500/30 transition-all">
                    <div className="text-cyan-400 group-hover:scale-110 transition-transform">{feature.icon}</div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{page.features?.[i]?.title || feature.title}</h3>
                      <p className="text-zinc-400 text-sm">{page.features?.[i]?.desc || feature.desc}</p>
                    </div>
                  </div>
                ))}
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
              { value: "500+", label: "Servers Managed" },
              { value: "< 5 min", label: "Incident Response" },
              { value: "99.99%", label: "Uptime SLA" },
              { value: "50TB+", label: "Backups Stored" },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">{page.statsLabels?.[i] || stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Management Services Grid */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.gridTitle || "Complete Infrastructure Management"}</h2>
            <p className="text-lg text-zinc-400">
              {page.gridSubtitle || "Every aspect of your web infrastructure, monitored, maintained, and optimized by senior DevOps engineers who treat your systems like their own."}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {managementServices.map((svc, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="glass-panel p-8 rounded-3xl h-full group hover:-translate-y-2 transition-all duration-300 hover:border-cyan-500/20">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                    svc.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' :
                    svc.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                    svc.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                    svc.color === 'orange' ? 'bg-orange-500/10 text-orange-400' :
                    svc.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                    'bg-rose-500/10 text-rose-400'
                  }`}>
                    {svc.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{page.services?.[i]?.title || svc.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">{page.services?.[i]?.desc || svc.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Professional Management */}
      <section className="py-28 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left" className="lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.whyTitle || "Why Professional Management Beats DIY"}</h2>
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                {page.whyDesc1 || "Managing web infrastructure in-house requires deep expertise across networking, security, databases, and cloud services. Most engineering teams are better served by building products, not maintaining servers."}
              </p>
              <p className="text-zinc-500 leading-relaxed mb-8">
                {page.whyDesc2 || "Nortplex brings a dedicated team of infrastructure specialists who have managed systems for companies ranging from early-stage startups to Fortune 500 enterprises. We bring institutional knowledge, battle-tested processes, and 24/7 coverage that no single hire can replicate."}
              </p>
              <div className="glass-panel p-6 rounded-2xl border-cyan-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck size={20} className="text-cyan-400" />
                  <span className="text-white font-semibold">{page.healthScore || "Infrastructure Health Score"}</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full" style={{ width: '96%' }} />
                </div>
                <p className="text-xs text-zinc-500 mt-2">{page.healthScoreDesc || "Average client health score: 96/100"}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="space-y-4">
                {benefits.map((b, i) => (
                  <div key={i} className="glass-panel p-6 rounded-2xl group hover:border-cyan-500/20 transition-all">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 size={20} className="text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-white font-semibold mb-1">{page.benefits?.[i]?.title || b.title}</h4>
                        <p className="text-zinc-400 text-sm leading-relaxed">{page.benefits?.[i]?.desc || b.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Uptime Monitoring Section */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.uptimeTitle || "Uptime Monitoring Dashboard"}</h2>
            <p className="text-lg text-zinc-400">
              {page.uptimeSubtitle || "Real-time visibility into every component of your infrastructure. Know the health status of your systems at a glance."}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="glass-panel p-8 rounded-3xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { label: "Web Server", status: "Operational", uptime: "99.99%", color: "emerald" },
                  { label: "Database Cluster", status: "Operational", uptime: "99.98%", color: "emerald" },
                  { label: "CDN Edge Nodes", status: "Operational", uptime: "100%", color: "emerald" },
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.03] rounded-2xl p-6 border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-zinc-400 text-sm font-medium">{page.dashboardItems?.[i]?.label || s.label}</span>
                      <span className={`flex items-center gap-1.5 text-xs text-${s.color}-400`}>
                        <span className={`w-1.5 h-1.5 rounded-full bg-${s.color}-400`} />
                        {page.dashboardItems?.[i]?.status || s.status}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{s.uptime}</div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 30 }).map((_, j) => (
                        <div key={j} className="flex-1 h-6 rounded-sm bg-emerald-500/30 hover:bg-emerald-500/50 transition-colors" />
                      ))}
                    </div>
                    <p className="text-xs text-zinc-600 mt-2">{page.dashboardItems?.[i]?.period || "Last 30 days"}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/30 blur-[100px] -z-10" />
          <AnimatedSection className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">{page.ctaTitle || "Stop Fighting Fires"}</h2>
            <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
              {page.ctaSubtitle || "Let Nortplex handle your infrastructure while your team focuses on building the product your customers love."}
            </p>
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 rounded-full font-bold text-lg text-white bg-cyan-600 hover:bg-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] transition-all duration-300 hover:-translate-y-1"
            >
              {page.ctaButton || "Start Your Free Assessment"}
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
    </>
  );
}