"use client";

import {
  Activity, ArrowRight, CheckCircle2, MessageSquareWarning, Network, PhoneCall, ShieldCheck, SlidersHorizontal, Terminal, UserRoundCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GradientMesh } from "@/components/GradientMesh";
import { TierTag } from "@/components/ui";
import { enterPreviewSession, getSession } from "@/lib/api";

const LIVE_ROWS = [
  {
    id: "dec_9f2a101",
    payee: "Cyber Cell Desk",
    vpa: "cyber.cell.verify@bankb",
    amount: "₹48,500",
    score: "0.94",
    tier: "BLOCK",
    latency: "42 ms",
    family: "DIGITAL_ARREST",
    reason: "Active unknown high-risk call while paying a newly reported individual account.",
    payload: `{
  "decision_id": "dec_9f2a101",
  "amount_inr": 48500,
  "score": 0.94,
  "tier": "BLOCK",
  "action": "DECLINE",
  "scam_family": "DIGITAL_ARREST",
  "signals": {
    "active_call_risk": 3,
    "vpa_age_days": 3,
    "mule_hop_distance": 1
  },
  "latency_ms": 42
}`,
  },
  {
    id: "dec_9f2a102",
    payee: "QuickRefund Helpdesk",
    vpa: "refund.care99@bankb",
    amount: "₹14,999",
    score: "0.76",
    tier: "STEP_UP",
    latency: "39 ms",
    family: "FAKE_REFUND",
    reason: "Flagged refund SMS linked to payee with 6 recent payer near-misses.",
    payload: `{
  "decision_id": "dec_9f2a102",
  "amount_inr": 14999,
  "score": 0.76,
  "tier": "STEP_UP",
  "action": "STEP_UP",
  "scam_family": "FAKE_REFUND",
  "signals": {
    "flagged_sms_match": 0.89,
    "near_miss_14d": 6,
    "first_time_ratio": 0.94
  },
  "latency_ms": 39
}`,
  },
  {
    id: "dec_9f2a103",
    payee: "BESCOM Urgent Billing",
    vpa: "bill.disconnect@bankb",
    amount: "₹7,250",
    score: "0.48",
    tier: "WARNING",
    latency: "35 ms",
    family: "KYC_BILL_THREAT",
    reason: "Institutional utility name claimed on an unverified personal UPI handle.",
    payload: `{
  "decision_id": "dec_9f2a103",
  "amount_inr": 7250,
  "score": 0.48,
  "tier": "WARNING",
  "action": "WARN",
  "scam_family": "KYC_BILL_THREAT",
  "signals": {
    "institutional_mismatch": true,
    "vpa_age_days": 4,
    "note_scam_prob": 0.78
  },
  "latency_ms": 35
}`,
  },
  {
    id: "dec_9f2a104",
    payee: "FreshMart Organics",
    vpa: "freshmart.blr@banka",
    amount: "₹1,240",
    score: "0.04",
    tier: "SAFE",
    latency: "24 ms",
    family: "VERIFIED_MERCHANT",
    reason: "Established merchant with 96/100 trust score and repeat payer history.",
    payload: `{
  "decision_id": "dec_9f2a104",
  "amount_inr": 1240,
  "score": 0.04,
  "tier": "SAFE",
  "action": "ALLOW",
  "scam_family": null,
  "signals": {
    "verified_merchant": true,
    "prior_txn_count": 14,
    "trust_score": 96
  },
  "latency_ms": 24
}`,
  },
];

