"use client";

/**
 * Local UI Preview sample payloads — ONLY used when the user explicitly enters
 * offline UI Preview mode (when the local FastAPI backend on :8000 is not running).
 * Never interferes with live API sessions.
 */

const now = () => Date.now();
const agoIso = (mins: number) => new Date(now() - mins * 60_000).toISOString();

export const PREVIEW_STAFF = {
  staff_id: "preview-admin",
  name: "Meera Nair (UI Preview)",
  email: "meera.nair@banka.example",
  role: "admin" as const,
  tenant_id: "bank_a",
};

const DECISIONS = [
  {
    decision_id: "dec_9f2a101",
    created_at: agoIso(2),
    payer: "Ramesh Kulkarni",
    payer_vpa: "ramesh.k@banka",
    payee_name: "Cyber Cell Verification Desk",
    payee_vpa: "cyber.cell.verify@bankb",
    amount: 48500,
    tier: "BLOCK",
    action: "DECLINE",
    enforced: true,
    score: 0.94,
    top_reason: "Active unknown high-risk call while paying a newly reported account claiming to be a government desk",
    scam_family: "DIGITAL_ARREST",
    family_name: "Digital arrest",
    call_linked: true,
    message_linked: true,
    has_guardian: true,
    user_action: "BLOCKED",
    is_near_miss: false,
    label: "FRAUD",
    latency_ms: 42,
    degraded: false,
    model_version: "xgb-rf-stack-v2.4",
    rules_version: "rules-2026.11",
  },
  {
    decision_id: "dec_9f2a102",
    created_at: agoIso(6),
    payer: "Ananya Deshmukh",
    payer_vpa: "ananya.d@banka",
    payee_name: "QuickRefund Helpdesk",
    payee_vpa: "refund.care99@bankb",
    amount: 14999,
    tier: "STEP_UP",
    action: "STEP_UP",
    enforced: true,
    score: 0.76,
    top_reason: "Flagged SMS promised a refund, and payee has 3 recent near-misses from first-time payers",
    scam_family: "FAKE_REFUND",
    family_name: "Fake refund",
    call_linked: false,
    message_linked: true,
    has_guardian: false,
    user_action: "STEPUP_ABANDONED",
    is_near_miss: true,
    label: null,
    latency_ms: 39,
    degraded: false,
    model_version: "xgb-rf-stack-v2.4",
    rules_version: "rules-2026.11",
  },
  {
    decision_id: "dec_9f2a103",
    created_at: agoIso(11),
    payer: "Vikram Joshi",
    payer_vpa: "vikram.j@banka",
    payee_name: "BESCOM Urgent Billing",
    payee_vpa: "bill.disconnect@bankb",
    amount: 7250,
    tier: "WARNING",
    action: "WARN",
    enforced: true,
    score: 0.48,
    top_reason: "Institutional name claimed on a personal UPI account opened 4 days ago",
    scam_family: "KYC_BILL_THREAT",
    family_name: "KYC or bill threat",
    call_linked: true,
    message_linked: false,
    has_guardian: false,
    user_action: "ABORTED",
    is_near_miss: true,
    label: null,
    latency_ms: 35,
    degraded: false,
    model_version: "xgb-rf-stack-v2.4",
    rules_version: "rules-2026.11",
  },
  {
    decision_id: "dec_9f2a104",
    created_at: agoIso(15),
    payer: "Priya Menon",
    payer_vpa: "priya.m@banka",
    payee_name: "FreshMart Organics",
    payee_vpa: "freshmart.blr@banka",
    amount: 1240,
    tier: "SAFE",
    action: "ALLOW",
    enforced: true,
    score: 0.04,
    top_reason: "",
    scam_family: "UNCLASSIFIED",
    family_name: "",
    call_linked: false,
    message_linked: false,
    has_guardian: false,
    user_action: "PROCEEDED",
    is_near_miss: false,
    label: "LEGITIMATE",
    latency_ms: 24,
    degraded: false,
    model_version: "xgb-rf-stack-v2.4",
    rules_version: "rules-2026.11",
  },
  {
    decision_id: "dec_9f2a105",
    created_at: agoIso(21),
    payer: "Suresh Iyer",
    payer_vpa: "suresh.iyer@banka",
    payee_name: "Apex Task Payouts",
    payee_vpa: "apex.tasks77@bankb",
    amount: 25000,
    tier: "BLOCK",
    action: "HOLD",
    enforced: true,
    score: 0.89,
    top_reason: "Payee forwards 86% of receipts within 30 min to a reported mule cluster",
    scam_family: "INVESTMENT_TASK",
    family_name: "Investment or task scam",
    call_linked: false,
    message_linked: true,
    has_guardian: true,
    user_action: "HOLD_CANCELLED",
    is_near_miss: true,
    label: "FRAUD",
    latency_ms: 48,
    degraded: false,
    model_version: "xgb-rf-stack-v2.4",
    rules_version: "rules-2026.11",
  },
  {
    decision_id: "dec_9f2a106",
    created_at: agoIso(28),
    payer: "Kavita Rao",
    payer_vpa: "kavita.r@banka",
    payee_name: "Metro Rail Transit",
    payee_vpa: "bmrcl.ticketing@banka",
    amount: 420,
    tier: "SAFE",
    action: "ALLOW",
    enforced: true,
    score: 0.02,
    top_reason: "",
    scam_family: "UNCLASSIFIED",
    family_name: "",
    call_linked: false,
    message_linked: false,
    has_guardian: false,
    user_action: "PROCEEDED",
    is_near_miss: false,
    label: null,
    latency_ms: 21,
    degraded: false,
    model_version: "xgb-rf-stack-v2.4",
    rules_version: "rules-2026.11",
  },
];

