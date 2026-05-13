import React from 'react';
import { Link } from 'wouter';
import {
  ShieldCheck, Lock, Fingerprint, Eye, AlertTriangle, Scan,
  Bug, ShieldAlert, Server, ArrowRight,
  CheckCircle2, Activity, Radar, Ban
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { useLang } from "@/lib/i18n.jsx";
import SEO from '../components/SEO';

const securityLayers = [
  {
    icon: <ShieldAlert size={24} />,
    title: "Web Application Firewall (WAF)",
    desc: "Custom rule sets block SQL injection, XSS, CSRF, and OWASP Top 10 attack vectors before they reach your application layer.",
    color: "blue"
  },
  {
    icon: <Ban size={24} />,
    title: "DDoS Mitigation",
    desc: "Multi-layer volumetric, protocol, and application-level DDoS protection absorbs attacks exceeding 10 Tbps without degrading service.",
    color: "red"
  },
  {
    icon: <Radar size={24} />,
    title: "Intrusion Detection System",
    desc: "Network and host-based IDS/IPS continuously analyze traffic patterns, flagging anomalous behavior and automatically blocking threats.",
    color: "purple"
  },
  {
    icon: <Bug size={24} />,
    title: "Malware Scanning",
    desc: "Automated file integrity monitoring and real-time malware detection scans every upload, cron job, and process execution on your servers.",
    color: "orange"
  },
  {
    icon: <Scan size={24} />,
    title: "Vulnerability Scanning",
    desc: "Continuous CVE scanning against NVD databases identifies unpatched dependencies, misconfigured services, and exposed attack surfaces.",
    color: "cyan"
  },
  {
    icon: <Eye size={24} />,
    title: "Threat Intelligence",
    desc: "Real-time feeds from global threat intelligence networks automatically update blocklists, IP reputation databases, and signature rules.",
    color: "emerald"
  }
];

const advancedCapabilities = [
  { label: "Bot Protection & CAPTCHA", desc: "Machine learning-driven bot detection distinguishes legitimate crawlers from credential-stuffing bots and content scrapers." },
  { label: "Zero-Trust Access Control", desc: "Every request is authenticated and authorized. No implicit trust based on network location or prior sessions." },
  { label: "SSL/TLS Management", desc: "Automated certificate provisioning, renewal, and HSTS enforcement with TLS 1.3 and perfect forward secrecy." },
  { label: "Security Headers", desc: "Strict CSP, X-Frame-Options, CORS policies, and Subresource Integrity configured and maintained across all endpoints." },
  { label: "Log Aggregation & SIEM", desc: "Centralized security event logging with correlation analysis, alerting thresholds, and forensic investigation capabilities." },
  { label: "Penetration Testing", desc: "Scheduled red-team exercises and third-party pen tests validate your defenses against real-world attack methodologies." },
];

const metrics = [
  { value: "10M+", label: "Threats blocked monthly" },
  { value: "< 50ms", label: "Threat response time" },
  { value: "99.99%", label: "Uptime under attack" },
  { value: "24/7", label: "SOC monitoring" },
];

export default function Security() {
  const { t } = useLang();
  const page = t.pages?.security || {};
  return (
    <>
      <SEO title="Advanced Cybersecurity Protection" description="Enterprise-grade cybersecurity by NORTPLEX. DDoS protection, WAF, zero-trust architecture, 24/7 SOC monitoring, and vulnerability scanning." path="/security" />
      <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-28 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-red-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-medium text-sm border border-blue-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                {page.badge || "Enterprise Security"}
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
                {page.title || "Impenetrable Defense for Your Web Infrastructure"}
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 mb-8 leading-relaxed max-w-xl">
                {page.desc || "In today's threat landscape, basic firewalls are not enough. Nortplex implements zero-trust architectures, advanced DDoS mitigation, AI-driven threat detection, and continuous security monitoring to protect your critical business operations."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold bg-white text-black hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                  {page.cta || "Get Security Assessment"} <ArrowRight size={18} />
                </Link>
                <Link href="/pricing" className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white glass-panel hover:bg-white/10 transition-all duration-300">
                  {page.viewPlans || "View Plans"}
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2} className="relative">
              <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full" />
              <div className="glass-panel p-10 rounded-3xl relative z-10 border-blue-500/20">
                <ShieldCheck size={64} className="text-blue-400 mb-8" />
                <div className="space-y-5">
                  {[
                    { icon: <Lock size={20} />, text: "Automated SSL/TLS Management", status: "Active" },
                    { icon: <Eye size={20} />, text: "24/7 SOC Monitoring & Alerting", status: "Active" },
                    { icon: <Fingerprint size={20} />, text: "Zero-Trust Access Controls", status: "Active" },
                    { icon: <AlertTriangle size={20} />, text: "Real-Time Threat Intelligence", status: "Active" },
                    { icon: <Scan size={20} />, text: "Continuous Vulnerability Scanning", status: "Active" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-white p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-blue-500/30 transition-all">
                      <div className="text-blue-400">{item.icon}</div>
                      <span className="font-medium flex-1">{page.features?.[i] || item.text}</span>
                      <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {page.active || "Active"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">{page.metricsLabels?.[i] || stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Security Layers Grid */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.layersTitle || "Multi-Layer Security Architecture"}</h2>
            <p className="text-lg text-zinc-400">
              {page.layersSubtitle || "Your website is protected by six independent security layers. Each one operates autonomously, ensuring defense-in-depth even if one layer is bypassed."}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityLayers.map((layer, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="glass-panel p-8 rounded-3xl h-full group hover:-translate-y-2 transition-all duration-300 hover:border-blue-500/20">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                    layer.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                    layer.color === 'red' ? 'bg-red-500/10 text-red-400' :
                    layer.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                    layer.color === 'orange' ? 'bg-orange-500/10 text-orange-400' :
                    layer.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' :
                    'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {layer.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{page.layers?.[i]?.title || layer.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">{page.layers?.[i]?.desc || layer.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Capabilities */}
      <section className="py-28 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left" className="lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.advancedTitle || "Advanced Security Capabilities"}</h2>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                {page.advancedSubtitle || "Beyond the foundational layers, Nortplex deploys an arsenal of advanced security technologies used by leading financial institutions, healthcare providers, and government agencies."}
              </p>
              <p className="text-zinc-500 leading-relaxed mb-8">
                {page.advancedDesc || "Every technique is continuously audited, updated against emerging threat vectors, and monitored by our security operations center around the clock. Your clients' data and your business reputation are in the safest hands possible."}
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors">
                {page.advancedCta || "Schedule a security consultation"} <ArrowRight size={16} />
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="space-y-4">
                {advancedCapabilities.map((cap, i) => (
                  <div key={i} className="glass-panel p-6 rounded-2xl group hover:border-blue-500/20 transition-all">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 size={20} className="text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-white font-semibold mb-1">{page.capabilities?.[i]?.label || cap.label}</h4>
                        <p className="text-zinc-400 text-sm leading-relaxed">{page.capabilities?.[i]?.desc || cap.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.processTitle || "How Our Security Process Works"}</h2>
            <p className="text-lg text-zinc-400">
              {page.processSubtitle || "From initial assessment to continuous monitoring, our systematic approach ensures comprehensive protection at every stage."}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Security Audit", desc: "Complete infrastructure vulnerability assessment, penetration testing, and threat modeling of your existing setup.", icon: <Scan size={24} /> },
              { step: "02", title: "Architecture Design", desc: "Custom zero-trust security architecture tailored to your technology stack, compliance requirements, and risk profile.", icon: <Server size={24} /> },
              { step: "03", title: "Implementation", desc: "Deployment of WAF rules, IDS/IPS systems, bot protection, encryption protocols, and access control policies.", icon: <ShieldCheck size={24} /> },
              { step: "04", title: "Continuous Monitoring", desc: "24/7 SOC team monitors all security events, responds to incidents, and continuously hardens defenses against emerging threats.", icon: <Activity size={24} /> },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.12}>
                <div className="glass-panel p-8 rounded-3xl h-full relative overflow-hidden group hover:border-blue-500/20 transition-all">
                  <div className="absolute top-4 right-4 text-6xl font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors">{item.step}</div>
                  <div className="text-blue-400 mb-6">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{page.process?.[i]?.title || item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{page.process?.[i]?.desc || item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Security Technologies */}
      <section className="py-28 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.techTitle || "Technologies We Deploy"}</h2>
            <p className="text-lg text-zinc-400">
              {page.techSubtitle || "Industry-standard security tools and proprietary systems working together to create an impenetrable defense layer."}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Web Application Firewall", "Network Firewall", "Rate Limiting", "IP Reputation",
                "SSL/TLS Termination", "HSTS Enforcement", "Content Security Policy", "CORS Management",
                "Log Aggregation (SIEM)", "Anomaly Detection", "Brute Force Protection", "Session Management",
                "API Gateway Security", "DNS Security (DNSSEC)", "Container Scanning", "Secrets Management"
              ].map((tech, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-zinc-300 hover:border-blue-500/20 hover:text-white transition-all">
                  <CheckCircle2 size={16} className="text-blue-400 shrink-0" />
                  {page.technologies?.[i] || tech}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 bg-gradient-to-br from-blue-900/40 to-red-900/20 border border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/30 blur-[100px] -z-10" />
          <AnimatedSection className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">{page.ctaTitle || "Don't Wait for a Breach"}</h2>
            <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
              {page.ctaSubtitle || "The average cost of a data breach exceeds $4.45 million. Proactive security is always cheaper than reactive damage control."}
            </p>
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 rounded-full font-bold text-lg text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] transition-all duration-300 hover:-translate-y-1"
            >
              {page.ctaButton || "Get a Free Security Audit"}
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
    </>
  );
}