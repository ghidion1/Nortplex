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
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', type);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:url', url);

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
