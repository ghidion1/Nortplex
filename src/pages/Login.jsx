import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import logoPng from '../assets/logo_no_bg.png';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const { login, googleLoginUrl, githubLoginUrl } = useAuth();
  const [, navigate] = useLocation();

  // ─── VALIDARE ───────────────────────────────
  const validate = () => {
    const errs = {};

    if (!formData.email) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Enter a valid email address.';
    }

    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      errs.password = 'Password must be at least 8 characters.';
    }

    return errs;
  };

  // ─── SUBMIT LOGIN ───────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setServerError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Login to Your Account"
        description="Sign in to your NORTPLEX dashboard."
        path="/login"
      />

      <div className="min-h-screen flex items-center justify-center px-6 py-32 relative overflow-hidden">

        {/* background effects */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >

          {/* LOGO */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <img
                src={logoPng}
                alt="NortPlex"
                className="w-12 h-12 group-hover:scale-110 transition-transform"
              />
              <span className="text-2xl font-bold text-white">
                Nort<span className="text-cyan-400 font-light">Plex</span>
              </span>
            </Link>
          </div>

          <div className="glass-panel rounded-3xl p-8">

            <h1 className="text-3xl font-bold text-white text-center mb-2">
              Welcome Back
            </h1>
            <p className="text-zinc-400 text-sm text-center mb-8">
              Sign in to access your dashboard
            </p>

            {/* ERROR */}
            {serverError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {serverError}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="text-sm text-zinc-300">Email</label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-3 text-zinc-500" size={18} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white"
                    placeholder="you@company.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm text-zinc-300">Password</label>

                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-3 text-zinc-500" size={18} />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white"
                    placeholder="••••••••"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-zinc-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black font-bold py-3 rounded-xl flex justify-center items-center gap-2"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
                <ArrowRight size={18} />
              </button>
            </form>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-zinc-500">or continue with</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* OAUTH BUTTONS */}
            <div className="grid grid-cols-2 gap-3">

              {/* GOOGLE */}
              <a
                href={googleLoginUrl}
                className="flex justify-center items-center gap-2 py-3 rounded-xl border border-white/10 text-white"
              >
                Google
              </a>

              {/* GITHUB */}
              <a
                href={githubLoginUrl}
                className="flex justify-center items-center gap-2 py-3 rounded-xl border border-white/10 text-white"
              >
                GitHub
              </a>

            </div>

            {/* FOOTER */}
            <div className="mt-6 text-center text-xs text-zinc-500 flex items-center justify-center gap-2">
              <ShieldCheck size={14} className="text-emerald-500" />
              Secure login
            </div>

          </div>

          <p className="text-center mt-6 text-sm text-zinc-400">
            Don’t have an account?{' '}
            <Link href="/register" className="text-blue-400">
              Create one
            </Link>
          </p>

        </motion.div>
      </div>
    </>
  );
}