export function getPreviewResponse(path: string, body?: any): any {
  const [cleanPath, qs] = path.split("?");
  const params = new URLSearchParams(qs || "");

  if (cleanPath === "/v1/policy") {
    return {
      mode: "enforce",
      t_warning: 0.3,
      t_stepup: 0.6,
      t_block: 0.85,
      t_decline: 0.95,
      demo_mode: true,
      effective: { hold_seconds: 120 },
    };
  }

  if (cleanPath === "/v1/policy/simulate") {
    const tW = body?.t_warning ?? 0.3;
    const tS = body?.t_stepup ?? 0.6;
    const tB = body?.t_block ?? 0.85;
    const delta = (0.6 - tS) * 0.25;
    return {
      n_decisions: 18420,
      n_fraud: 312,
      current: {
        scams_caught: 0.914,
        scams_warned_only: 0.062,
        scams_missed: 0.024,
        legit_warning: 0.0185,
        legit_stepup: 0.0042,
        legit_block: 0.0008,
        interruptions_per_1000: 5.0,
        rupees_protected: 4825000,
        rupees_at_risk: 5280000,
        precision_stepup_plus: 0.684,
      },
      proposed: {
        scams_caught: Math.max(0.5, Math.min(0.99, 0.914 + delta)),
        scams_warned_only: Math.max(0.01, 0.062 - delta * 0.5),
        scams_missed: Math.max(0.005, 0.024 - delta * 0.5),
        legit_warning: Math.max(0.003, 0.0185 + (0.3 - tW) * 0.04),
        legit_stepup: Math.max(0.001, 0.0042 + delta * 0.03),
        legit_block: Math.max(0.0002, 0.0008 + (0.85 - tB) * 0.01),
        interruptions_per_1000: Math.max(1.2, 5.0 + delta * 18),
        rupees_protected: Math.round(4825000 * (1 + delta * 0.4)),
        rupees_at_risk: 5280000,
        precision_stepup_plus: Math.max(0.3, Math.min(0.95, 0.684 - delta * 0.4)),
      },
      curve: [
        { t_stepup: 0.35, legit_interrupted: 0.024, scams_caught: 0.972 },
        { t_stepup: 0.45, legit_interrupted: 0.014, scams_caught: 0.956 },
        { t_stepup: 0.55, legit_interrupted: 0.008, scams_caught: 0.934 },
        { t_stepup: 0.60, legit_interrupted: 0.005, scams_caught: 0.914 },
        { t_stepup: 0.70, legit_interrupted: 0.0028, scams_caught: 0.872 },
        { t_stepup: 0.80, legit_interrupted: 0.0012, scams_caught: 0.798 },
      ],
      histogram: Array.from({ length: 20 }, (_, i) => ({
        lo: i * 0.05,
        legit: i < 4 ? Math.round(6200 / (i + 1)) : Math.max(2, Math.round(180 * Math.exp(-i * 0.35))),
        fraud: i > 11 ? Math.round(14 + (i - 11) * 9) : Math.max(0, Math.round(i * 0.6)),
      })),
    };
  }

  if (cleanPath === "/v1/metrics/summary") {
    return {
      rps_1m: 14.8,
      total: 42810,
      degraded: 0,
      timeouts: 0,
      cache_fallbacks: 2,
      fallback_rate: 0.0004,
      event_backlog: 0,
      events_published: 85620,
      event_handler_failures: 0,
      uptime_s: 14820,
      cache_warm_seconds: 1.8,
      active_model: "xgb-rf-stack-v2.4",
      rules_version: "rules-2026.11",
      text_model: "scam-text-tfidf-v1.3",
      last_hour: { n: 1842, warning: 44, step_up: 18, block: 9 },
      latency_ms: {
        read: { p50: 3.1, p95: 6.4, p99: 9.2 },
        features: { p50: 8.4, p95: 16.2, p99: 21.8 },
        rules: { p50: 0.6, p95: 1.1, p99: 1.7 },
        model: { p50: 4.2, p95: 7.8, p99: 10.4 },
        explain: { p50: 5.1, p95: 9.3, p99: 12.1 },
        total: { p50: 23.8, p95: 44.2, p99: 61.5 },
      },
      by_hour: Array.from({ length: 12 }, (_, i) => {
        const h = new Date(now() - (11 - i) * 3600_000).toISOString();
        return [
          { h, tier: "SAFE", n: 120 + (i % 4) * 28 },
          { h, tier: "WARNING", n: 8 + (i % 3) * 4 },
          { h, tier: "STEP_UP", n: 4 + (i % 2) * 3 },
          { h, tier: "BLOCK", n: 2 + (i % 3) },
        ];
      }).flat(),
      tiers: { SAFE: 40912, WARNING: 1208, STEP_UP: 465, BLOCK: 225 },
      environment: {
        database: "PostgreSQL 16 (embedded preview)",
        cache: "In-memory hot feature cache",
        event_bus: "Redis Streams (preview)",
        demo_mode: true,
      },
      graph_job: { runs: 24, seconds: 1.4, edges: 38410, nodes: 142 },
      chaos: { cache_down: false, model_down: false },
    };
  }

  if (cleanPath === "/v1/decisions") {
    const tierFilter = params.get("tier") || "";
    const q = (params.get("q") || "").toLowerCase();
    let list = DECISIONS;
    if (tierFilter) {
      const allowed = new Set(tierFilter.split(","));
      list = list.filter((d) => allowed.has(d.tier));
    }
    if (q) {
      list = list.filter((d) => d.payee_vpa.toLowerCase().includes(q) || d.payee_name.toLowerCase().includes(q));
    }
    return { decisions: list };
  }

  if (cleanPath.startsWith("/v1/decisions/")) {
    const id = cleanPath.split("/")[3];
    const d = DECISIONS.find((x) => x.decision_id === id) || DECISIONS[0];
    return {
      decision: {
        ...d,
        family_sim: 0.91,
        reasons: [
          { code: "ACTIVE_RISKY_CALL", message: "You are on a phone call with an unknown caller rated very high risk." },
          { code: "INSTITUTIONAL_MISMATCH", message: "The payee claimed to be a government desk, but the UPI account belongs to an individual opened 3 days ago." },
          { code: "MULE_NETWORK_HOP", message: "Funds sent to this account are rapidly forwarded to a reported mule account." },
        ],
        contributions: {
          call: 1.84,
          payee: 1.42,
          network: 1.15,
          name: 0.88,
          amount: 0.64,
          message: 0.52,
          relationship: 0.31,
          device: -0.22,
        },
        rules_fired: ["R_ACTIVE_CALL_NEW_PAYEE", "R_INSTITUTIONAL_PERSONAL"],
      },
      features: {
        vpa_entry_method: "typed",
        app_switch_count: 4,
        time_on_pay_screen_s: 74,
        amount_edit_count: 2,
        note_scam_prob: 0.82,
        name_match_score: 0.14,
        claimed_name_institutional: true,
        payee_is_individual: true,
        is_new_payee: true,
        prior_txn_count: 0,
        amount_over_p95: 4.8,
        device_is_new: false,
        vpa_age_days: 3,
        fan_in_1h: 9,
        fan_in_24h: 27,
        first_time_payer_ratio_24h: 0.96,
        reports_30d: 4,
        confirmed_90d: 2,
        near_miss_14d: 6,
        consortium_reported: true,
      },
      payer: { name: d.payer, vpa: d.payer_vpa, locale: "en" },
      payee: {
        registered_name: "Raju Verma",
        claimed_name: d.payee_name,
        kind: "individual",
        band: "REPORTED",
        trust_score: 12,
        consortium_source: "bank_b",
        reputation: { band: "REPORTED", trust_score: 12 },
        graph: { downstream_hop: 1, shares_device_with_reported: true, passthrough_ratio: 0.88 },
      },
      transaction: { note: "Case verification deposit", truth_is_fraud: true, truth_family: d.scam_family },
      summary: {
        provider: "template-explainer",
        summary: "High-confidence digital arrest scam pattern. The payer remained on an active call with an unknown high-risk number while typing a newly created individual UPI ID claimed as an official cyber cell desk.",
        key_evidence: [
          "Active unknown call (risk level 3) overlapped with 4 app switches during checkout",
          "Payee received funds from 27 first-time payers in 24h and forwards 88% downstream",
          "Consortium hash flagged as reported fraud at Bank B",
        ],
        suggested_action: "Confirm fraud label and retain pair block; generate complaint pack if payer requests one.",
      },
      score_parts: { p_xgb: 0.924, p_rf: 0.891, s_anom: 0.812, s_rule: 0.90, raw: 0.94 },
      rule_effects: [
        { id: "R_ACTIVE_CALL_NEW_PAYEE", floor: 0.65 },
        { id: "R_INSTITUTIONAL_PERSONAL", bump: 0.18 },
      ],
      timeline: [
        { type: "call", at: agoIso(7), caller_known: false, caller_risk: 3, ended_at: null, linked: true },
        { type: "message", at: agoIso(5), verdict: "SCAM", label: "digital_arrest", text: "Urgent cyber cell notice: transfer refundable verification deposit now.", linked: true },
        { type: "payment", at: d.created_at, amount: d.amount, tier: d.tier, linked: true },
        { type: "outcome", at: agoIso(1), user_action: d.user_action, final_status: "DECLINED" },
      ],
      outcome: { user_action: d.user_action, is_near_miss: d.is_near_miss },
      label: d.label ? { label: d.label, by_name: "Meera Nair" } : null,
    };
  }

  if (cleanPath === "/v1/near-misses") {
    if (params.get("group_by") === "payee") {
      return {
        payees: [
          { payee_vpa: "refund.care99@bankb", payee_name: "QuickRefund Helpdesk", near_misses: 6, amount: 89400, band: "CAUTION", trust_score: 34, last_at: agoIso(6) },
          { payee_vpa: "bill.disconnect@bankb", payee_name: "BESCOM Urgent Billing", near_misses: 4, amount: 28900, band: "CAUTION", trust_score: 41, last_at: agoIso(11) },
          { payee_vpa: "apex.tasks77@bankb", payee_name: "Apex Task Payouts", near_misses: 9, amount: 215000, band: "REPORTED", trust_score: 16, last_at: agoIso(21) },
        ],
      };
    }
    return {
      near_misses: DECISIONS.filter((d) => d.is_near_miss).map((d) => ({ ...d, near_miss_weight: 0.6 })),
    };
  }

  if (cleanPath === "/v1/reviews") {
    return {
      reviews: [
        {
          report_id: "rep_01",
          created_at: agoIso(14),
          kind: "FRAUD",
          reporter_name: "Ramesh Kulkarni",
          payee_vpa: "cyber.cell.verify@bankb",
          amount: 48500,
          tier: "BLOCK",
          decision_id: "dec_9f2a101",
          comment: "Caller threatened arrest unless I paid immediately.",
          status: "OPEN",
        },
        {
          report_id: "rep_02",
          created_at: agoIso(42),
          kind: "FALSE_POSITIVE",
          reporter_name: "Deepak Shah",
          payee_vpa: "sharma.hardware@banka",
          amount: 18500,
          tier: "STEP_UP",
          decision_id: "dec_9f2a103",
          comment: "Buying cement bags from my contractor, genuine payment.",
          status: "OPEN",
        },
      ],
    };
  }

  if (cleanPath === "/v1/payees") {
    return {
      payees: [
        { vpa: "cyber.cell.verify@bankb", registered_name: "Raju Verma", kind: "individual", verified: false, band: "REPORTED", trust_score: 12, updated_at: agoIso(2) },
        { vpa: "refund.care99@bankb", registered_name: "Manoj Kumar", kind: "individual", verified: false, band: "CAUTION", trust_score: 34, updated_at: agoIso(6) },
        { vpa: "apex.tasks77@bankb", registered_name: "Apex Services", kind: "individual", verified: false, band: "REPORTED", trust_score: 16, updated_at: agoIso(21) },
        { vpa: "freshmart.blr@banka", registered_name: "FreshMart Organics Pvt Ltd", kind: "merchant", verified: true, band: "TRUSTED", trust_score: 96, updated_at: agoIso(15) },
      ],
    };
  }

  if (cleanPath.startsWith("/v1/payees/")) {
    const vpa = decodeURIComponent(cleanPath.slice("/v1/payees/".length));
    return {
      vpa,
      registered_name: vpa.includes("freshmart") ? "FreshMart Organics Pvt Ltd" : "Raju Verma",
      kind: vpa.includes("freshmart") ? "merchant" : "individual",
      verified: vpa.includes("freshmart"),
      home_tenant: vpa.endsWith("@banka") ? "bank_a" : "bank_b",
      on_denylist: !vpa.includes("freshmart"),
      first_seen: agoIso(4320),
      reputation: {
        band: vpa.includes("freshmart") ? "TRUSTED" : "REPORTED",
        trust_score: vpa.includes("freshmart") ? 96 : 12,
        band_reason: vpa.includes("freshmart") ? null : "reported",
        fan_in_1h: 9,
        fan_in_24h: 27,
        first_time_payer_ratio_24h: 0.96,
        p_bad: 0.184,
        reports_30d: 4,
        confirmed_90d: 2,
        near_miss_14d: 6,
      },
      stats_30d: { amount: 412500, payments: 31, payers: 29 },
      history: [
        { at: agoIso(180), trust_score: 68, band: "NEUTRAL", cause: "baseline" },
        { at: agoIso(120), trust_score: 52, band: "CAUTION", cause: "near_miss" },
        { at: agoIso(60), trust_score: 31, band: "CAUTION", cause: "user_report" },
        { at: agoIso(15), trust_score: 12, band: "REPORTED", cause: "confirmed_fraud" },
      ],
      graph: { downstream_hop: 1, shares_device_with_reported: true, passthrough_ratio: 0.88, community_risk_share: 0.72 },
      consortium: [{ source_tenant: "bank_b", band: "REPORTED", confirmed: true, updated_at: agoIso(12) }],
      recent_decisions: DECISIONS.slice(0, 3),
      events: [
        { at: agoIso(2), kind: "confirmed", weight: 5.0 },
        { at: agoIso(18), kind: "nearmiss", weight: 0.6 },
        { at: agoIso(45), kind: "report", weight: 2.0 },
      ],
    };
  }

  if (cleanPath === "/v1/graph/neighbourhood") {
    return {
      nodes: [
        { id: "cyber.cell.verify@bankb", registered_name: "Cyber Cell Desk", band: "REPORTED", kind: "individual", centre: true, downstream_hop: 1, passthrough_ratio: 0.88, community_id: 14 },
        { id: "mule.hub01@bankb", registered_name: "R. Sharma Mule", band: "REPORTED", kind: "individual", downstream_hop: 0, passthrough_ratio: 0.94, community_id: 14 },
        { id: "refund.care99@bankb", registered_name: "QuickRefund Desk", band: "CAUTION", kind: "individual", downstream_hop: 1, passthrough_ratio: 0.71, community_id: 14 },
        { id: "cashout.agent@bankb", registered_name: "FastFX Outlet", band: "REPORTED", kind: "merchant", downstream_hop: 0, passthrough_ratio: 0.65, community_id: 14 },
        { id: "ramesh.k@banka", registered_name: "Ramesh Kulkarni", band: "TRUSTED", kind: "individual", downstream_hop: 9, passthrough_ratio: 0.02, community_id: 2 },
      ],
      edges: [
        { source: "ramesh.k@banka", target: "cyber.cell.verify@bankb", type: "payment", amount: 48500, count: 1 },
        { source: "cyber.cell.verify@bankb", target: "mule.hub01@bankb", type: "payment", amount: 184000, count: 6 },
        { source: "refund.care99@bankb", target: "mule.hub01@bankb", type: "payment", amount: 96500, count: 4 },
        { source: "mule.hub01@bankb", target: "cashout.agent@bankb", type: "payment", amount: 268000, count: 8 },
        { source: "cyber.cell.verify@bankb", target: "refund.care99@bankb", type: "device", amount: 0, count: 1 },
      ],
      graph_job: { last: 1, seconds: 1.4, edges: 38410 },
    };
  }

  if (cleanPath === "/v1/model-health/models") {
    return {
      active: "xgb-rf-stack-v2.4",
      models: [
        {
          version: "xgb-rf-stack-v2.4",
          stage: "active",
          created_at: agoIso(2880),
          metrics: { pr_auc: 0.9482, recall_stepup_plus: 0.914, recall_unseen: 0.842, recall_weak: 0.768, legit_stepup_plus: 0.005, legit_block: 0.0008, legit_warning: 0.0185, attribution_accuracy_seen: 0.932, attribution_accuracy: 0.884, score_latency_ms_p95: 7.8 },
          gates: { pr_auc: true, recall: true, false_positive: true, latency: true },
        },
        {
          version: "xgb-rf-stack-v2.3",
          stage: "archived",
          created_at: agoIso(14400),
          metrics: { pr_auc: 0.9315, recall_stepup_plus: 0.886, legit_stepup_plus: 0.0064, score_latency_ms_p95: 8.4 },
          gates: { pr_auc: true, recall: true, false_positive: true, latency: true },
        },
      ],
    };
  }

  if (cleanPath === "/v1/model-health/drift") {
    return {
      created_at: agoIso(12),
      features: [
        { feature: "__score__", psi: 0.042, status: "stable" },
        { feature: "amount_over_p95", psi: 0.138, status: "watch" },
        { feature: "fan_in_24h", psi: 0.064, status: "stable" },
        { feature: "vpa_age_days", psi: 0.051, status: "stable" },
        { feature: "note_scam_prob", psi: 0.089, status: "stable" },
      ],
    };
  }

  if (cleanPath === "/v1/model-health/fairness") {
    return {
      created_at: agoIso(12),
      dimensions: [
        {
          dimension: "segment",
          disparity_ratio: 1.18,
          flagged: false,
          segments: [
            { segment: "salaried", n_legit: 8420, share_warning: 0.016, share_stepup: 0.0038, share_block: 0.0007 },
            { segment: "small_business", n_legit: 4120, share_warning: 0.019, share_stepup: 0.0044, share_block: 0.0008 },
            { segment: "elderly", n_legit: 2380, share_warning: 0.021, share_stepup: 0.0045, share_block: 0.0009 },
          ],
        },
      ],
    };
  }

  if (cleanPath === "/v1/security/posture") {
    return {
      overall: "ok",
      counts: { locked_users: 1, locked_staff: 0, revoked_sessions: 4, users_with_enrolled_device: 612, caller_reports: 48, never_pay_entries: 93 },
      checks: [
        { key: "jwt", label: "Short-lived signed JWTs", status: "ok", detail: "HS256 with 48-byte secret, 60m sliding expiry, server-side revocation list active." },
        { key: "argon2", label: "Argon2id credential hashing", status: "ok", detail: "Passwords and 6-digit payer PINs hashed with Argon2id." },
        { key: "consortium", label: "Keyed-hash consortium privacy", status: "ok", detail: "Only HMAC-keyed VPA digests and aggregate counts cross bank boundaries." },
        { key: "demo", label: "Demo mode controls", status: "info", detail: "Local preview mode active for design inspection." },
      ],
      events_24h: { "staff.login": 18, "auth.login": 244, "auth.login_failed": 3, "caller.report": 11 },
      recent: [
        { created_at: agoIso(9), action: "caller.report", actor_name: "Ramesh Kulkarni", detail: { ip: "127.0.0.1" } },
        { created_at: agoIso(26), action: "auth.login_failed", actor_name: "Demo User", detail: { ip: "127.0.0.1" } },
      ],
    };
  }

  if (cleanPath === "/v1/audit") {
    return {
      entries: [
        { id: 1, created_at: agoIso(5), actor: "staff:meera", actor_name: "Meera Nair", action: "decision.label", subject: "dec_9f2a101", detail: { label: "FRAUD", family: "DIGITAL_ARREST" } },
        { id: 2, created_at: agoIso(35), actor: "staff:meera", actor_name: "Meera Nair", action: "policy.thresholds.update", subject: "bank_a", detail: { t_warning: 0.3, t_stepup: 0.6, t_block: 0.85 } },
        { id: 3, created_at: agoIso(90), actor: "staff:arjun", actor_name: "Arjun Rao", action: "review.resolve", subject: "rep_00", detail: { resolution: "CONFIRMED" } },
      ],
    };
  }

  if (cleanPath === "/v1/admin/staff") {
    return {
      staff: [
        { staff_id: "preview-admin", display_name: "Meera Nair", email: "meera.nair@banka.example", role: "admin", active: true, last_login_at: agoIso(4) },
        { staff_id: "st_2", display_name: "Arjun Rao", email: "arjun.rao@banka.example", role: "analyst", active: true, last_login_at: agoIso(22) },
        { staff_id: "st_3", display_name: "Sunita Sen", email: "sunita.sen@banka.example", role: "auditor", active: true, last_login_at: agoIso(140) },
      ],
    };
  }

  if (cleanPath === "/v1/admin/users") {
    return {
      total: 800,
      users: [
        { user_id: "u1", display_name: "Ramesh Kulkarni", phone: "90000 00001", primary_vpa: "ramesh.k@banka", segment: "elderly", age_band: "60+", locale: "en", active: true, is_demo: true },
        { user_id: "u2", display_name: "Ananya Deshmukh", phone: "90000 00002", primary_vpa: "ananya.d@banka", segment: "salaried", age_band: "25-39", locale: "en", active: true, is_demo: true },
        { user_id: "u3", display_name: "Vikram Joshi", phone: "90000 00003", primary_vpa: "vikram.j@banka", segment: "small_business", age_band: "40-59", locale: "hi", active: true, is_demo: true },
      ],
    };
  }

  if (cleanPath === "/v1/demo/scenarios") {
    return {
      users: [
        { user_id: "u1", display_name: "Ramesh Kulkarni", tenant_id: "bank_a", locale: "en" },
        { user_id: "u2", display_name: "Ananya Deshmukh", tenant_id: "bank_a", locale: "en" },
        { user_id: "u3", display_name: "Vikram Joshi", tenant_id: "bank_b", locale: "hi" },
      ],
      scenarios: [
        { key: "digital_arrest", title: "Digital arrest", payee: "cyber.cell.verify@bankb", amount: 48500, claimed_name: "Cyber Cell Desk", has_call: true, has_message: true },
        { key: "fake_refund", title: "Fake refund", payee: "refund.care99@bankb", amount: 14999, claimed_name: "QuickRefund Helpdesk", has_call: false, has_message: true },
        { key: "kyc_threat", title: "KYC / electricity disconnect", payee: "bill.disconnect@bankb", amount: 7250, claimed_name: "BESCOM Billing", has_call: true, has_message: true },
      ],
    };
  }

  return {};
}
