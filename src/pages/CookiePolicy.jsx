import React from 'react';
import { Link } from 'wouter';
import { Cookie, ArrowLeft } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import SEO from '../components/SEO';

const lastUpdated = 'March 15, 2025';

const cookieTypes = [
  {
    name: 'Strictly Necessary Cookies',
    required: true,
    description: 'These cookies are essential for the website to function properly. They enable core functionality such as security, session management, and accessibility. You cannot opt out of these cookies as the website would not function correctly without them.',
    examples: [
      { cookie: 'session_id', purpose: 'Maintains your authenticated session', duration: 'Session' },
      { cookie: 'csrf_token', purpose: 'Prevents cross-site request forgery attacks', duration: 'Session' },
      { cookie: 'cookie_consent', purpose: 'Stores your cookie consent preferences', duration: '1 year' },
    ],
  },
  {
    name: 'Analytics Cookies',
    required: false,
    description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This data helps us improve the structure, navigation, and content of our website.',
    examples: [
      { cookie: '_ga', purpose: 'Google Analytics — distinguishes unique visitors', duration: '2 years' },
      { cookie: '_ga_*', purpose: 'Google Analytics — maintains session state', duration: '2 years' },
    ],
  },
  {
    name: 'Functional Cookies',
    required: false,
    description: 'These cookies enable enhanced functionality and personalization, such as remembering your language preference or theme selection. If you do not allow these cookies, some or all of these features may not function properly.',
    examples: [
      { cookie: 'theme', purpose: 'Remembers your preferred color theme (dark/light)', duration: '1 year' },
      { cookie: 'lang', purpose: 'Stores your preferred language setting', duration: '1 year' },
    ],
  },
  {
    name: 'Marketing Cookies',
    required: false,
    description: 'These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant advertisements on other sites. They do not store directly personal information but are based on uniquely identifying your browser and internet device.',
    examples: [
      { cookie: 'Currently not used', purpose: 'We do not currently use marketing cookies', duration: 'N/A' },
    ],
  },
];

const sections = [
  {
    title: 'What Are Cookies?',
    content: 'Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners useful information about how their site is being used.',
  },
  {
    title: 'How We Use Cookies',
    content: 'NORTPLEX uses cookies for several purposes: to keep you signed in, to remember your preferences (such as language and theme settings), to understand how you use our website so we can improve it, and to ensure the security of your interactions with our services. We do not use cookies to track you across other websites or to serve targeted advertising.',
  },
  {
    title: 'Managing Your Cookie Preferences',
    content: 'Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or to alert you when cookies are being sent. Please note that if you disable or refuse cookies, some parts of our website may become inaccessible or not function properly.\n\nTo manage cookies in your browser, consult your browser\'s help documentation. Common browsers include Chrome, Firefox, Safari, and Edge, each with their own cookie management settings.',
  },
  {
    title: 'Third-Party Cookies',
    content: 'Some cookies on our website are set by third-party services that appear on our pages. We do not control the use of these cookies and cannot access them. The third-party service providers have their own privacy policies which govern the use of their cookies. We encourage you to review the privacy policies of any third-party service providers.',
  },
  {
    title: 'Updates to This Policy',
    content: 'We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.',
  },
  {
    title: 'Contact Us',
    content: 'If you have any questions about our use of cookies or this Cookie Policy, please contact us:\n\nNORTPLEX S.R.L.\nStrada Ștefan cel Mare 42\nChișinău, Moldova MD-2001\nEmail: nortplex@gmail.com',
  },
];

export default function CookiePolicy() {
  return (
    <>
      <SEO
        title="Cookie Policy"
        description="NORTPLEX Cookie Policy. Learn about the cookies we use, why we use them, and how you can manage your cookie preferences."
        path="/cookies"
      />
      <div className="w-full">
        <section className="pt-32 pb-12 md:pt-44 md:pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-400 transition-colors mb-8">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Cookie size={20} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Cookie Policy</h1>
              </div>
            </div>
            <p className="text-zinc-500 text-sm">Last updated: {lastUpdated}</p>
            <p className="text-zinc-400 mt-4 leading-relaxed">
              This Cookie Policy explains how NORTPLEX S.R.L. uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
          </div>
        </section>

        {/* Cookie Types Table */}
        <section className="pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-2xl font-bold text-white mb-8">Types of Cookies We Use</h2>
            </AnimatedSection>
            <div className="space-y-6">
              {cookieTypes.map((type, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="glass-panel p-6 md:p-8 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">{type.name}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        type.required
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                      }`}>
                        {type.required ? 'Required' : 'Optional'}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-5">{type.description}</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/5">
                            <th className="text-left py-2 pr-4 text-zinc-500 font-medium text-xs uppercase tracking-wider">Cookie</th>
                            <th className="text-left py-2 pr-4 text-zinc-500 font-medium text-xs uppercase tracking-wider">Purpose</th>
                            <th className="text-left py-2 text-zinc-500 font-medium text-xs uppercase tracking-wider">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {type.examples.map((ex, j) => (
                            <tr key={j} className="border-b border-white/[0.03]">
                              <td className="py-2.5 pr-4 text-white font-mono text-xs">{ex.cookie}</td>
                              <td className="py-2.5 pr-4 text-zinc-400">{ex.purpose}</td>
                              <td className="py-2.5 text-zinc-500">{ex.duration}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Text Sections */}
        <section className="pb-24 px-6">
          <div className="max-w-4xl mx-auto space-y-10">
            {sections.map((section, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="glass-panel p-6 md:p-8 rounded-2xl">
                  <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
                  <div className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">{section.content}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
