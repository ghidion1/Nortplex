import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, TrendingUp, ShieldAlert, ShoppingCart, Gauge, Lock } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { useLang } from "@/lib/i18n.jsx";
import SEO from '../components/SEO';

const caseStudies = [
  {
    company: "SecureHealth Inc.",
    industry: "Healthcare SaaS",
    icon: <ShieldAlert size={24} />,
    metric: "100%",
    metricLabel: "Data Recovered",
    title: "Recovering a Hacked Healthcare Platform",
    problem: "SecureHealth discovered their patient portal had been compromised through an unpatched WordPress plugin. Attackers had injected malware into the codebase, installed backdoor shells, and exfiltrated a database containing 50,000 patient records. The site was blacklisted by Google and their hosting provider threatened to shut them down.",
    solution: "Nortplex's incident response team was deployed within 30 minutes. We isolated the compromised servers, performed forensic analysis to identify all attack vectors, removed malware and backdoors, restored clean backups from our geo-redundant backup system, patched all vulnerabilities, implemented a WAF with custom rule sets, deployed IDS/IPS monitoring, and migrated the entire platform to a hardened cloud environment with zero-trust access controls.",
    result: "The platform was fully restored within 6 hours with zero data loss. Google blacklist removal was achieved within 48 hours. Post-incident, the platform has blocked over 120,000 malicious requests with zero successful breaches in 18 months of Nortplex management.",
    color: "red"
  },
  {
    company: "Meridian Commerce",
    industry: "E-Commerce",
    icon: <ShoppingCart size={24} />,
    metric: "0s",
    metricLabel: "Downtime During Migration",
    title: "Migrating a Large E-Commerce Store to the Cloud",
    problem: "Meridian Commerce was running a high-traffic Magento store on aging dedicated servers. Their Black Friday traffic surges caused regular outages, their hosting costs were $12,000/month, and deployments took 4+ hours with manual server configuration. They needed to migrate to a scalable cloud architecture without any downtime during their peak selling season.",
    solution: "Nortplex designed a containerized architecture on AWS using ECS, RDS Aurora, ElastiCache, and CloudFront. We performed a complete database migration with real-time replication, containerized the application, set up auto-scaling policies, and executed a blue-green deployment cutover during off-peak hours. The entire migration was rehearsed three times on staging before the live switch.",
    result: "Zero downtime during migration. Hosting costs dropped from $12,000 to $4,200/month. Page load times improved by 68%. The following Black Friday, the platform handled 15x normal traffic with no performance degradation. Deployments now take 8 minutes instead of 4 hours.",
    color: "purple"
  },
  {
    company: "VeloTech Solutions",
    industry: "B2B Software",
    icon: <Gauge size={24} />,
    metric: "4.2s → 0.8s",
    metricLabel: "Load Time Reduction",
    title: "Optimizing a Critically Slow Business Application",
    problem: "VeloTech's customer-facing dashboard had degraded to a 4.2-second average load time. Users were abandoning the platform, churn had increased 23% in one quarter, and their engineering team couldn't identify the root cause. The application ran on a monolithic architecture with an unoptimized PostgreSQL database handling 2 million queries per day.",
    solution: "Nortplex performed a comprehensive performance audit. We identified 47 unindexed database queries, implemented Redis caching for session data and frequently accessed records, deployed a CDN for static assets, optimized image delivery with WebP conversion, implemented connection pooling, tuned the PostgreSQL configuration for the workload profile, and set up application-level caching with intelligent invalidation.",
    result: "Average load time dropped from 4.2 seconds to 0.8 seconds. Database query response time improved by 85%. User engagement increased 41% within the first month. Churn returned to historical baseline within the following quarter. The infrastructure now handles 3x the original traffic on the same hardware.",
    color: "emerald"
  },
  {
    company: "FinanceGrid Corp",
    industry: "Financial Services",
    icon: <Lock size={24} />,
    metric: "2M+",
    metricLabel: "Attacks Blocked",
    title: "Protecting a Financial Platform from Persistent Threats",
    problem: "FinanceGrid was experiencing daily brute-force attacks against their client portal, repeated DDoS attempts averaging 50 Gbps, and sophisticated bot networks scraping proprietary financial data. Their existing security setup consisted of basic server-level firewalls that couldn't keep up. They faced regulatory pressure to demonstrate robust security controls for their upcoming SOC2 audit.",
    solution: "Nortplex deployed a comprehensive security stack: enterprise WAF with financial-sector-specific rule sets, multi-layer DDoS mitigation capable of absorbing 10+ Tbps attacks, machine learning-based bot detection, rate limiting with intelligent throttling, SIEM integration for centralized security event logging, zero-trust network architecture, and automated compliance reporting dashboards aligned with SOC2 control requirements.",
    result: "Over 2 million malicious requests blocked in the first 6 months. Zero successful breaches or data exfiltration events. DDoS attacks are now absorbed transparently with no user impact. FinanceGrid passed their SOC2 Type II audit on the first attempt with zero findings. Bot scraping dropped to near zero.",
    color: "blue"
  }
];

