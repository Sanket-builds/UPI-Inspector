"use client";

import { ArrowRight, Eye, KeyRound, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GradientMesh } from "@/components/GradientMesh";
import { Banner } from "@/components/ui";
import { adoptSession, api, enterPreviewSession, getSession, Grant, takeNotice } from "@/lib/api";
import { BANK } from "@/lib/format";
import { useAction } from "@/lib/hooks";

const ROLE_NOTE: Record<string, string> = {
  admin: "Everything, including thresholds, accounts and demo control",
  analyst: "Investigate, label decisions, resolve reviews",
  auditor: "Read-only, plus the audit log",
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [demo, setDemo] = useState<any[]>([]);
  const [apiChecked, setApiChecked] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const { busy, error, run } = useAction();

  useEffect(() => {
    if (getSession()) router.replace("/feed");
    setNotice(takeNotice());
    // One-click demo sign-in is offered only where the API allows it: by default, on the machine that runs it.
    api<any>("/v1/auth/demo-staff", { auth: false })
      .then((d) => setDemo(d.staff || []))
      .catch(() => setDemo([]))
      .finally(() => setApiChecked(true));
  }, [router]);

  const done = (g: Grant | undefined) => {
    if (!g?.staff) return;
    adoptSession(g, g.staff);
    router.replace("/feed");
  };

  const openPreview = () => {
    enterPreviewSession();
    router.replace("/feed");
  };

  return (
    <div className="login-wrap">
      <GradientMesh variant="login" />

      <header className="nav-bar-on-mesh">
        <div className="nav-bar-inner">
          <Link href="/" className="row gap-2" style={{ color: "var(--c-ink)" }}>
            <span style={{ width: 32, height: 32, borderRadius: 8, display: "grid", placeItems: "center", background: "var(--c-primary)" }}>
              <ShieldCheck size={17} color="#ffffff" />
            </span>
            <span style={{ fontSize: 17, fontWeight: 400, letterSpacing: "-0.3px", color: "var(--c-ink)" }}>UPI Inspector</span>
          </Link>
          <Link href="/" className="btn btn-ghost btn-sm">Back to overview</Link>
        </div>
      </header>

      <div className="login-inner">
        <div className="grid g2" style={{ width: "min(1080px, 100%)", alignItems: "center", gap: 48 }}>
          <div className="col gap-6">
            <div>
              <span className="pill-tag-soft">Analyst Operations Console</span>
            </div>
            <h1 className="display-xxl">
              Stop the scam before the money moves.
            </h1>
            <p className="body-lg muted" style={{ maxWidth: 480 }}>
              Every UPI payment scored in real time against the call, the message, and the payee behind it—with a plain-language reason a person can read.
            </p>
            <div className="row wrap gap-2">
              <span className="chip brand">Real-time scoring</span>
              <span className="chip cyan">Call &amp; message correlation</span>
              <span className="chip">Explainable decisions</span>
            </div>
          </div>

          <div className="card raised" style={{ padding: 32 }}>
            <h2 className="heading-lg">Sign in to dashboard</h2>
            <p className="muted" style={{ marginTop: 6, marginBottom: 24 }}>
              Role-scoped access for bank risk analysts, auditors, and administrators.
            </p>
            <form className="col" onSubmit={(e) => {
              e.preventDefault();
              run(() => api<Grant>("/v1/auth/staff-login", { body: { email, password }, auth: false })).then(done);
            }}>
              <label className="field">Email
                <input className="input" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@bank.example" required />
              </label>
              <label className="field">Password
                <input className="input" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>
              {notice && !error && <Banner kind="info">{notice === "idle" ? "You were signed out after 15 minutes without activity." : "Your session ended. Sign in again."}</Banner>}
              {error && <Banner kind="err">{error}</Banner>}
              <button className="btn btn-primary" disabled={busy} type="submit" style={{ marginTop: 4 }}>
                <KeyRound size={16} /> {busy ? "Signing in…" : "Sign in"}
              </button>
            </form>

            {demo.length > 0 && (
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--c-hairline)" }}>
                <div className="micro-cap" style={{ color: "var(--c-ink-mute)", marginBottom: 12 }}>
                  DEMO ACCOUNTS · ONE-CLICK SIGN-IN
                </div>
                <div className="col gap-2">
                  {demo.map((s) => (
                    <button key={s.email} className="btn btn-ghost" style={{ justifyContent: "space-between", height: "auto", padding: "10px 14px", borderRadius: 10, textAlign: "left" }}
                      disabled={busy}
                      onClick={() => run(() => api<Grant>("/v1/auth/demo-staff-login", { body: { email: s.email }, auth: false })).then(done)}>
                      <span className="col gap-1" style={{ gap: 2 }}>
                        <span style={{ fontSize: 14, color: "var(--c-ink)" }}>
                          {s.name} <span className="chip brand" style={{ marginLeft: 6, textTransform: "capitalize" }}>{s.role}</span> <span className="chip" style={{ marginLeft: 4 }}>{BANK[s.tenant_id]}</span>
                        </span>
                        <span className="caption">{ROLE_NOTE[s.role]}</span>
                      </span>
                      <ArrowRight size={15} color="var(--c-primary)" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {apiChecked && demo.length === 0 && (
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--c-hairline)" }}>
                <div className="micro-cap" style={{ color: "var(--c-ink-mute)", marginBottom: 8 }}>
                  OFFLINE UI PREVIEW
                </div>
                <p className="caption" style={{ marginBottom: 12 }}>
                  Backend API at <span className="mono">localhost:8000</span> is not running. Explore the redesigned analyst dashboard with built-in sample telemetry.
                </p>
                <button type="button" className="btn btn-secondary btn-sm" style={{ width: "100%" }} onClick={openPreview}>
                  <Eye size={15} /> Open interactive UI preview
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
