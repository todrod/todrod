"use client";

import { useEffect } from "react";
import type { LayoutTemplate, Palette, Goal, TemplateBuilderMustHave } from "@/lib/templateBuilder/types";
import type { FontPairing } from "@/data/fontPairings";
import type { UIStyleOption } from "@/data/uiStyleOptions";
import { getWorkspaceContent } from "@/data/workspaceContent";

// ─── Token helpers ───────────────────────────────────────────────────────────

function alpha(hex: string, a: number) {
  // a is 0-100
  const h = Math.round(a * 2.55).toString(16).padStart(2, "0").toUpperCase();
  return hex.startsWith("#") ? `${hex}${h}` : hex;
}

// ─── Section components ──────────────────────────────────────────────────────

type Tokens = Palette["tokens"];
type Fonts = { heading: string; body: string };

function WorkspaceNav({
  tokens,
  fonts,
  brandName,
  navLinks,
  ctaLabel,
}: {
  tokens: Tokens;
  fonts: Fonts;
  brandName: string;
  navLinks: string[];
  ctaLabel: string;
}) {
  return (
    <nav
      style={{
        backgroundColor: tokens.surface,
        borderBottom: `1px solid ${alpha(tokens.border, 60)}`,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${tokens.primary}, ${tokens.accent})` }} />
          <span style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 16, color: tokens.text }}>{brandName}</span>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {navLinks.map((link) => (
            <span key={link} style={{ fontFamily: fonts.body, fontSize: 14, color: tokens.muted, cursor: "default" }}>{link}</span>
          ))}
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            backgroundColor: tokens.primary,
            color: tokens.background,
            padding: "8px 20px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: "default",
          }}
        >
          {ctaLabel}
        </div>
      </div>
    </nav>
  );
}

function WorkspaceHero({
  tokens,
  fonts,
  eyebrow,
  heading,
  subtitle,
  cta,
  secondaryCta,
  split = true,
}: {
  tokens: Tokens;
  fonts: Fonts;
  eyebrow: string;
  heading: string;
  subtitle: string;
  cta: string;
  secondaryCta: string;
  split?: boolean;
}) {
  return (
    <section
      style={{
        backgroundColor: tokens.background,
        padding: "80px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(tokens.primary, 18)}, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: split ? "1fr 1fr" : "1fr", gap: 56, alignItems: "center" }}>
        <div>
          <div
            style={{
              display: "inline-block",
              backgroundColor: alpha(tokens.primary, 18),
              color: tokens.primary,
              fontSize: 11,
              fontWeight: 600,
              padding: "4px 14px",
              borderRadius: 100,
              marginBottom: 20,
              fontFamily: fonts.body,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <h1
            style={{
              fontFamily: fonts.heading,
              fontSize: 52,
              fontWeight: 700,
              color: tokens.text,
              lineHeight: 1.08,
              marginBottom: 20,
              letterSpacing: "-0.02em",
            }}
          >
            {heading}
          </h1>
          <p style={{ fontFamily: fonts.body, fontSize: 18, color: tokens.muted, lineHeight: 1.65, marginBottom: 36, maxWidth: 480 }}>
            {subtitle}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div
              style={{
                backgroundColor: tokens.primary,
                color: tokens.background,
                padding: "14px 28px",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                fontFamily: fonts.body,
                cursor: "default",
              }}
            >
              {cta}
            </div>
            <div
              style={{
                backgroundColor: "transparent",
                color: tokens.text,
                padding: "14px 28px",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                border: `1.5px solid ${alpha(tokens.border, 80)}`,
                fontFamily: fonts.body,
                cursor: "default",
              }}
            >
              {secondaryCta}
            </div>
          </div>
        </div>

        {split && (
          <div
            style={{
              background: `linear-gradient(135deg, ${alpha(tokens.primary, 22)} 0%, ${alpha(tokens.accent, 18)} 60%, ${alpha(tokens.surface, 95)} 100%)`,
              borderRadius: 20,
              minHeight: 300,
              border: `1px solid ${alpha(tokens.border, 50)}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              padding: 32,
            }}
          >
            <div style={{ width: 72, height: 72, borderRadius: 18, background: `linear-gradient(135deg, ${tokens.primary}, ${tokens.accent})`, opacity: 0.75 }} />
            <div style={{ width: 140, height: 10, borderRadius: 6, backgroundColor: alpha(tokens.text, 18) }} />
            <div style={{ width: 100, height: 10, borderRadius: 6, backgroundColor: alpha(tokens.text, 12) }} />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 80, height: 56, borderRadius: 12, backgroundColor: alpha(tokens.surface, 90), border: `1px solid ${alpha(tokens.border, 50)}` }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function WorkspaceFeatures({
  tokens,
  fonts,
  heading,
  features,
}: {
  tokens: Tokens;
  fonts: Fonts;
  heading: string;
  features: Array<{ title: string; description: string }>;
}) {
  return (
    <section style={{ backgroundColor: tokens.surface, padding: "80px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 36, fontWeight: 700, color: tokens.text, marginBottom: 12, letterSpacing: "-0.01em" }}>
            {heading}
          </h2>
          <div style={{ width: 40, height: 3, borderRadius: 2, backgroundColor: tokens.primary, margin: "0 auto" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                backgroundColor: tokens.background,
                border: `1px solid ${alpha(tokens.border, 65)}`,
                borderRadius: 16,
                padding: "28px 24px",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: alpha(tokens.primary, 18),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 18,
                }}
              >
                <div style={{ width: 20, height: 20, borderRadius: 5, backgroundColor: tokens.primary }} />
              </div>
              <h3 style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 600, color: tokens.text, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontFamily: fonts.body, fontSize: 14, color: tokens.muted, lineHeight: 1.65 }}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkspaceSocialProof({ tokens, fonts }: { tokens: Tokens; fonts: Fonts }) {
  const quotes = [
    { text: "The best decision we made this year. Launched in a week and started getting leads immediately.", name: "Sarah K.", role: "Founder" },
    { text: "Incredibly easy to customize and the output looks genuinely professional out of the box.", name: "Marcus T.", role: "Product Lead" },
    { text: "We replaced our agency with this tool and saved $8,000 in the first month.", name: "Priya M.", role: "CEO" },
  ];
  return (
    <section style={{ backgroundColor: tokens.background, padding: "72px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: tokens.muted, letterSpacing: "0.14em", textTransform: "uppercase", textAlign: "center", marginBottom: 36 }}>
          Trusted by thousands
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {quotes.map((q) => (
            <div
              key={q.name}
              style={{
                backgroundColor: tokens.surface,
                border: `1px solid ${alpha(tokens.border, 55)}`,
                borderRadius: 16,
                padding: 24,
              }}
            >
              <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: tokens.primary }} />
                ))}
              </div>
              <p style={{ fontFamily: fonts.body, fontSize: 14, color: tokens.text, lineHeight: 1.6, marginBottom: 16 }}>"{q.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${tokens.primary}, ${tokens.accent})` }} />
                <div>
                  <p style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: tokens.text }}>{q.name}</p>
                  <p style={{ fontFamily: fonts.body, fontSize: 12, color: tokens.muted }}>{q.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkspacePricing({ tokens, fonts, ctaLabel }: { tokens: Tokens; fonts: Fonts; ctaLabel: string }) {
  const tiers = [
    { name: "Starter", price: "$0", period: "/mo", features: ["Up to 3 projects", "Basic analytics", "Community support"], featured: false },
    { name: "Pro", price: "$49", period: "/mo", features: ["Unlimited projects", "Advanced analytics", "Priority support", "Custom domains"], featured: true },
    { name: "Team", price: "$99", period: "/mo", features: ["Everything in Pro", "5 team seats", "SSO & audit logs", "Dedicated support"], featured: false },
  ];
  return (
    <section style={{ backgroundColor: tokens.surface, padding: "80px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 36, fontWeight: 700, color: tokens.text, marginBottom: 12 }}>Simple, Transparent Pricing</h2>
          <p style={{ fontFamily: fonts.body, fontSize: 16, color: tokens.muted }}>Start free. Upgrade when you're ready.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "start" }}>
          {tiers.map((tier) => (
            <div
              key={tier.name}
              style={{
                backgroundColor: tier.featured ? alpha(tokens.primary, 10) : tokens.background,
                border: `${tier.featured ? 2 : 1}px solid ${tier.featured ? alpha(tokens.primary, 70) : alpha(tokens.border, 55)}`,
                borderRadius: 16,
                padding: 28,
              }}
            >
              {tier.featured && (
                <div style={{ display: "inline-block", backgroundColor: tokens.primary, color: tokens.background, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, marginBottom: 14, fontFamily: fonts.body }}>
                  MOST POPULAR
                </div>
              )}
              <p style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: tokens.muted, marginBottom: 6 }}>{tier.name}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 20 }}>
                <span style={{ fontFamily: fonts.heading, fontSize: 40, fontWeight: 700, color: tokens.text }}>{tier.price}</span>
                <span style={{ fontFamily: fonts.body, fontSize: 14, color: tokens.muted }}>{tier.period}</span>
              </div>
              <div style={{ marginBottom: 24 }}>
                {tier.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: alpha(tokens.primary, 30), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: tokens.primary }} />
                    </div>
                    <span style={{ fontFamily: fonts.body, fontSize: 13, color: tokens.text }}>{f}</span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  backgroundColor: tier.featured ? tokens.primary : "transparent",
                  color: tier.featured ? tokens.background : tokens.text,
                  border: `1.5px solid ${tier.featured ? "transparent" : alpha(tokens.border, 80)}`,
                  padding: "10px 0",
                  borderRadius: 9,
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: fonts.body,
                  textAlign: "center",
                  cursor: "default",
                }}
              >
                {ctaLabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkspaceBooking({ tokens, fonts }: { tokens: Tokens; fonts: Fonts }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const times = ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"];
  return (
    <section style={{ backgroundColor: tokens.background, padding: "72px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 36, fontWeight: 700, color: tokens.text, marginBottom: 16 }}>Book Your Appointment</h2>
          <p style={{ fontFamily: fonts.body, fontSize: 16, color: tokens.muted, lineHeight: 1.65, marginBottom: 24 }}>
            Same-week appointments available. Pick a day and time that works for you.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["Fast Scheduling", "No Wait Lists", "Confirmations via SMS"].map((tag) => (
              <div key={tag} style={{ backgroundColor: alpha(tokens.primary, 14), color: tokens.primary, padding: "6px 14px", borderRadius: 100, fontSize: 12, fontWeight: 600, fontFamily: fonts.body }}>
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div style={{ backgroundColor: tokens.surface, border: `1px solid ${alpha(tokens.border, 55)}`, borderRadius: 16, padding: 28 }}>
          <p style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: tokens.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Choose a Day</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {days.map((d, i) => (
              <div
                key={d}
                style={{
                  flex: 1,
                  padding: "8px 4px",
                  borderRadius: 10,
                  textAlign: "center",
                  backgroundColor: i === 2 ? tokens.primary : alpha(tokens.background, 90),
                  border: `1px solid ${i === 2 ? "transparent" : alpha(tokens.border, 55)}`,
                  cursor: "default",
                }}
              >
                <p style={{ fontFamily: fonts.body, fontSize: 11, color: i === 2 ? tokens.background : tokens.muted }}>{d}</p>
                <p style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 600, color: i === 2 ? tokens.background : tokens.text }}>{14 + i}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: tokens.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Available Times</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {times.map((t, i) => (
              <div
                key={t}
                style={{
                  padding: "10px",
                  borderRadius: 9,
                  textAlign: "center",
                  backgroundColor: i === 1 ? alpha(tokens.primary, 15) : alpha(tokens.background, 90),
                  border: `1px solid ${i === 1 ? alpha(tokens.primary, 55) : alpha(tokens.border, 55)}`,
                  fontFamily: fonts.body,
                  fontSize: 13,
                  fontWeight: i === 1 ? 600 : 400,
                  color: i === 1 ? tokens.primary : tokens.text,
                  cursor: "default",
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 16,
              backgroundColor: tokens.primary,
              color: tokens.background,
              padding: "12px 0",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: fonts.body,
              textAlign: "center",
              cursor: "default",
            }}
          >
            Confirm Appointment
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkspaceGallery({ tokens, fonts }: { tokens: Tokens; fonts: Fonts }) {
  const colors = [tokens.primary, tokens.accent, tokens.secondary, tokens.primary, tokens.accent, tokens.secondary];
  return (
    <section style={{ backgroundColor: tokens.surface, padding: "72px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontFamily: fonts.heading, fontSize: 32, fontWeight: 700, color: tokens.text, textAlign: "center", marginBottom: 36 }}>Gallery</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {colors.map((color, i) => (
            <div
              key={i}
              style={{
                height: i % 3 === 1 ? 200 : 160,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${alpha(color, 45)}, ${alpha(tokens.surface, 90)})`,
                border: `1px solid ${alpha(tokens.border, 50)}`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkspaceCTA({
  tokens,
  fonts,
  heading,
  subtitle,
  cta,
}: {
  tokens: Tokens;
  fonts: Fonts;
  heading: string;
  subtitle: string;
  cta: string;
}) {
  return (
    <section
      style={{
        background: `linear-gradient(135deg, ${alpha(tokens.primary, 20)}, ${alpha(tokens.accent, 15)})`,
        borderTop: `1px solid ${alpha(tokens.primary, 30)}`,
        borderBottom: `1px solid ${alpha(tokens.primary, 30)}`,
        padding: "80px 32px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2 style={{ fontFamily: fonts.heading, fontSize: 40, fontWeight: 700, color: tokens.text, marginBottom: 16, letterSpacing: "-0.01em" }}>
          {heading}
        </h2>
        <p style={{ fontFamily: fonts.body, fontSize: 17, color: tokens.muted, lineHeight: 1.6, marginBottom: 32 }}>{subtitle}</p>
        <div
          style={{
            display: "inline-block",
            backgroundColor: tokens.primary,
            color: tokens.background,
            padding: "16px 36px",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 700,
            fontFamily: fonts.body,
            cursor: "default",
          }}
        >
          {cta}
        </div>
      </div>
    </section>
  );
}

function WorkspaceFooter({
  tokens,
  fonts,
  brandName,
  tagline,
  navLinks,
}: {
  tokens: Tokens;
  fonts: Fonts;
  brandName: string;
  tagline: string;
  navLinks: string[];
}) {
  const cols = [
    { heading: "Product", links: navLinks.slice(0, 2) },
    { heading: "Company", links: ["About", "Blog", "Careers"] },
    { heading: "Legal", links: ["Privacy", "Terms", "Security"] },
  ];
  return (
    <footer style={{ backgroundColor: tokens.surface, borderTop: `1px solid ${alpha(tokens.border, 50)}`, padding: "56px 32px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: `linear-gradient(135deg, ${tokens.primary}, ${tokens.accent})` }} />
              <span style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 15, color: tokens.text }}>{brandName}</span>
            </div>
            <p style={{ fontFamily: fonts.body, fontSize: 13, color: tokens.muted, lineHeight: 1.6, maxWidth: 220 }}>{tagline}</p>
          </div>
          {cols.map((col) => (
            <div key={col.heading}>
              <p style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: tokens.text, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
                {col.heading}
              </p>
              {col.links.map((link) => (
                <p key={link} style={{ fontFamily: fonts.body, fontSize: 13, color: tokens.muted, marginBottom: 8, cursor: "default" }}>{link}</p>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${alpha(tokens.border, 45)}`, paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontFamily: fonts.body, fontSize: 12, color: tokens.muted }}>© 2025 {brandName}. All rights reserved.</p>
          <div style={{ display: "flex", gap: 12 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: alpha(tokens.border, 60) }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function WorkspaceDashboard({ tokens, fonts, brandName }: { tokens: Tokens; fonts: Fonts; brandName: string }) {
  const metrics = [
    { label: "Total Users", value: "24,891", change: "+12%", up: true },
    { label: "Revenue (MTD)", value: "$48,230", change: "+8%", up: true },
    { label: "Churn Rate", value: "2.1%", change: "-0.4%", up: false },
    { label: "Active Sessions", value: "1,204", change: "+22%", up: true },
  ];
  const navItems = ["Dashboard", "Analytics", "Users", "Billing", "Settings"];
  return (
    <div style={{ display: "grid", gridTemplateRows: "60px 1fr", height: "100%", minHeight: 680, backgroundColor: tokens.background }}>
      {/* Topbar */}
      <div style={{ backgroundColor: tokens.surface, borderBottom: `1px solid ${alpha(tokens.border, 55)}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: `linear-gradient(135deg, ${tokens.primary}, ${tokens.accent})` }} />
          <span style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 14, color: tokens.text }}>{brandName}</span>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: alpha(tokens.border, 55) }} />
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${tokens.primary}, ${tokens.accent})` }} />
        </div>
      </div>
      {/* Body */}
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr" }}>
        {/* Sidebar */}
        <div style={{ backgroundColor: tokens.surface, borderRight: `1px solid ${alpha(tokens.border, 45)}`, padding: "24px 16px" }}>
          {navItems.map((item, i) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 9,
                marginBottom: 4,
                backgroundColor: i === 0 ? alpha(tokens.primary, 14) : "transparent",
                cursor: "default",
              }}
            >
              <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: i === 0 ? tokens.primary : alpha(tokens.border, 70) }} />
              <span style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? tokens.text : tokens.muted }}>{item}</span>
            </div>
          ))}
        </div>
        {/* Main content */}
        <div style={{ padding: 28, overflowY: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
            {metrics.map((m) => (
              <div key={m.label} style={{ backgroundColor: tokens.surface, border: `1px solid ${alpha(tokens.border, 50)}`, borderRadius: 14, padding: "20px 18px" }}>
                <p style={{ fontFamily: fonts.body, fontSize: 11, color: tokens.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.label}</p>
                <p style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 700, color: tokens.text, marginBottom: 6 }}>{m.value}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: m.up ? alpha(tokens.primary, 30) : alpha(tokens.accent, 30) }} />
                  <span style={{ fontFamily: fonts.body, fontSize: 12, color: m.up ? tokens.primary : tokens.muted }}>{m.change}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Chart placeholder */}
          <div style={{ backgroundColor: tokens.surface, border: `1px solid ${alpha(tokens.border, 50)}`, borderRadius: 16, padding: 24, marginBottom: 20 }}>
            <p style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: tokens.text, marginBottom: 16 }}>Revenue Over Time</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
              {[60, 80, 55, 95, 70, 100, 85, 90, 75, 110, 95, 120].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    borderRadius: "4px 4px 0 0",
                    backgroundColor: i === 11 ? tokens.primary : alpha(tokens.primary, 35),
                  }}
                />
              ))}
            </div>
          </div>
          {/* Table placeholder */}
          <div style={{ backgroundColor: tokens.surface, border: `1px solid ${alpha(tokens.border, 50)}`, borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${alpha(tokens.border, 45)}` }}>
              <p style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: tokens.text }}>Recent Activity</p>
            </div>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 20px",
                  borderBottom: i < 3 ? `1px solid ${alpha(tokens.border, 35)}` : "none",
                }}
              >
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${alpha(tokens.primary, 40 + i * 10)}, ${alpha(tokens.accent, 30)})` }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: 10, width: "45%", borderRadius: 4, backgroundColor: alpha(tokens.text, 30), marginBottom: 5 }} />
                  <div style={{ height: 8, width: "30%", borderRadius: 4, backgroundColor: alpha(tokens.text, 18) }} />
                </div>
                <div style={{ height: 8, width: 60, borderRadius: 4, backgroundColor: alpha(tokens.primary, 40) }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkspaceProductGrid({ tokens, fonts }: { tokens: Tokens; fonts: Fonts }) {
  const products = [
    { name: "Handmade Ceramic Bowl", price: "$48", tag: "Bestseller" },
    { name: "Woven Wall Tapestry", price: "$124", tag: "New" },
    { name: "Leather Journal", price: "$62", tag: "" },
    { name: "Linen Throw Pillow", price: "$38", tag: "Sale" },
    { name: "Beeswax Candle Set", price: "$28", tag: "" },
    { name: "Hand-Carved Spoon", price: "$19", tag: "" },
  ];
  const swatchColors = [tokens.primary, tokens.accent, tokens.secondary];
  return (
    <section style={{ backgroundColor: tokens.background, padding: "64px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontFamily: fonts.heading, fontSize: 32, fontWeight: 700, color: tokens.text, marginBottom: 32 }}>Featured Products</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {products.map((p, i) => (
            <div key={p.name} style={{ backgroundColor: tokens.surface, border: `1px solid ${alpha(tokens.border, 55)}`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ height: 180, background: `linear-gradient(135deg, ${alpha(swatchColors[i % 3]!, 35)}, ${alpha(tokens.surface, 90)})`, position: "relative" }}>
                {p.tag && (
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      backgroundColor: p.tag === "Sale" ? alpha(tokens.accent, 90) : tokens.primary,
                      color: tokens.background,
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "3px 9px",
                      borderRadius: 100,
                      fontFamily: fonts.body,
                    }}
                  >
                    {p.tag}
                  </div>
                )}
              </div>
              <div style={{ padding: "16px 18px" }}>
                <p style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 600, color: tokens.text, marginBottom: 4 }}>{p.name}</p>
                <p style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: tokens.primary, marginBottom: 12 }}>{p.price}</p>
                <div
                  style={{
                    backgroundColor: tokens.primary,
                    color: tokens.background,
                    padding: "8px 0",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: fonts.body,
                    textAlign: "center",
                    cursor: "default",
                  }}
                >
                  Add to Cart
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkspaceEmpty() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 400, padding: 40 }}>
      <div style={{ textAlign: "center", color: "#666" }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: "#1e293b", margin: "0 auto 16px" }} />
        <p style={{ fontSize: 16, fontWeight: 600 }}>Select a goal to preview your workspace</p>
        <p style={{ fontSize: 13, marginTop: 6, color: "#888" }}>Choose a goal from the left panel to see the live preview</p>
      </div>
    </div>
  );
}

// ─── Landing workspace ───────────────────────────────────────────────────────

function LandingWorkspace({
  tokens,
  fonts,
  content,
  mustHaves,
}: {
  tokens: Tokens;
  fonts: Fonts;
  content: ReturnType<typeof getWorkspaceContent>;
  mustHaves: TemplateBuilderMustHave[];
}) {
  return (
    <>
      <WorkspaceNav tokens={tokens} fonts={fonts} brandName={content.brandName} navLinks={content.navLinks} ctaLabel={content.heroCTA} />
      <WorkspaceHero tokens={tokens} fonts={fonts} eyebrow={content.eyebrow} heading={content.heroHeading} subtitle={content.heroSubtitle} cta={content.heroCTA} secondaryCta={content.heroSecondaryCTA} />
      <WorkspaceFeatures tokens={tokens} fonts={fonts} heading={content.featuresHeading} features={content.features} />
      {mustHaves.includes("testimonials") ? <WorkspaceSocialProof tokens={tokens} fonts={fonts} /> : null}
      {mustHaves.includes("booking") ? <WorkspaceBooking tokens={tokens} fonts={fonts} /> : null}
      {mustHaves.includes("gallery") ? <WorkspaceGallery tokens={tokens} fonts={fonts} /> : null}
      {mustHaves.includes("pricing") ? <WorkspacePricing tokens={tokens} fonts={fonts} ctaLabel={content.heroCTA} /> : null}
      <WorkspaceCTA tokens={tokens} fonts={fonts} heading={content.ctaHeading} subtitle={content.ctaSubtitle} cta={content.ctaCTA} />
      <WorkspaceFooter tokens={tokens} fonts={fonts} brandName={content.brandName} tagline={content.footerTagline} navLinks={content.navLinks} />
    </>
  );
}

function DashboardWorkspace({ tokens, fonts, content }: { tokens: Tokens; fonts: Fonts; content: ReturnType<typeof getWorkspaceContent> }) {
  return <WorkspaceDashboard tokens={tokens} fonts={fonts} brandName={content.brandName} />;
}

function ContentWorkspace({ tokens, fonts, content }: { tokens: Tokens; fonts: Fonts; content: ReturnType<typeof getWorkspaceContent> }) {
  return (
    <>
      <WorkspaceNav tokens={tokens} fonts={fonts} brandName={content.brandName} navLinks={content.navLinks} ctaLabel={content.heroCTA} />
      <WorkspaceHero tokens={tokens} fonts={fonts} eyebrow={content.eyebrow} heading={content.heroHeading} subtitle={content.heroSubtitle} cta={content.heroCTA} secondaryCta={content.heroSecondaryCTA} split={false} />
      <WorkspaceFeatures tokens={tokens} fonts={fonts} heading={content.featuresHeading} features={content.features} />
      <WorkspaceFooter tokens={tokens} fonts={fonts} brandName={content.brandName} tagline={content.footerTagline} navLinks={content.navLinks} />
    </>
  );
}

function CommerceWorkspace({ tokens, fonts, content, mustHaves }: { tokens: Tokens; fonts: Fonts; content: ReturnType<typeof getWorkspaceContent>; mustHaves: TemplateBuilderMustHave[] }) {
  return (
    <>
      <WorkspaceNav tokens={tokens} fonts={fonts} brandName={content.brandName} navLinks={content.navLinks} ctaLabel={content.heroCTA} />
      <WorkspaceHero tokens={tokens} fonts={fonts} eyebrow={content.eyebrow} heading={content.heroHeading} subtitle={content.heroSubtitle} cta={content.heroCTA} secondaryCta={content.heroSecondaryCTA} />
      <WorkspaceProductGrid tokens={tokens} fonts={fonts} />
      {mustHaves.includes("pricing") ? <WorkspacePricing tokens={tokens} fonts={fonts} ctaLabel={content.heroCTA} /> : null}
      <WorkspaceCTA tokens={tokens} fonts={fonts} heading={content.ctaHeading} subtitle={content.ctaSubtitle} cta={content.ctaCTA} />
      <WorkspaceFooter tokens={tokens} fonts={fonts} brandName={content.brandName} tagline={content.footerTagline} navLinks={content.navLinks} />
    </>
  );
}

// ─── Root export ─────────────────────────────────────────────────────────────

export function VirtualWorkspace({
  palette,
  layout,
  goal,
  fontPairing,
  mustHaves,
}: {
  palette: Palette | undefined;
  layout: LayoutTemplate | undefined;
  goal: Goal | undefined;
  fontPairing: FontPairing | undefined;
  mustHaves: TemplateBuilderMustHave[];
}) {
  const tokens: Tokens = palette?.tokens ?? {
    primary: "#22d3ee",
    secondary: "#1d4ed8",
    accent: "#2dd4bf",
    background: "#0b1220",
    surface: "#142235",
    text: "#e6f0ff",
    muted: "#93a4bf",
    border: "#284260",
  };

  const fonts: Fonts = {
    heading: fontPairing?.headingFont ?? "Inter",
    body: fontPairing?.bodyFont ?? "Inter",
  };

  const content = getWorkspaceContent(goal?.id);

  // Inject Google Fonts scoped to workspace only
  useEffect(() => {
    if (!fontPairing?.googleFontsUrl) return;
    const existing = document.querySelector("link[data-vw-font]");
    if (existing) existing.remove();
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = fontPairing.googleFontsUrl;
    link.setAttribute("data-vw-font", "1");
    document.head.appendChild(link);
    return () => { link.remove(); };
  }, [fontPairing?.id, fontPairing?.googleFontsUrl]);

  if (!goal) return <WorkspaceEmpty />;

  const layoutType = layout?.type ?? "landing";

  if (layoutType === "dashboard" || layoutType === "app" || layoutType === "exam") {
    return <DashboardWorkspace tokens={tokens} fonts={fonts} content={content} />;
  }

  if (layoutType === "content") {
    return <ContentWorkspace tokens={tokens} fonts={fonts} content={content} />;
  }

  if (layoutType === "commerce") {
    return <CommerceWorkspace tokens={tokens} fonts={fonts} content={content} mustHaves={mustHaves} />;
  }

  return <LandingWorkspace tokens={tokens} fonts={fonts} content={content} mustHaves={mustHaves} />;
}
