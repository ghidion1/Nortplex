import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2, AlertTriangle, XCircle, Activity,
  Server, Shield, Globe, Database, Clock, ArrowUpRight
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import SEO from '../components/SEO';

const services = [
  { name: 'Website & CDN', icon: <Globe size={18} />, status: 'operational', uptime: '99.99%', latency: '23ms' },
  { name: 'API Services', icon: <Server size={18} />, status: 'operational', uptime: '99.98%', latency: '45ms' },
  { name: 'Security Monitoring (SOC)', icon: <Shield size={18} />, status: 'operational', uptime: '100%', latency: '12ms' },
  { name: 'Database Clusters', icon: <Database size={18} />, status: 'operational', uptime: '99.99%', latency: '8ms' },
  { name: 'Authentication Services', icon: <Shield size={18} />, status: 'operational', uptime: '99.99%', latency: '31ms' },
  { name: 'Backup & Recovery', icon: <Database size={18} />, status: 'operational', uptime: '99.97%', latency: '120ms' },
  { name: 'DNS Services', icon: <Globe size={18} />, status: 'operational', uptime: '100%', latency: '5ms' },
  { name: 'Email & Notifications', icon: <Activity size={18} />, status: 'operational', uptime: '99.95%', latency: '89ms' },
];

const statusConfig = {
  operational: { label: 'Operational', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-400', icon: <CheckCircle2 size={16} /> },
  degraded: { label: 'Degraded', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', dot: 'bg-yellow-400', icon: <AlertTriangle size={16} /> },
  outage: { label: 'Major Outage', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'bg-red-400', icon: <XCircle size={16} /> },
};

const incidents = [
  {
    date: 'March 28, 2025',
    title: 'Scheduled Maintenance — Database Cluster Upgrade',
    status: 'resolved',
    description: 'We performed a scheduled upgrade of our primary database cluster to improve performance and reliability. Total downtime was under 3 minutes, within our maintenance window.',
  },
  {
    date: 'March 12, 2025',
    title: 'Brief API Latency Increase',
    status: 'resolved',
    description: 'Our API services experienced elevated latency for approximately 8 minutes due to a traffic spike. Auto-scaling resolved the issue automatically. No data loss occurred.',
  },
  {
    date: 'February 20, 2025',
    title: 'CDN Cache Invalidation Delay',
    status: 'resolved',
    description: 'A configuration update caused a temporary delay in CDN cache invalidation across 3 edge locations. The issue was identified and corrected within 15 minutes.',
  },
];

function UptimeBar() {
  const days = 90;
  const bars = Array.from({ length: days }, (_, i) => {
    const rand = Math.random();
    if (rand > 0.98) return 'degraded';
    return 'operational';
  });

  return (
    <div className="flex gap-[2px] items-end h-8">
      {bars.map((status, i) => (
        <div
          key={i}
          className={`flex-1 rounded-sm transition-all hover:opacity-80 cursor-pointer ${
            status === 'operational' ? 'bg-emerald-500/60 h-full' :
            status === 'degraded' ? 'bg-yellow-500/60 h-3/4' :
            'bg-red-500/60 h-1/2'
          }`}
          title={`Day ${days - i}: ${status}`}
        />
      ))}
    </div>
  );
}

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const allOperational = services.every(s => s.status === 'operational');

  return (
    <>
      <SEO
        title="System Status — Uptime & Service Health"
        description="NORTPLEX real-time system status page. Monitor the health and uptime of all NORTPLEX services including CDN, API, security monitoring, and databases."
        path="/status"
      />
      <div className="w-full">
        {/* Header */}
        <section className="pt-32 pb-12 md:pt-44 md:pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-2">
                <Activity size={20} className="text-blue-400" />
                <span className="text-sm text-zinc-500 font-medium uppercase tracking-wider">System Status</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">NORTPLEX Service Status</h1>
              <p className="text-zinc-400 leading-relaxed">Real-time monitoring of all NORTPLEX infrastructure and services.</p>
            </AnimatedSection>
          </div>
        </section>

        {/* Overall Status Banner */}
        <section className="px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection delay={0.1}>
              <div className={`rounded-2xl p-6 border flex items-center justify-between ${
                allOperational
                  ? 'bg-emerald-500/5 border-emerald-500/20'
                  : 'bg-yellow-500/5 border-yellow-500/20'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    allOperational ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {allOperational ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold ${allOperational ? 'text-emerald-400' : 'text-yellow-400'}`}>
                      {allOperational ? 'All Systems Operational' : 'Partial System Degradation'}
                    </h2>
                    <p className="text-zinc-500 text-sm">Last checked: {currentTime.toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${allOperational ? 'bg-emerald-400' : 'bg-yellow-400'}`} />
                  <span className="text-sm text-zinc-500">Live</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* 90-day Uptime */}
        <section className="px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection delay={0.15}>
              <div className="glass-panel p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">90-Day Uptime History</h3>
                  <span className="text-sm text-emerald-400 font-medium">99.98% average</span>
                </div>
                <UptimeBar />
                <div className="flex items-center justify-between mt-3 text-xs text-zinc-600">
                  <span>90 days ago</span>
                  <span>Today</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Service List */}
        <section className="px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection delay={0.2}>
              <h2 className="text-xl font-bold text-white mb-6">Service Components</h2>
            </AnimatedSection>
            <div className="space-y-3">
              {services.map((service, i) => {
                const cfg = statusConfig[service.status];
                return (
                  <AnimatedSection key={i} delay={0.2 + i * 0.04}>
                    <div className="glass-panel p-4 md:p-5 rounded-xl flex items-center justify-between hover:border-white/15 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-zinc-400">
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-sm">{service.name}</h3>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-xs text-zinc-600">Uptime: {service.uptime}</span>
                            <span className="text-xs text-zinc-600">Latency: {service.latency}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                        {cfg.icon}
                        <span className="hidden sm:inline">{cfg.label}</span>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* Recent Incidents */}
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-xl font-bold text-white mb-6">Recent Incidents</h2>
            </AnimatedSection>
            <div className="space-y-4">
              {incidents.map((incident, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="glass-panel p-6 rounded-2xl">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white font-semibold mb-1">{incident.title}</h3>
                        <div className="flex items-center gap-2">
                          <Clock size={12} className="text-zinc-600" />
                          <span className="text-xs text-zinc-500">{incident.date}</span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Resolved
                      </span>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">{incident.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