const LATENCY_BARS = [
  { label: "Cache read", ms: 6.4, pct: 22, color: "var(--c-primary-soft)" },
  { label: "Feature graph", ms: 16.2, pct: 54, color: "var(--c-primary)" },
  { label: "Rule engine", ms: 1.1, pct: 8, color: "var(--c-primary-bg-subdued-hover)" },
  { label: "Stacked ML", ms: 7.8, pct: 32, color: "var(--c-primary-deep)" },
  { label: "Explainer", ms: 9.3, pct: 38, color: "var(--c-ruby)" },
];

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const current = LIVE_ROWS[selected];

  const openDashboard = () => {
    if (!getSession()) {
      enterPreviewSession();
    }
    router.push("/feed");
  };

  return (
    <div className="mkt-page">
      {/* Level 3 Elevation: Atmospheric Organic SVG Gradient Mesh occupying upper third */}
      <GradientMesh variant="hero" />

      {/* Nav Bar on Mesh */}
      <header className="nav-bar-on-mesh">
        <div className="nav-bar-inner">
          <Link href="/" className="row gap-2" style={{ color: "var(--c-ink)" }}>
            <span style={{ width: 32, height: 32, borderRadius: 8, display: "grid", placeItems: "center", background: "var(--c-primary)" }}>
              <ShieldCheck size={17} color="#ffffff" />
            </span>
            <span style={{ fontSize: 17, fontWeight: 400, letterSpacing: "-0.3px", color: "var(--c-ink)" }}>UPI Inspector</span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            <a href="#composite">Product</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#explainability">Explainability</a>
            <a href="#tiers">Deployment</a>
          </nav>

          <div className="row gap-4">
            <Link href="/login" style={{ fontSize: 15, fontWeight: 400, color: "var(--c-ink)" }}>Sign in</Link>
            <button type="button" className="btn btn-primary btn-sm" onClick={openDashboard}>
              Open console <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Band */}
      <section className="mkt-container" style={{ paddingTop: 72, paddingBottom: 56 }}>
        <div className="col gap-6" style={{ maxWidth: 780 }}>
          <div>
            <span className="pill-tag-soft">Real-time UPI Fraud Infrastructure</span>
          </div>
          <h1 className="display-xxl">
            Stop social-engineering scams before the PIN screen.
          </h1>
          <p className="body-lg muted" style={{ maxWidth: 620 }}>
            Every UPI payment scored in under 150 ms against active phone calls, flagged messages, and mule-network graphs—returning a plain-language reason the payer can trust.
          </p>
          <div className="row wrap gap-4" style={{ paddingTop: 4 }}>
            <button type="button" className="btn btn-primary" onClick={openDashboard}>
              Launch analyst console <ArrowRight size={16} />
            </button>
            <Link href="/login" className="btn btn-secondary">
              Staff sign in
            </Link>
          </div>

          <div className="row wrap gap-6" style={{ paddingTop: 12 }}>
            <div>
              <div className="display-md num" style={{ color: "var(--c-ink)" }}>44.2 ms</div>
              <div className="caption">p95 scoring latency (150 ms budget)</div>
            </div>
            <div style={{ width: 1, height: 36, background: "var(--c-hairline)" }} />
            <div>
              <div className="display-md num" style={{ color: "var(--c-ink)" }}>₹48.25 L</div>
              <div className="caption">Simulated fraud prevented (15 d)</div>
            </div>
            <div style={{ width: 1, height: 36, background: "var(--c-hairline)" }} />
            <div>
              <div className="display-md num" style={{ color: "var(--c-ink)" }}>91.4%</div>
              <div className="caption">Scam recall at Step-Up or Block</div>
            </div>
          </div>
        </div>

        {/* Signature Composited Dashboard Mockup (3-panel multi-layer product UI) */}
        <div id="composite" className="card-dashboard-mockup" style={{ marginTop: 48 }}>
          <div className="row between wrap" style={{ marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid var(--c-hairline)" }}>
            <div className="row gap-2">
              <span style={{ width: 9, height: 9, borderRadius: 9999, background: "var(--c-ruby)" }} />
              <span style={{ width: 9, height: 9, borderRadius: 9999, background: "var(--c-lemon)" }} />
              <span style={{ width: 9, height: 9, borderRadius: 9999, background: "var(--c-primary)" }} />
              <span className="caption" style={{ marginLeft: 8 }}>UPI Inspector · Live Risk Assessment Composite</span>
            </div>
            <div className="row gap-2">
              <span className="pill-tag-soft">Tabular Telemetry</span>
              <span className="chip t-SAFE"><CheckCircle2 size={12} /> Enforcing</span>
            </div>
          </div>

          <div className="composite-grid">
            {/* Left Panel: Deep Navy (#1c1e54) Faux API / IDE Console */}
            <div className="console-panel composite-panel-console">
              <div className="row between">
                <span className="row gap-2" style={{ fontSize: 12, color: "var(--c-primary-bg-subdued-hover)" }}>
                  <Terminal size={14} /> POST /v1/assess
                </span>
                <span className="micro-cap" style={{ color: "#ffffff", background: "rgba(83, 58, 253, 0.55)", padding: "3px 8px", borderRadius: 9999 }}>
                  {current.latency}
                </span>
              </div>
              <pre className="console-code">{current.payload}</pre>
              <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.12)", fontSize: 12, color: "rgba(255,255,255,0.78)" }}>
                {current.reason}
              </div>
            </div>

            {/* Center Panel: Crisp White Tabular Decision Ledger */}
            <div className="card flush" style={{ boxShadow: "none", display: "flex", flexDirection: "column" }}>
              <div className="row between" style={{ padding: "14px 16px", borderBottom: "1px solid var(--c-hairline)" }}>
                <span style={{ fontSize: 14, fontWeight: 400, color: "var(--c-ink)" }}>Recent pre-PIN decisions</span>
                <span className="caption">Select a row to inspect payload</span>
              </div>
              <div className="scroll-x">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Payee</th>
                      <th className="right">Amount</th>
                      <th>Tier</th>
                      <th className="right">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LIVE_ROWS.map((r, idx) => (
                      <tr
                        key={r.id}
                        className="click"
                        onClick={() => setSelected(idx)}
                        style={idx === selected ? { background: "rgba(185, 185, 249, 0.22)" } : undefined}
                      >
                        <td>
                          <div style={{ fontWeight: 400 }}>{r.payee}</div>
                          <div className="caption mono">{r.vpa}</div>
                        </td>
                        <td className="right num nowrap">{r.amount}</td>
                        <td><TierTag tier={r.tier} /></td>
                        <td className="right num">{r.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Panel: Latency & Signal Telemetry Chart Card */}
            <div className="card composite-panel-chart" style={{ boxShadow: "none", padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="row between">
                <span style={{ fontSize: 14, fontWeight: 400 }}>Hot-path stage budget</span>
                <span className="caption num">44.2 / 150 ms</span>
              </div>
              <div className="col gap-2" style={{ marginTop: 4 }}>
                {LATENCY_BARS.map((b) => (
                  <div key={b.label} className="col gap-1">
                    <div className="row between">
                      <span className="caption" style={{ color: "var(--c-ink-secondary)" }}>{b.label}</span>
                      <span className="caption num">{b.ms.toFixed(1)} ms</span>
                    </div>
                    <div className="bar">
                      <i style={{ width: `${b.pct}%`, background: b.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "auto", padding: "12px 14px", borderRadius: 8, background: "var(--c-canvas-soft)", border: "1px solid var(--c-hairline)" }}>
                <div className="micro-cap" style={{ color: "var(--c-ink-mute)" }}>FAIL-OPEN GUARANTEE</div>
                <div style={{ fontSize: 13, color: "var(--c-ink-secondary)", marginTop: 4 }}>
                  Cache or model outages degrade to deterministic rules capped at Warning—never blocking legitimate payments.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Explanation Band on canvas-soft (#f6f9fc) */}
      <section id="capabilities" className="mkt-section mkt-section-soft">
        <div className="mkt-container">
          <div className="col gap-2" style={{ maxWidth: 640, marginBottom: 40 }}>
            <span className="pill-tag-soft" style={{ alignSelf: "flex-start" }}>Multi-Signal Risk Engine</span>
            <h2 className="display-xl">Built for the exact seconds a scam unfolds.</h2>
            <p className="body-lg muted">
              Traditional transaction rules inspect only the payment amount. UPI Inspector correlates session coaching signals, active calls, scam SMS text, and cross-bank mule topology in one unified score.
            </p>
          </div>

          <div className="grid g3" style={{ gap: 24 }}>
            <div className="card-feature-light col gap-4">
              <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(185, 185, 249, 0.35)", display: "grid", placeItems: "center", color: "var(--c-primary-deep)" }}>
                <PhoneCall size={20} />
              </div>
              <h3 className="display-md">Call &amp; message correlation</h3>
              <p className="body-md muted">
                Detects active unknown calls, rapid app switching, and flagged refund or KYC threat messages right before a transfer is authorized.
              </p>
              <Link href="/feed" onClick={(e) => { e.preventDefault(); openDashboard(); }} className="row gap-1" style={{ fontSize: 15, marginTop: "auto" }}>
                Inspect live feed <ArrowRight size={15} />
              </Link>
            </div>

            <div className="card-feature-light col gap-4">
              <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(185, 185, 249, 0.35)", display: "grid", placeItems: "center", color: "var(--c-primary-deep)" }}>
                <Network size={20} />
              </div>
              <h3 className="display-md">Mule network &amp; consortium</h3>
              <p className="body-md muted">
                Tracks passthrough forwarding ratios and shared devices across hops while sharing only HMAC-keyed VPA hashes between participating banks.
              </p>
              <Link href="/network" onClick={(e) => { e.preventDefault(); if (!getSession()) enterPreviewSession(); router.push("/network"); }} className="row gap-1" style={{ fontSize: 15, marginTop: "auto" }}>
                Explore payee graph <ArrowRight size={15} />
              </Link>
            </div>

            <div className="card-feature-light col gap-4">
              <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(185, 185, 249, 0.35)", display: "grid", placeItems: "center", color: "var(--c-primary-deep)" }}>
                <SlidersHorizontal size={20} />
              </div>
              <h3 className="display-md">Policy lab &amp; drift gates</h3>
              <p className="body-md muted">
                Simulate threshold shifts against 15 days of historical decisions before deploying, with automated PSI drift and segment fairness monitoring.
              </p>
              <Link href="/policy" onClick={(e) => { e.preventDefault(); if (!getSession()) enterPreviewSession(); router.push("/policy"); }} className="row gap-1" style={{ fontSize: 15, marginTop: "auto" }}>
                Open policy lab <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Warm Cream Interlude Band (#f5e9d4) */}
      <section id="explainability" className="mkt-section">
        <div className="mkt-container">
          <div className="card-cream-band">
            <div className="grid g2" style={{ gap: 40, alignItems: "center" }}>
              <div className="col gap-4">
                <span className="pill-tag-soft" style={{ alignSelf: "flex-start" }}>Human-Readable Interventions</span>
                <h2 className="display-xl">
                  Plain words that break the scammer&apos;s script.
                </h2>
                <p className="body-lg" style={{ color: "var(--c-ink-secondary)" }}>
                  Generic &ldquo;high risk&rdquo; banners get ignored under pressure. Every Warning, Step-Up, Hold, and Decline names the scam pattern in English or Hindi—and lets families add a trusted guardian for high-risk co-approval.
                </p>
                <div className="row wrap gap-4" style={{ marginTop: 4 }}>
                  <div className="row gap-2"><MessageSquareWarning size={17} color="var(--c-lemon)" /><span>English &amp; Hindi copy</span></div>
                  <div className="row gap-2"><UserRoundCheck size={17} color="var(--c-lemon)" /><span>Guardian co-approval</span></div>
                  <div className="row gap-2"><Activity size={17} color="var(--c-lemon)" /><span>Near-miss reputation feedback</span></div>
                </div>
              </div>

              <div className="card raised col gap-4" style={{ padding: 28 }}>
                <div className="row between">
                  <span className="micro-cap" style={{ color: "var(--c-ink-mute)" }}>PAYER SCREEN EXPLANATION</span>
                  <TierTag tier="BLOCK" />
                </div>
                <div className="display-md num">₹48,500</div>
                <p className="body-md" style={{ color: "var(--c-ink)" }}>
                  &ldquo;You are on a call with an unknown number while paying a personal account opened 3 days ago that claims to be a government Cyber Cell desk. Police never ask for verification transfers.&rdquo;
                </p>
                <div className="row between" style={{ paddingTop: 12, borderTop: "1px solid var(--c-hairline)" }}>
                  <span className="caption">Family: Digital arrest · similarity 0.91</span>
                  <span className="caption num">Hold 120 s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment & Protection Tiers (4-up -> 2-up -> 1-up, with deep navy featured card) */}
      <section id="tiers" className="mkt-section mkt-section-soft">
        <div className="mkt-container">
          <div className="col gap-2" style={{ maxWidth: 620, marginBottom: 40 }}>
            <span className="pill-tag-soft" style={{ alignSelf: "flex-start" }}>Operational Modes</span>
            <h2 className="display-xl">Deploy safely from shadow to full enforcement.</h2>
            <p className="body-lg muted">
              Every control is auditable, tenant-isolated across banks, and built to prove lift before interrupting a single payer.
            </p>
          </div>

          <div className="grid g4" style={{ gap: 20 }}>
            <div className="card-pricing">
              <div className="col gap-4">
                <span className="micro-cap" style={{ color: "var(--c-ink-mute)" }}>OBSERVE</span>
                <h3 className="heading-lg">Shadow Mode</h3>
                <div className="display-md num">0 ms <span className="caption">payer friction</span></div>
                <p className="body-md muted">Score every live UPI intent and log would-have actions while payers see zero interruptions.</p>
              </div>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => { if (!getSession()) enterPreviewSession(); router.push("/policy"); }}>
                Simulate in Policy Lab
              </button>
            </div>

            <div className="card-pricing-featured">
              <div className="col gap-4">
                <span className="pill-tag-soft" style={{ alignSelf: "flex-start" }}>RECOMMENDED</span>
                <h3 className="heading-lg">Enforce Core</h3>
                <div className="display-md num">&lt; 150 ms <span className="caption">p95 SLA</span></div>
                <p className="body-md muted">Real-time tiered Warning, Step-Up coaching checks, timed Holds, and deterministic hard Blocks.</p>
              </div>
              <button type="button" className="btn btn-primary btn-sm" onClick={openDashboard}>
                Open live console
              </button>
            </div>

            <div className="card-pricing">
              <div className="col gap-4">
                <span className="micro-cap" style={{ color: "var(--c-ink-mute)" }}>CROSS-BANK</span>
                <h3 className="heading-lg">Consortium</h3>
                <div className="display-md num">0 PII <span className="caption">crossed banks</span></div>
                <p className="body-md muted">Propagate confirmed mule reputation across Bank A and Bank B using HMAC-keyed VPA hashes.</p>
              </div>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => { if (!getSession()) enterPreviewSession(); router.push("/payees"); }}>
                Inspect payees
              </button>
            </div>

            <div className="card-pricing">
              <div className="col gap-4">
                <span className="micro-cap" style={{ color: "var(--c-ink-mute)" }}>GOVERNANCE</span>
                <h3 className="heading-lg">Audit &amp; Posture</h3>
                <div className="display-md num">100% <span className="caption">append-only</span></div>
                <p className="body-md muted">Role-gated analyst workflows, automated security posture checks, and court-ready complaint packs.</p>
              </div>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => { if (!getSession()) enterPreviewSession(); router.push("/security"); }}>
                View posture
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Light Footer */}
      <footer className="footer-light">
        <div className="mkt-container">
          <div className="grid g4" style={{ gap: 32, marginBottom: 40 }}>
            <div className="col gap-2">
              <div className="row gap-2">
                <span style={{ width: 26, height: 26, borderRadius: 6, display: "grid", placeItems: "center", background: "var(--c-primary)" }}>
                  <ShieldCheck size={14} color="#ffffff" />
                </span>
                <span style={{ fontSize: 15, fontWeight: 400, color: "var(--c-ink)" }}>UPI Inspector</span>
              </div>
              <p className="caption" style={{ maxWidth: 240 }}>
                Real-time, explainable UPI fraud prevention prototype built on synthetic bank data.
              </p>
            </div>

            <div className="col gap-2">
              <div className="micro-cap" style={{ color: "var(--c-ink)" }}>Monitor</div>
              <Link href="/feed" onClick={(e) => { e.preventDefault(); openDashboard(); }} className="caption">Live feed</Link>
              <Link href="/near-misses" onClick={(e) => { e.preventDefault(); if (!getSession()) enterPreviewSession(); router.push("/near-misses"); }} className="caption">Near-misses</Link>
              <Link href="/reviews" onClick={(e) => { e.preventDefault(); if (!getSession()) enterPreviewSession(); router.push("/reviews"); }} className="caption">Review queue</Link>
            </div>

            <div className="col gap-2">
              <div className="micro-cap" style={{ color: "var(--c-ink)" }}>Investigate</div>
              <Link href="/payees" onClick={(e) => { e.preventDefault(); if (!getSession()) enterPreviewSession(); router.push("/payees"); }} className="caption">Payees</Link>
              <Link href="/network" onClick={(e) => { e.preventDefault(); if (!getSession()) enterPreviewSession(); router.push("/network"); }} className="caption">Network graph</Link>
              <Link href="/policy" onClick={(e) => { e.preventDefault(); if (!getSession()) enterPreviewSession(); router.push("/policy"); }} className="caption">Policy lab</Link>
            </div>

            <div className="col gap-2">
              <div className="micro-cap" style={{ color: "var(--c-ink)" }}>Governance</div>
              <Link href="/model" onClick={(e) => { e.preventDefault(); if (!getSession()) enterPreviewSession(); router.push("/model"); }} className="caption">Model health</Link>
              <Link href="/system" onClick={(e) => { e.preventDefault(); if (!getSession()) enterPreviewSession(); router.push("/system"); }} className="caption">System health</Link>
              <Link href="/login" className="caption">Staff sign in</Link>
            </div>
          </div>

          <div className="row between wrap" style={{ paddingTop: 24, borderTop: "1px solid var(--c-hairline)" }}>
            <span className="caption">UPI Inspector · Stripi-Inspired Design Language (Branch: Sank-ui1)</span>
            <span className="caption">Synthetic prototype data · No live funds processed</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
