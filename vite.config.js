import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  root: path.resolve(__dirname, "."),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          ui: ['wouter', '@tanstack/react-query', 'lucide-react'],
        },
      },
    },
    // Enable source maps for debugging (disable in prod if needed)
    sourcemap: false,
    // Minify for performance
    minify: 'esbuild',
  },
  // CSP headers suggestion for deployment:
  // Content-Security-Policy:
  //   default-src 'self';
  //   script-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  //   style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  //   font-src 'self' https://fonts.gstatic.com;
  //   img-src 'self' data: https:;
  //   connect-src 'self' https://api.nortplex.com;
  //   frame-ancestors 'none';
  //   base-uri 'self';
  //   form-action 'self';
  //
  // Additional security headers to add on your server/CDN:
  //   X-Content-Type-Options: nosniff
  //   X-Frame-Options: DENY
  //   X-XSS-Protection: 1; mode=block
  //   Referrer-Policy: strict-origin-when-cross-origin
  //   Permissions-Policy: camera=(), microphone=(), geolocation=()
  //   Strict-Transport-Security: max-age=31536000; includeSubDomains
});
