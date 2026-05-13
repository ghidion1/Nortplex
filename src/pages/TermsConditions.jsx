import React from 'react';
import { Link } from 'wouter';
import { FileText, ArrowLeft } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import SEO from '../components/SEO';

const lastUpdated = 'March 15, 2025';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using any services provided by NORTPLEX S.R.L. ("NORTPLEX", "we", "us", or "our"), including our website, infrastructure management services, security monitoring, cloud migration assistance, and any related tools or platforms, you agree to be bound by these Terms and Conditions ("Terms").

If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms. If you do not have such authority, or if you do not agree with these Terms, you must not accept these Terms and may not use our services.`
  },
  {
    title: '2. Description of Services',
    content: `NORTPLEX provides enterprise-grade web infrastructure management services, including but not limited to: server monitoring and maintenance, cybersecurity and threat protection, cloud migration and architecture, performance optimization, automated backup and disaster recovery, SSL/TLS certificate management, DNS management, and technical support.

The specific scope of services provided to you will be defined in your individual Service Level Agreement (SLA) or order form. Features and service availability may vary depending on your selected plan.`
  },
  {
    title: '3. Account Registration',
    content: `To access certain features of our services, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.

You are responsible for safeguarding the password and credentials that you use to access the services and for any activities or actions under your account. You agree to notify us immediately of any unauthorized access to or use of your account.`
  },
  {
    title: '4. Service Level Agreement',
    content: `NORTPLEX commits to the uptime and performance standards outlined in your specific Service Level Agreement. Our standard SLA guarantees 99.99% uptime for managed infrastructure, measured on a monthly basis. Scheduled maintenance windows are excluded from uptime calculations and will be communicated at least 48 hours in advance.

In the event that we fail to meet the agreed-upon uptime guarantee, you may be eligible for service credits as outlined in your SLA documentation.`
  },
  {
    title: '5. Payment Terms',
    content: `Fees for our services are as set forth on our website or in your order form. All fees are quoted in USD unless otherwise specified. Payment is due in advance on a monthly or annual basis, depending on your selected billing cycle.

If payment is not received within 15 days of the due date, we reserve the right to suspend services until the outstanding balance is settled. You are responsible for all taxes associated with your use of the services, excluding taxes based on NORTPLEX's net income.`
  },
  {
    title: '6. Data Ownership and Processing',
    content: `You retain all rights, title, and interest in and to your data. NORTPLEX does not claim any ownership rights over your content or data. We process your data solely for the purpose of providing the services and as described in our Privacy Policy.

We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction, in accordance with applicable data protection laws including GDPR.`
  },
  {
    title: '7. Acceptable Use',
    content: `You agree not to use our services to: violate any applicable laws or regulations; infringe upon the intellectual property rights of others; transmit any malware, viruses, or harmful code; send unsolicited commercial communications (spam); attempt to gain unauthorized access to any systems or networks; engage in activities that could disrupt or interfere with our services or infrastructure; or store, distribute, or transmit any content that is unlawful, harmful, or objectionable.

Violation of this acceptable use policy may result in immediate suspension or termination of your account.`
  },
  {
    title: '8. Limitation of Liability',
    content: `To the maximum extent permitted by applicable law, NORTPLEX shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or business opportunities arising out of or related to your use of our services.

Our total aggregate liability for all claims arising out of or relating to these Terms or the services shall not exceed the total amount paid by you to NORTPLEX during the twelve (12) months preceding the date of the claim.`
  },
  {
    title: '9. Termination',
    content: `Either party may terminate these Terms at any time by providing thirty (30) days written notice to the other party. We may also suspend or terminate your access to the services immediately if you breach any provision of these Terms.

Upon termination, we will provide you with a reasonable period (not less than 30 days) to retrieve your data. After this period, we may delete your data in accordance with our data retention policies.`
  },
  {
    title: '10. Governing Law',
    content: `These Terms shall be governed by and construed in accordance with the laws of the Republic of Moldova, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Chișinău, Moldova.`
  },
  {
    title: '11. Contact Information',
    content: `For any questions regarding these Terms and Conditions, please contact us:

NORTPLEX S.R.L.
Strada Ștefan cel Mare 42
Chișinău, Moldova MD-2001
Email: nortplex@gmail.com`
  },
];

export default function TermsConditions() {
  return (
    <>
      <SEO
        title="Terms & Conditions"
        description="Read the NORTPLEX Terms and Conditions. Understand our service agreements, payment terms, SLA commitments, and legal policies."
        path="/terms"
      />
      <div className="w-full">
        <section className="pt-32 pb-12 md:pt-44 md:pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-400 transition-colors mb-8">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                <FileText size={20} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Terms & Conditions</h1>
              </div>
            </div>
            <p className="text-zinc-500 text-sm">Last updated: {lastUpdated}</p>
            <p className="text-zinc-400 mt-4 leading-relaxed">
              Please read these Terms and Conditions carefully before using any services provided by NORTPLEX S.R.L. Your access to and use of the services is conditioned on your acceptance of and compliance with these Terms.
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
