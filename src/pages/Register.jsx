import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, ShieldCheck, Building2 } from 'lucide-react';
import logoPng from '../assets/logo_no_bg.png';
import SEO from '../components/SEO';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name) errs.name = 'Full name is required.';
    else if (formData.name.length < 2) errs.name = 'Name must be at least 2 characters.';
    if (!formData.email) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email address.';
    if (!formData.password) errs.password = 'Password is required.';
    else if (formData.password.length < 8) errs.password = 'Password must be at least 8 characters.';
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) errs.password = 'Use uppercase, lowercase, and a number.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  const passwordStrength = () => {
    const p = formData.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[a-z]/.test(p)) s++;
    if (/\d/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const strength = passwordStrength();
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'][strength];
  const strengthColor = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-emerald-500'][strength];

  return (
    <>
      <SEO title="Create Your Account" description="Sign up for NORTPLEX and start managing your web infrastructure with enterprise-grade tools and support." path="/register" />
      <div className="min-h-screen flex items-center justify-center px-6 py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 group-hover:scale-110 transition-transform duration-300">
              <img src={logoPng} alt="NortPlex" className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors duration-300">
              Nort<span className="font-light text-cyan-400">Plex</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="glass-panel rounded-3xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Your Account</h1>
            <p className="text-zinc-400 text-sm">Start protecting your infrastructure today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full bg-zinc-900/50 border ${errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20'} rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-4 transition-all text-sm`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
            </div>

            {/* Company (optional) */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Company <span className="text-zinc-600 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-zinc-900/50 border border-white/10 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-4 transition-all text-sm"
                  placeholder="Acme Corp"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Work Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full bg-zinc-900/50 border ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20'} rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-4 transition-all text-sm`}
                  placeholder="you@company.com"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full bg-zinc-900/50 border ${errors.password ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20'} rounded-xl pl-12 pr-12 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-4 transition-all text-sm`}
                  placeholder="Minimum 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>}

              {/* Password strength meter */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : 'bg-zinc-800'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-500">Strength: <span className={`${strength >= 4 ? 'text-emerald-400' : strength >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>{strengthLabel}</span></p>
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input type="checkbox" id="terms" className="w-4 h-4 mt-0.5 rounded border-white/20 bg-zinc-900/50 text-blue-600 focus:ring-blue-500/20 focus:ring-offset-0" />
              <label htmlFor="terms" className="text-sm text-zinc-400 leading-relaxed">
                I agree to the <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 rounded-xl hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-zinc-500 uppercase tracking-wider">or sign up with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* OAuth buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.06] hover:border-white/20 transition-all text-sm font-medium">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.06] hover:border-white/20 transition-all text-sm font-medium">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-600">
            <ShieldCheck size={14} className="text-emerald-500/60" />
            <span>256-bit SSL encryption &bull; SOC2 compliant</span>
          </div>
        </div>

        {/* Login link */}
        <p className="text-center mt-8 text-sm text-zinc-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
    </>
  );
}