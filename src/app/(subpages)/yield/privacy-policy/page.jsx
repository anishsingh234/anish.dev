"use client";

import { useState, useEffect, useRef } from "react";
import {
  Shield,
  Database,
  Eye,
  Lock,
  Globe,
  UserCheck,
  Baby,
  RefreshCw,
  Mail,
  ChevronRight,
  TrendingUp,
  Menu,
  X,
  ExternalLink,
  ArrowUp,
} from "lucide-react";

const sections = [
  { id: "introduction", label: "Introduction", icon: Shield },
  { id: "information-collected", label: "Information We Collect", icon: Database },
  { id: "how-we-use", label: "How We Use Information", icon: Eye },
  { id: "data-security", label: "Data Security", icon: Lock },
  { id: "third-party", label: "Third-Party Services", icon: Globe },
  { id: "user-rights", label: "User Rights", icon: UserCheck },
  { id: "childrens-privacy", label: "Children's Privacy", icon: Baby },
  { id: "changes", label: "Changes to Policy", icon: RefreshCw },
  { id: "contact", label: "Contact Information", icon: Mail },
];

function useScrollSpy() {
  const [active, setActive] = useState("introduction");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("yield-dark");
    if (stored) setDark(stored === "true");
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) setDark(true);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("yield-dark", String(dark));
  }, [dark]);
  return [dark, setDark];
}

function AnimatedSection({ children, id, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </section>
  );
}

function Card({ icon: Icon, title, children, accent = "emerald" }) {
  const colors = {
    emerald: "from-emerald-500/10 to-teal-500/10 border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400",
    blue: "from-blue-500/10 to-cyan-500/10 border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-400",
    violet: "from-violet-500/10 to-purple-500/10 border-violet-200 dark:border-violet-800/50 text-violet-600 dark:text-violet-400",
    amber: "from-amber-500/10 to-orange-500/10 border-amber-200 dark:border-amber-800/50 text-amber-600 dark:text-amber-400",
    rose: "from-rose-500/10 to-pink-500/10 border-rose-200 dark:border-rose-800/50 text-rose-600 dark:text-rose-400",
    sky: "from-sky-500/10 to-indigo-500/10 border-sky-200 dark:border-sky-800/50 text-sky-600 dark:text-sky-400",
    slate: "from-slate-500/10 to-gray-500/10 border-slate-200 dark:border-slate-800/50 text-slate-600 dark:text-slate-400",
    teal: "from-teal-500/10 to-green-500/10 border-teal-200 dark:border-teal-800/50 text-teal-600 dark:text-teal-400",
  };
  const c = colors[accent] || colors.emerald;
  const [iconColor] = c.split(" border");
  return (
    <div className={`rounded-2xl border bg-gradient-to-br ${c.split(" text-")[0]} p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-slate-900`}>
      <div className="flex items-start gap-4 mb-5">
        <div className={`p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border ${c.split("from-")[0]} ${c.split(" text-")[1] ? `text-${c.split("text-")[1].split(" ")[0]}` : ""}`}>
          <Icon size={20} className={c.split(" border")[1] ? "" : "text-emerald-600 dark:text-emerald-400"} style={{ color: "inherit" }} />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-tight pt-1">
          {title}
        </h2>
      </div>
      <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-3 text-[0.95rem]">
        {children}
      </div>
    </div>
  );
}

function BulletItem({ children }) {
  return (
    <li className="flex items-start gap-2.5">
      <ChevronRight size={16} className="mt-1 shrink-0 text-emerald-500 dark:text-emerald-400" />
      <span>{children}</span>
    </li>
  );
}

