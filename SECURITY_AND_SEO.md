# NORTPLEX Security & Deployment Configuration

## Recommended Security Headers

Add these headers to your hosting platform (Vercel, Netlify, Cloudflare, Nginx, etc.):

```
# Core Security Headers
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.nortplex.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

## Vercel Configuration (vercel.json)

```json
{
  "rewrites": [
    { "source": "/((?!api|assets|favicon|robots|sitemap|.well-known).*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" }
      ]
    }
  ]
}
```

## Netlify Configuration (_headers)

```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## Nginx Configuration

```nginx
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

# SPA routing
location / {
    try_files $uri $uri/ /index.html;
}
```

## Google Search Console Setup

1. Go to https://search.google.com/search-console
2. Add property: https://nortplex.com
3. Verify via DNS TXT record or HTML meta tag
4. Submit sitemap: https://nortplex.com/sitemap.xml
5. Request indexing for main pages

## Google SEO Checklist

- [x] Semantic HTML5 structure
- [x] Proper heading hierarchy (H1 only once per page)
- [x] Meta title & description on every page
- [x] OpenGraph tags
- [x] Twitter Cards
- [x] JSON-LD structured data (Organization, LocalBusiness, WebSite, BreadcrumbList)
- [x] sitemap.xml
- [x] robots.txt
- [x] Canonical URLs
- [x] Lazy loading images
- [x] Clean URL routing
- [ ] Submit to Google Search Console (manual step)
- [ ] Set up Google Analytics (add your GA4 tracking ID)
- [ ] Generate og-image.png (1200x630px) and place in /public
- [ ] Add real phone number to LocalBusiness schema
- [ ] Set up Google My Business listing
