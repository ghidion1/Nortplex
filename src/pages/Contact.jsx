import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useCreateContact } from '../hooks/use-contact';
import { AnimatedSection } from '../components/AnimatedSection';
import { useToast } from '../hooks/use-toast';
import { useLang } from "@/lib/i18n.jsx";
import SEO from '../components/SEO';

export default function Contact() {
  const { mutate: submitContact, isPending } = useCreateContact();
  const { toast } = useToast();
  const { t } = useLang();
  const page = t.pages?.contact || {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data) => {
    submitContact(data, {
      onSuccess: () => {
        toast({
          title: page.successTitle || "Message Sent!",
          description: page.successDesc || "We'll be in touch with you shortly.",
        });
        reset();
      },
      onError: (err) => {
        toast({
          variant: "destructive",
          title: page.errorTitle || "Error",
          description: err.message || page.errorDesc || "Failed to send message.",
        });
      }
    });
  };

  return (
    <>
      <SEO title="Contact Us" description="Get in touch with NORTPLEX. Contact our engineering team for a free infrastructure assessment. Based in Chișinău, Moldova." path="/contact" />
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <AnimatedSection className="text-center mb-20 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">{page.title || "Let's Talk Infrastructure"}</h1>
        <p className="text-xl text-zinc-400">
          {page.subtitle || "Ready to scale? Drop us a line and our engineering team will assess your current architecture."}
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <AnimatedSection direction="left">
          <div className="glass-panel p-10 rounded-3xl h-full">
            <h3 className="text-2xl font-bold text-white mb-8">{page.getInTouch || "Get in Touch"}</h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{page.emailLabel || "Email Us"}</h4>
                  <p className="text-zinc-400 mb-1">{page.emailDesc || "For general inquiries and support."}</p>
                  <a href="mailto:hello@nortplex.com" className="text-blue-400 hover:text-blue-300 font-medium">nortplex@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{page.hqLabel || "Headquarters"}</h4>
                  <p className="text-zinc-400">{page.hqAddress || <>Strada Ștefan cel Mare 42<br/>Chișinău, Moldova MD-2001</>}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{page.callLabel || "Call Us"}</h4>
                  <p className="text-zinc-400 mb-1">{page.callHours || "Mon-Fri from 8am to 5pm PST."}</p>
                  <a href="tel:+18005550199" className="text-cyan-400 hover:text-cyan-300 font-medium">+373 (675)29481</a>
                </div>
              </div>
            </div>
            
            {/* Abstract visual */}
            <div className="mt-12 h-40 rounded-2xl bg-zinc-900/50 border border-white/5 relative overflow-hidden grid-pattern">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Form */}
        <AnimatedSection direction="right" delay={0.2}>
          <div className="glass-panel p-10 rounded-3xl relative">
            {/* Glow behind form */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] -z-10 rounded-full"></div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">{page.formName || "Name"}</label>
                <input
                  type="text"
                  className={`w-full bg-zinc-900/50 border ${errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20'} rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-4 transition-all`}
                  placeholder={page.formNamePlaceholder || "John Doe"}
                  {...register('name', { required: page.validationName || "Name is required.", minLength: { value: 2, message: page.validationNameMin || "Name must be at least 2 characters." } })}
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">{page.formEmail || "Email"}</label>
                <input
                  type="email"
                  className={`w-full bg-zinc-900/50 border ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20'} rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-4 transition-all`}
                  placeholder={page.formEmailPlaceholder || "john@example.com"}
                  {...register('email', { required: page.validationEmail || "Email is required.", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: page.validationEmailFormat || "Please enter a valid email." } })}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">{page.formMessage || "Message"}</label>
                <textarea
                  rows="5"
                  className={`w-full bg-zinc-900/50 border ${errors.message ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20'} rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-4 transition-all resize-none`}
                  placeholder={page.formMessagePlaceholder || "Tell us about your infrastructure needs..."}
                  {...register('message', { required: page.validationMessage || "Message is required.", minLength: { value: 10, message: page.validationMessageMin || "Message must be at least 10 characters." } })}
                ></textarea>
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    {page.formSending || "Sending..."}
                  </>
                ) : (
                  page.formSubmit || "Send Message"
                )}
              </button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </div>
    </>
  );
}