export default function PrivacyPolicy() {
  const [dark, setDark] = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const active = useScrollSpy();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* SEO Meta (handled by Next.js metadata API in layout; these are fallback) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        h1,h2,h3,.brand { font-family: 'Sora', sans-serif; }
        html { scroll-behavior: smooth; }
        html.dark { color-scheme: dark; }
      `}</style>

      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">

        {/* ── NAVBAR ── */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800/60"
            : "bg-transparent"
        }`}>
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Brand */}
            <a href="https://anish-ai.vercel.app" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                <TrendingUp size={16} className="text-white" />
              </div>
              <span className="brand text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Yield
              </span>
            </a>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {sections.slice(0, 5).map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    active === id
                      ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDark(!dark)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {dark ? "☀️" : "🌙"}
              </button>
              <button
                className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          <div className={`lg:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 px-4 pb-4 pt-2 grid grid-cols-2 gap-1">
              {sections.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                    active === id
                      ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* ── HERO ── */}
        <div className="relative pt-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50/50 dark:from-slate-900 dark:via-slate-950 dark:to-emerald-950/20 pointer-events-none" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-300/20 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6">
              <Shield size={14} />
              Legal · Privacy Policy
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight tracking-tight">
              Your Privacy,{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              At <strong className="text-slate-700 dark:text-slate-300">Yield</strong>, we take your financial data seriously.
              This policy explains how we collect, use, and protect your information.
            </p>
            <p className="mt-4 text-sm text-slate-400 dark:text-slate-500">
              Last updated: <span className="font-medium text-slate-500 dark:text-slate-400">May 15, 2026</span>
            </p>

            {/* Quick nav pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {sections.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 hover:border-emerald-300 dark:hover:border-emerald-700 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all duration-200 shadow-sm hover:shadow"
                >
                  <Icon size={12} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-6">

          <AnimatedSection id="introduction">
            <Card icon={Shield} title="Introduction" accent="emerald">
              <p>
                Welcome to <strong className="text-slate-700 dark:text-slate-200">Yield</strong> — your personal finance companion for tracking expenses and income with clarity. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our application.
              </p>
              <p>
                By using Yield, you agree to the collection and use of information in accordance with this policy. We are committed to ensuring your financial data remains private, secure, and never exploited for profit.
              </p>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:anishsingh210204@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                  anishsingh210204@gmail.com
                </a>.
              </p>
            </Card>
          </AnimatedSection>

          <AnimatedSection id="information-collected">
            <Card icon={Database} title="Information We Collect" accent="blue">
              <p>We collect information that you provide directly and information generated through your use of Yield:</p>
              <ul className="space-y-2 mt-2">
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Account Information:</strong> Name, email address, and password when you register.
                </BulletItem>
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Financial Data:</strong> Expense entries, income records, categories, amounts, dates, and notes that you input to track your finances.
                </BulletItem>
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Device Information:</strong> Device type, operating system, browser type, and IP address for security and performance purposes.
                </BulletItem>
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Usage Data:</strong> Feature interactions, session duration, and navigation patterns to help us improve the app experience.
                </BulletItem>
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Communications:</strong> Messages or feedback you send to our support team.
                </BulletItem>
              </ul>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-500 italic">
                We do not collect your bank account numbers, credit card details, or any payment credentials.
              </p>
            </Card>
          </AnimatedSection>

          <AnimatedSection id="how-we-use">
            <Card icon={Eye} title="How We Use Information" accent="violet">
              <p>Your information is used solely to provide and improve Yield's services:</p>
              <ul className="space-y-2 mt-2">
                <BulletItem>To operate and deliver the core expense and income tracking features.</BulletItem>
                <BulletItem>To personalize your experience with tailored insights and spending summaries.</BulletItem>
                <BulletItem>To send important service notifications, security alerts, and policy updates.</BulletItem>
                <BulletItem>To analyze aggregated, anonymized usage patterns to improve app performance and features.</BulletItem>
                <BulletItem>To detect, prevent, and address technical issues, fraud, or abuse.</BulletItem>
                <BulletItem>To respond to your support requests and communications.</BulletItem>
              </ul>
              <div className="mt-4 p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/40">
                <p className="font-semibold text-violet-700 dark:text-violet-400 flex items-center gap-2">
                  <Shield size={15} /> Our Promise
                </p>
                <p className="mt-1 text-violet-600 dark:text-violet-500 text-sm">
                  We will <strong>never sell, rent, or trade</strong> your personal information to third parties for marketing purposes. Your financial data is yours.
                </p>
              </div>
            </Card>
          </AnimatedSection>

          <AnimatedSection id="data-security">
            <Card icon={Lock} title="Data Security" accent="amber">
              <p>
                Protecting your financial data is our top priority. We implement industry-standard security measures to safeguard your information:
              </p>
              <ul className="space-y-2 mt-2">
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Encryption in Transit:</strong> All data transmitted between your device and our servers is encrypted using TLS/HTTPS.
                </BulletItem>
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Encrypted Storage:</strong> Sensitive data is encrypted at rest in our secure database infrastructure.
                </BulletItem>
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Authentication:</strong> Secure login with hashed passwords and optional two-factor authentication.
                </BulletItem>
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Access Controls:</strong> Strict internal access controls ensure only authorized systems can access your data.
                </BulletItem>
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Regular Audits:</strong> Periodic security reviews and vulnerability assessments of our systems.
                </BulletItem>
              </ul>
              <p className="mt-3 text-sm">
                While we strive to protect your data, no method of transmission over the Internet is 100% secure. We encourage you to use a strong, unique password and keep it confidential.
              </p>
            </Card>
          </AnimatedSection>

          <AnimatedSection id="third-party">
            <Card icon={Globe} title="Third-Party Services" accent="sky">
              <p>
                Yield may integrate with select third-party services to provide analytics, authentication, and infrastructure. These partners are carefully chosen and bound by strict data processing agreements:
              </p>
              <ul className="space-y-2 mt-2">
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Analytics Providers:</strong> We may use anonymized analytics (e.g., usage metrics) to understand how users interact with Yield and improve our services. No personally identifiable financial data is shared.
                </BulletItem>
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Cloud Infrastructure:</strong> Our data is hosted on reputable cloud platforms that maintain SOC 2 compliance.
                </BulletItem>
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Authentication Services:</strong> Secure sign-in providers may be used for OAuth-based login.
                </BulletItem>
              </ul>
              <p className="mt-3 text-sm">
                Third parties are contractually prohibited from using your data for their own marketing or selling it to others. We encourage you to review the privacy policies of any third-party services you interact with.
              </p>
            </Card>
          </AnimatedSection>

          <AnimatedSection id="user-rights">
            <Card icon={UserCheck} title="User Rights" accent="teal">
              <p>You have full rights over your personal data. You may exercise these rights by contacting us:</p>
              <ul className="space-y-2 mt-2">
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Access:</strong> Request a copy of all personal data we hold about you.
                </BulletItem>
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Correction:</strong> Request correction of inaccurate or incomplete personal information.
                </BulletItem>
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Deletion:</strong> Request deletion of your account and all associated data ("right to be forgotten").
                </BulletItem>
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Data Portability:</strong> Request an export of your financial data in a machine-readable format.
                </BulletItem>
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Opt-Out:</strong> Opt out of non-essential communications and analytics collection at any time.
                </BulletItem>
                <BulletItem>
                  <strong className="text-slate-700 dark:text-slate-200">Restriction:</strong> Request restriction of processing your data in certain circumstances.
                </BulletItem>
              </ul>
              <p className="mt-3 text-sm">
                We will respond to all legitimate requests within 30 days. We may need to verify your identity before processing certain requests.
              </p>
            </Card>
          </AnimatedSection>

          <AnimatedSection id="childrens-privacy">
            <Card icon={Baby} title="Children's Privacy" accent="rose">
              <p>
                Yield is designed for adults managing their personal finances. Our service is <strong className="text-slate-700 dark:text-slate-200">not directed to children under the age of 13</strong>, and we do not knowingly collect personal information from children.
              </p>
              <p>
                If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at{" "}
                <a href="mailto:anishsingh210204@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                  anishsingh210204@gmail.com
                </a>. We will take steps to remove such information from our systems promptly.
              </p>
              <p>
                If we discover that a child under 13 has provided personal information, we will delete it from our servers without delay.
              </p>
            </Card>
          </AnimatedSection>

          <AnimatedSection id="changes">
            <Card icon={RefreshCw} title="Changes to This Policy" accent="slate">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will:
              </p>
              <ul className="space-y-2 mt-2">
                <BulletItem>Update the "Last updated" date at the top of this policy.</BulletItem>
                <BulletItem>Notify you via email or an in-app notification for material changes.</BulletItem>
                <BulletItem>Provide a prominent notice on our website or app for significant updates.</BulletItem>
              </ul>
              <p className="mt-3">
                Your continued use of Yield after any changes to this Privacy Policy will constitute your acceptance of the revised policy. We encourage you to review this page periodically.
              </p>
              <p className="mt-2">
                If you disagree with the updated policy, you may delete your account at any time by contacting us.
              </p>
            </Card>
          </AnimatedSection>

          <AnimatedSection id="contact">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 md:p-10 text-white text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-5">
                  <Mail size={28} className="text-white" />
                </div>
                <h2 className="brand text-2xl md:text-3xl font-bold mb-3">Contact Information</h2>
                <p className="text-emerald-100 max-w-lg mx-auto leading-relaxed mb-8">
                  Have questions about this Privacy Policy or how your data is handled? We're here to help. Reach out and we'll get back to you promptly.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
                  <a
                    href="mailto:anishsingh210204@gmail.com"
                    className="flex items-center gap-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-4 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                      <Mail size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-emerald-200 font-medium uppercase tracking-wide">Email</p>
                      <p className="text-white font-semibold text-sm group-hover:underline break-all">
                        anishsingh210204@gmail.com
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://anish-ai.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-4 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                      <ExternalLink size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-emerald-200 font-medium uppercase tracking-wide">Website</p>
                      <p className="text-white font-semibold text-sm group-hover:underline">
                        anish-ai.vercel.app
                      </p>
                    </div>
                  </a>
                </div>

                <p className="mt-8 text-emerald-200 text-sm">
                  We aim to respond to all privacy-related inquiries within <strong className="text-white">2 business days</strong>.
                </p>
              </div>
            </div>
          </AnimatedSection>

        </main>

        {/* ── FOOTER ── */}
        <footer className="border-t border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow">
                  <TrendingUp size={16} className="text-white" />
                </div>
                <div>
                  <p className="brand font-bold text-slate-900 dark:text-white">Yield</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Your smart expense tracker</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                <a href="mailto:anishsingh210204@gmail.com" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Support
                </a>
                <a href="https://anish-ai.vercel.app" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
                  Developer <ExternalLink size={11} />
                </a>
                <button onClick={() => scrollTo("introduction")} className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Top
                </button>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-600">
              <p>© 2026 Yield · Anish Kumar Singh. All rights reserved.</p>
              <p>Privacy Policy · Effective May 15, 2026</p>
            </div>
          </div>
        </footer>

        {/* ── BACK TO TOP ── */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-6 right-6 w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-40 ${
            showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>

      </div>
    </>
  );
}

// Next.js metadata export (for app router)
export const metadata = {
  title: "Privacy Policy · Yield",
  description:
    "Learn how Yield collects, uses, and protects your financial data. Your privacy is our priority.",
  openGraph: {
    title: "Privacy Policy · Yield",
    description: "Learn how Yield protects your financial data and privacy.",
    url: "https://anish-ai.vercel.app/privacy-policy",
    siteName: "Yield",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy · Yield",
    description: "Learn how Yield protects your financial data and privacy.",
  },
};