export default function CaseStudies() {
  const { t } = useLang();
  const page = t.pages?.caseStudies || {};

  return (
    <>
      <SEO title="Case Studies — Proven Results" description="Real success stories from NORTPLEX clients. See how we helped companies scale infrastructure, improve security, and reduce cloud costs." path="/case-studies" />
      <div className="w-full">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-28 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-cyan-300 font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              {page.badge || "Real Results for Real Companies"}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              {page.title || "Proven Results"}
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              {page.subtitle || "Real stories of companies that scaled seamlessly, recovered from disasters, and hardened their defenses because they partnered with Nortplex for their critical infrastructure needs."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Case Studies */}
      <section className="pb-28 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {caseStudies.map((study, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="glass-panel rounded-3xl overflow-hidden">
                <div className="p-8 md:p-12">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        study.color === 'red' ? 'bg-red-500/10 text-red-400' :
                        study.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                        study.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                        'bg-blue-500/10 text-blue-400'
                      }`}>
                        {study.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{page.studies?.[i]?.company || study.company}</h3>
                        <span className="text-zinc-500 text-sm">{page.studies?.[i]?.industry || study.industry}</span>
                      </div>
                    </div>
                    <div className="text-left md:text-right">
                      <div className={`text-4xl md:text-5xl font-black ${
                        study.color === 'red' ? 'text-red-400' :
                        study.color === 'purple' ? 'text-purple-400' :
                        study.color === 'emerald' ? 'text-emerald-400' :
                        'text-blue-400'
                      }`}>{page.studies?.[i]?.metric || study.metric}</div>
                      <p className="text-zinc-400 text-sm font-medium">{page.studies?.[i]?.metricLabel || study.metricLabel}</p>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{page.studies?.[i]?.title || study.title}</h2>

                  {/* Problem / Solution / Result */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/5">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                        <h4 className="text-red-400 font-semibold text-sm uppercase tracking-wider">{page.problemLabel || "Problem"}</h4>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed">{page.studies?.[i]?.problem || study.problem}</p>
                    </div>
                    <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/5">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-blue-400" />
                        <h4 className="text-blue-400 font-semibold text-sm uppercase tracking-wider">{page.solutionLabel || "Solution"}</h4>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed">{page.studies?.[i]?.solution || study.solution}</p>
                    </div>
                    <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/5">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <h4 className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">{page.resultLabel || "Result"}</h4>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed">{page.studies?.[i]?.result || study.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/30 blur-[100px] -z-10" />
          <AnimatedSection className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">{page.ctaTitle || "Your Success Story Starts Here"}</h2>
            <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
              {page.ctaSubtitle || "Join the companies that trust Nortplex with their most critical infrastructure. Let's discuss how we can help you achieve similar results."}
            </p>
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 rounded-full font-bold text-lg text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] transition-all duration-300 hover:-translate-y-1"
            >
              {page.ctaButton || "Start Your Journey"}
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
    </>
  );
}