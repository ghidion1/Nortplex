import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  Users, Award, Globe, ShieldCheck, Target, Rocket,
  MapPin, Mail, ArrowRight, CheckCircle2, Building2, Clock
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import SEO from '../components/SEO';

const founders = [
  {
    name: 'Adrian Ghidion',
    role: 'CEO & Founder',
    initials: 'AB',
    color: 'blue',
    bio: 'Over 8 years of experience in infrastructure engineering and cybersecurity. Previously led DevOps initiatives for multiple European tech companies before founding NORTPLEX.',
  },
  {
    name: 'Marius Șendrea',
    role: 'CTO & Co-Founder',
    initials: 'DC',
    color: 'cyan',
    bio: 'Full-stack architect specializing in cloud-native solutions and security hardening. Holds AWS Solutions Architect Professional and CISSP certifications.',
  },
  {
    name: 'Ghenadie Șendrea',
    role: 'Head of Operations',
    initials: 'EM',
    color: 'purple',
    bio: 'Expert in scaling technical operations and client success management. Ensures every NORTPLEX client receives enterprise-level attention and support.',
  },
];

const values = [
  { icon: <ShieldCheck size={24} />, title: 'Security First', desc: 'Every decision we make starts with security. We treat your data as if it were our own — because trust is the foundation of everything we build.' },
  { icon: <Target size={24} />, title: 'Relentless Reliability', desc: '99.99% uptime is not a marketing claim — it is our operational standard. We invest heavily in redundancy, monitoring, and incident response.' },
  { icon: <Users size={24} />, title: 'Client Partnership', desc: 'We do not just provide a service. We become an extension of your team, understanding your business goals and aligning our efforts to your growth.' },
  { icon: <Rocket size={24} />, title: 'Continuous Innovation', desc: 'The web evolves fast. We constantly evaluate emerging technologies, security threats, and performance strategies to keep you ahead.' },
];

const milestones = [
  { year: '2023', title: 'Company Founded', desc: 'NORTPLEX was established in Chișinău, Moldova, with a mission to democratize enterprise-grade infrastructure.' },
  { year: '2023', title: 'First 20 Clients', desc: 'Achieved our first milestone of 20 managed infrastructure clients within the first 6 months.' },
  { year: '2024', title: 'Security Division Launched', desc: 'Expanded into dedicated cybersecurity services, including SOC monitoring and penetration testing.' },
  { year: '2024', title: '100+ Clients Milestone', desc: 'Crossed 100 active clients across 25 countries, maintaining 99.99% uptime across all accounts.' },
  { year: '2025', title: 'Cloud Migration Practice', desc: 'Launched specialized cloud migration services, completing 50+ zero-downtime migrations.' },
  { year: '2025', title: 'Global Expansion', desc: 'Extended support coverage to 24/7 with engineering teams spanning multiple time zones.' },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Us — Our Team & Mission"
        description="Learn about NORTPLEX — an enterprise infrastructure management company founded in Chișinău, Moldova. Meet our team, learn our values, and discover why 150+ companies trust us."
        path="/about"
      />
      <div className="w-full">
        {/* Hero */}
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-6 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 font-medium mb-8">
                <Building2 size={14} />
                About NORTPLEX
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tighter mb-6 text-white">
                Building the Infrastructure That Powers Modern Business
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                Founded in Chișinău, Moldova, NORTPLEX was created to give every company access to the kind of web infrastructure and security that was once reserved for Fortune 500 corporations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Info Bar */}
        <section className="border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: <Building2 size={18} />, label: 'Founded', value: '2023' },
                { icon: <MapPin size={18} />, label: 'Headquarters', value: 'Chișinău, MD' },
                { icon: <Globe size={18} />, label: 'Countries Served', value: '32+' },
                { icon: <Users size={18} />, label: 'Team Members', value: '25+' },
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{item.value}</div>
                    <p className="text-xs text-zinc-500">{item.label}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection direction="left">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                  We believe that exceptional web infrastructure should not be a luxury. Small and mid-sized companies deserve the same level of uptime, security, and performance that large enterprises enjoy — without the overhead of building and maintaining an in-house DevOps team.
                </p>
                <p className="text-zinc-400 leading-relaxed mb-8">
                  NORTPLEX bridges that gap. We combine deep technical expertise with a client-first approach, providing hands-on infrastructure management that lets you focus entirely on growing your business.
                </p>
                <div className="flex items-center gap-3 text-sm text-zinc-500">
                  <Mail size={16} className="text-blue-400" />
                  <a href="mailto:nortplex@gmail.com" className="hover:text-blue-400 transition-colors">nortplex@gmail.com</a>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.2}>
                <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 blur-[60px] rounded-full" />
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    {[
                      { value: '150+', label: 'Active Clients' },
                      { value: '99.99%', label: 'Uptime SLA' },
                      { value: '200+', label: 'Migrations Done' },
                      { value: '< 15min', label: 'Response Time' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/[0.03] rounded-xl p-5 border border-white/5 text-center">
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <p className="text-xs text-zinc-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Founders */}
        <section className="py-24 px-6 bg-white/[0.01] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Leadership Team</h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">The people behind NORTPLEX — engineers and operators who have spent their careers building and protecting web infrastructure.</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {founders.map((person, i) => (
                <AnimatedSection key={i} delay={i * 0.15}>
                  <div className="glass-panel p-8 rounded-3xl h-full group hover:border-white/15 transition-all duration-300 text-center">
                    <div className={`w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform ${
                      person.color === 'blue' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20' :
                      person.color === 'cyan' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20' :
                      'bg-purple-500/15 text-purple-400 border border-purple-500/20'
                    }`}>
                      {person.initials}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{person.name}</h3>
                    <p className={`text-sm font-medium mb-4 ${
                      person.color === 'blue' ? 'text-blue-400' :
                      person.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'
                    }`}>{person.role}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{person.bio}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Core Values</h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">The principles that guide every decision we make and every line of infrastructure we manage.</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="glass-panel p-6 rounded-2xl h-full flex gap-5 hover:border-white/15 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 px-6 bg-white/[0.01] border-y border-white/5">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Journey</h2>
            </AnimatedSection>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />
              {milestones.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className={`relative flex items-start mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-blue-500 border-2 border-blue-400 -translate-x-1/2 mt-2 z-10" />
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">{item.year}</span>
                      <h3 className="text-lg font-bold text-white mt-1 mb-2">{item.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Work With Us?</h2>
              <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto">
                Join 150+ companies that trust NORTPLEX with their critical infrastructure. Start with a free assessment.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="px-8 py-4 rounded-full font-semibold text-black bg-white hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                  Get in Touch <ArrowRight size={18} />
                </Link>
                <Link href="/services" className="px-8 py-4 rounded-full font-semibold text-white glass-panel hover:bg-white/10 transition-all duration-300">
                  View Services
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  );
}
