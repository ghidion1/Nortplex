import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LangProvider, ThemeProvider } from "@/lib/i18n.jsx";
import { AuthProvider } from "@/context/AuthContext";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import CookieBanner from "./components/CookieBanner";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Security from "./pages/Security";
import WebsiteManagement from "./pages/WebsiteManagement";
import CloudMigration from "./pages/CloudMigration";
import CaseStudies from "./pages/CaseStudies";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CookiePolicy from "./pages/CookiePolicy";
import StatusPage from "./pages/StatusPage";
import NotFound from "./pages/not-found";

function ScrollToTop() {
  useScrollToTop();
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
    <LangProvider>
    <AuthProvider>
    <CookieConsentProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden font-sans">
          
          {/* Subtle global gradient backgrounds for depth */}
          <div className="fixed inset-0 z-0 pointer-events-none grid-pattern opacity-50"></div>
          <div className="fixed -top-40 -left-40 w-96 h-96 bg-blue-900/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
          <div className="fixed top-1/2 right-0 w-80 h-80 bg-purple-900/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

          <Navbar />
          <ScrollToTop />
          <CookieBanner />
          
          <main className="flex-grow z-10 flex flex-col w-full" role="main">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/services" component={Services} />
              <Route path="/security" component={Security} />
              <Route path="/management" component={WebsiteManagement} />
              <Route path="/migration" component={CloudMigration} />
              <Route path="/case-studies" component={CaseStudies} />
              <Route path="/pricing" component={Pricing} />
              <Route path="/contact" component={Contact} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/about" component={About} />
              <Route path="/privacy" component={PrivacyPolicy} />
              <Route path="/terms" component={TermsConditions} />
              <Route path="/cookies" component={CookiePolicy} />
              <Route path="/status" component={StatusPage} />
              <Route component={NotFound} />
            </Switch>
          </main>
          
          <div className="z-10 w-full mt-auto">
            <Footer />
          </div>

        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
    </CookieConsentProvider>
    </AuthProvider>
    </LangProvider>
    </ThemeProvider>
  );
}
