import { useEffect } from 'react';

const BASE_URL = 'https://nortplex.com';

export default function SEO({ title, description, path = '/', type = 'website' }) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | NORTPLEX`
      : 'NORTPLEX — Enterprise Infrastructure, Security & Web Management';
    const desc = description || 'NORTPLEX provides enterprise-grade web infrastructure management, advanced cybersecurity protection, cloud migrations, and 24/7 monitoring.';
    const url = `${BASE_URL}${path}`;

    document.title = fullTitle;

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', desc);
    setMeta('name', 'keywords', 'nortplex, website creator, sit toasa, web infrastructure management, cybersecurity, cloud migration, DDoS protection, server management, website security, Moldova IT company, enterprise hosting, managed services');
    setMeta('name', 'author', 'NORTPLEX S.R.L.');
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', type);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:url', url);

    // Structured data for SEO (JSON-LD)
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'NORTPLEX',
      legalName: 'NORTPLEX S.R.L.',
      url: BASE_URL,
      logo: `${BASE_URL}/favicon.png`,
      description: desc,
      foundingDate: '2023',
      founders: [{
        '@type': 'Person',
        name: 'Alexandru Botnari',
        jobTitle: 'CEO & Founder',
      }],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Strada Ștefan cel Mare 42',
        addressLocality: 'Chișinău',
        addressCountry: 'MD',
        postalCode: 'MD-2001',
      },
      contactPoint: [{
        '@type': 'ContactPoint',
        email: 'nortplex@gmail.com',
        contactType: 'customer service',
        availableLanguage: ['English', 'Romanian', 'Russian'],
      }],
      sameAs: [
        'https://twitter.com/nortplex',
        'https://github.com/nortplex',
        'https://linkedin.com/company/nortplex',
      ],
      areaServed: 'Worldwide',
    };
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(orgSchema);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description, path, type]);

  return null;
}
