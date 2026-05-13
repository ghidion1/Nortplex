import React from 'react';
import { Link } from 'wouter';
import { Shield, ArrowLeft } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import SEO from '../components/SEO';

const lastUpdated = 'March 15, 2025';

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us when you create an account, use our services, contact us for support, or otherwise communicate with us. This may include your name, email address, company name, billing address, payment information, and any other information you choose to provide.

We automatically collect certain technical information when you access our services, including your IP address, browser type, operating system, referring URLs, access times, and pages viewed. We use industry-standard tools to collect this data for analytics and security monitoring purposes.`
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to provide, maintain, and improve our infrastructure management services; process transactions and send related information including purchase confirmations and invoices; send technical notices, updates, security alerts, and administrative messages; respond to your comments, questions, and customer service requests; monitor and analyze trends, usage, and activities in connection with our services; detect, investigate, and prevent fraudulent transactions and other illegal activities; and personalize and improve your experience.`
  },
  {
    title: '3. Data Storage and Security',
    content: `Your data is stored in secure data centers located in the European Union. We implement industry-standard security measures including AES-256 encryption at rest, TLS 1.3 encryption in transit, multi-factor authentication for all administrative access, regular penetration testing and security audits, and automated intrusion detection systems.

We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements.`
  },
  {
    title: '4. Data Sharing and Third Parties',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our services, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.

We may also release information when its release is appropriate to comply with applicable law, enforce our site policies, or protect ours or others' rights, property, or safety.`
  },
  {
    title: '5. Your Rights Under GDPR',
    content: `If you are located in the European Economic Area (EEA) or Moldova, you have certain data protection rights. NORTPLEX aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your personal data.

You have the right to access, update, or delete the information we have on you; request rectification of inaccurate data; object to processing of your personal data; request restriction of processing; request data portability; and withdraw consent at any time.

To exercise these rights, please contact us at nortplex@gmail.com.`
  },
  {
    title: '6. Cookies',
    content: `We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. For more details, please see our Cookie Policy.`
  },
  {
    title: '7. Children\'s Privacy',
    content: `Our service does not address anyone under the age of 16. We do not knowingly collect personally identifiable information from anyone under the age of 16. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.`
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.`
  },
  {
    title: '9. Contact Us',
    content: `If you have any questions about this Privacy Policy, please contact us:

NORTPLEX S.R.L.
Strada Ștefan cel Mare 42
Chișinău, Moldova MD-2001
Email: nortplex@gmail.com`
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Read the NORTPLEX Privacy Policy. Learn how we collect, use, and protect your personal data. GDPR compliant. Based in Chișinău, Moldova."
        path="/privacy"
      />
      <div className="w-full">
        <section className="pt-32 pb-12 md:pt-44 md:pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-400 transition-colors mb-8">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Shield size={20} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
              </div>
            </div>
            <p className="text-zinc-500 text-sm">Last updated: {lastUpdated}</p>
            <p className="text-zinc-400 mt-4 leading-relaxed">
              At NORTPLEX, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
            </p>
          </div>
        </section>

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
