# GRC Control Loop — AI-Driven Cyber Risk Demo

A conference-grade single-page application that simulates a dynamic **GRC (Governance, Risk & Compliance) control loop** driven by AI agents. Built to show — in one continuous narrative — how a modern enterprise can ingest threat intelligence, assess risk against ISO/IEC 27001 themes, draft policy (human-readable *and* policy-as-code), route it through a human approval gate, deploy it to the environment, and close the loop with board-level reporting.

The entire pipeline is visualised in real time across seven coordinated panels so an audience can follow the story without a narrator.

---

## Table of Contents

- [What it demonstrates](#what-it-demonstrates)
- [The fictive company](#the-fictive-company)
- [Scenarios](#scenarios)
- [The control loop (demo phases)](#the-control-loop-demo-phases)
- [The seven panels](#the-seven-panels)
- [Controls & keyboard shortcuts](#controls--keyboard-shortcuts)
- [Tech stack](#tech-stack)
- [Running locally](#running-locally)
- [Production build & deployment](#production-build--deployment)
- [Project structure](#project-structure)
- [Adding a new scenario](#adding-a-new-scenario)
- [Design principles](#design-principles)

---

## What it demonstrates

The demo tells a single story in seven acts, showing how an AI-assisted GRC platform can collapse what is normally weeks of threat-triage → risk-analysis → policy-drafting → approvals → deployment → reporting into an orchestrated, auditable loop:

1. **Threat Intelligence arrives** — a new event lands on the feed (MISP, CERT-EU, a bug-bounty report, a CSPM scanner, a vendor disclosure).
2. **AI agents triage it** — three specialised agents read the event, map it to the risk register, and draft a control response.
3. **Risk is mapped to ISO 27001 controls** — the residual exposure is calculated and tied to a specific ISO/IEC 27001:2022 control theme with entity-level impact.
4. **Policy Studio generates the artifact** — a human-readable policy *and* a policy-as-code artifact are drafted automatically.
5. **A human approval gate pauses the loop** — the CISO (or delegated approver) can approve or reject. Business-friction warnings are surfaced explicitly.
6. **The environment updates** — affected assets transition from non-compliant to compliant; the compliance score recalculates.
7. **The board sees the result** — executive metrics (risk score, compliance posture, open findings, control coverage) refresh with a before/after narrative suitable for a board pack.

Every transition is recorded in an audit trail that can be replayed step by step (or stepped *backwards* — useful during live presentations).

---

## The fictive company

**Verhelst Industries** — a Belgian mid-cap designated as an **NIS2 essential entity** in the energy sector, **ISO/IEC 27001:2022 certified**. The fictive company exists to make the scenarios concrete: real risk owners, real org structure, real controls, real regulatory backdrop.

This makes the demo land equally well with:

- **CISO / CIO audiences** (technical control engineering, SDLC, IAM, OT)
- **Risk & audit audiences** (ISO 27001 mapping, residual exposure, audit trail)
- **Board / executive audiences** (before/after metrics, appetite statements)
- **Regulatory audiences** (NIS2 incident obligations, GDPR Art. 33 timelines)

---

## Scenarios

The app ships with **five realistic scenarios** plus a plain-language walkthrough. Each scenario is fully modelled end-to-end: threat event, risk mapping, ISO control refs, policy artifact, approval request, before/after environment state, before/after executive metrics, agent narration, and audit entries.

### 1. Bug Bounty Critical RCE *(default scenario)*
- **Icon:** `Bug` (Lucide) · **Source:** Verhelst Bug Bounty Program
- A researcher discloses an unauthenticated RCE in an open-source JWT library used by 14 services. No SCA gating in CI/CD.
- **ISO control theme:** A.8.25–28 — Secure Development
- **Response policy:** mandatory SCA gating in CI/CD, 24-hour patch SLA for critical CVEs, SBOM generation & validation.

### 2. AI Phishing Campaign
- **Icon:** `ShieldAlert` (Lucide) · **Source:** CERT.be / MISP Community
- AiTM phishing campaign using LLMs targeting cloud identities and OAuth tokens at EU energy operators. 23% of privileged accounts still on legacy MFA.
- **ISO control theme:** A.8 — Access Control
- **Response policy:** phishing-resistant MFA (FIDO2/passkeys), admin-approved OAuth consent, compliant-device requirement.

### 3. Ransomware on OT *(NIS2)*
- **Icon:** `Lock` (Lucide) · **Source:** ENISA / CERT-EU
- A Clop-variant double-extortion campaign hitting EU discrete manufacturing MES/SCADA. Three Verhelst plants run flat IT/OT networks with online-only backups.
- **ISO control theme:** A.5.29–30, A.8.13 — Business Continuity & Backup
- **Response policy:** Purdue-aligned IT/OT segmentation, daily immutable offline backups, Privileged Access Workstations for OT admins.

### 4. Third-Party HR Vendor Breach *(GDPR / TPRM)*
- **Icon:** `Building2` (Lucide) · **Source:** PeopleHub Trust Center / CERT-EU
- The HR SaaS vendor PeopleHub discloses a breach via leaked API key. 1.2M workers across the EU affected; 4,200 at Verhelst.
- **ISO control theme:** A.5.19–22, A.5.34 — Supplier Risk & Privacy
- **Response policy:** OAuth + mTLS for all vendor integrations, 72-hour GDPR Art. 33 escalation runbook, egress monitoring on vendor connectors.

### 5. Exposed Cloud Storage *(CSPM)*
- **Icon:** `Cloud` (Lucide) · **Source:** Wiz CSPM / AWS Security Hub
- A public S3 bucket exposing 42,000 signed customer contracts is detected. No preventive SCP in place; CSPM is detective-only.
- **ISO control theme:** A.5.23, A.8.12 — Cloud Security & DLP
- **Response policy:** organization-wide SCPs blocking public storage, customer-managed keys at rest, continuous CSPM drift detection.

### 6. Explainer *(walkthrough)*
- **Icon:** `BookOpen` (Lucide) · A plain-language walkthrough of the seven-phase process, useful as an opening to the talk or for non-technical audiences.

Switch scenarios at any time using the **Scenario Switcher** bar beneath the header (disabled while a demo run is in progress — reset first).

---

## The control loop (demo phases)

The state machine (`src/hooks/useDemoStateMachine.ts`) advances through nine ordered phases:

| # | Phase | What happens |
|---|---|---|
| 0 | `idle` | Waiting for a trigger. |
| 1 | `new_event_received` | Threat event lands on the feed. |
| 2 | `threat_analysis_in_progress` | Threat Intake Agent parses the event. |
| 3 | `risk_mapped` | Risk Assessment Agent maps the threat to the risk register & ISO controls. |
| 4 | `policy_generated` | Control Engineering Agent drafts the policy + policy-as-code. |
| 5 | `awaiting_approval` | Human approval gate — loop pauses. |
| 6 | `deployment_in_progress` | Deployment animation; assets transition. |
| 7 | `environment_updated` | Target state reached; all affected assets compliant. |
| 8 | `deployment_complete` | Board metrics refreshed; audit trail finalised. |

Each phase writes an entry to the audit trail with actor, action, and detail. Phases can be **stepped forward *and* backward**, so a presenter can replay a transition on demand.

---

## The seven panels

| Panel | Responsibility | File |
|---|---|---|
| **Threat Intelligence** | Displays the inbound event, source, TLP, and threat vector. Houses the **Start Demo** button when idle. | `ThreatFeedPanel.tsx` |
| **Agent Orchestration** | Shows the three specialised agents and their live status (idle / processing / completed) plus per-agent output summary. | `AgentPanel.tsx` |
| **Risk Assessment** | Surfaces the ISO/IEC 27001 theme, risk statement, likelihood, impact, and a scenario-specific callout. | `AnalysisPanel.tsx` |
| **Policy Studio** | Renders the drafted policy: ID, title, icon-coded requirements, rollout scope. | `PolicyPanel.tsx` |
| **Approval Gate** | The human decision point: reason-for-change, expected impact, business-friction warning, approve/reject buttons. | `ApprovalPanel.tsx` |
| **Corporate Environment** | Wide panel showing affected assets transitioning from non-compliant → compliant during deployment. | `EnvironmentPanel.tsx` |
| **Executive Summary** | Board-level metrics: risk score, compliance posture, open findings, control coverage, with sparkline trends and a before/after board statement. | `ExecutivePanel.tsx` |

Two supporting panels frame the story:

- **OrgContext** — fixed strip showing which entity is in scope (Verhelst Industries).
- **FlowTimeline** — compact horizontal timeline of the nine phases with the current phase highlighted.

---

## Controls & keyboard shortcuts

| Input | Action |
|---|---|
| Click **Start Demo** | Trigger the scenario from idle. |
| **→** · **Space** · **PageDown** | Advance to the next phase. At the approval gate, advances = approve. |
| **←** · **PageUp** | Step backward through phases (audit trail is trimmed accordingly). |
| **R** | Reset the demo to idle (ignored while already idle). |
| **Approve / Reject** buttons | Human approval decision at the approval gate. |
| **Scenario Switcher** | Swap scenarios while idle; disabled during an active run. |

Keyboard shortcuts are suppressed when focus is inside an input / textarea / contenteditable, and when a modifier key (`⌘` / `Ctrl` / `Alt`) is held.

---

## Tech stack

- **React 19** + **TypeScript** (strict)
- **Vite 8** (dev server & build)
- **Tailwind CSS 4** (utility styling via `@tailwindcss/vite`)
- **Framer Motion 12** (panel and state-transition animations)
- **Lucide Icons** (single-stroke line-art icon set)
- **ESLint 9** + `typescript-eslint` + `eslint-plugin-react-hooks`

No backend, no database, no external services — the demo is entirely client-side and runs from static assets.

---

## Running locally

```bash
npm install
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173).

Other useful scripts:

```bash
npm run lint       # ESLint over the project
npm run build      # tsc -b && vite build (production bundle into ./dist)
npm run preview    # Serve the production build locally
```

---

## Production build & deployment

### Local production build

```bash
npm run build
npm run start   # vite preview --host 0.0.0.0 --port ${PORT:-4173}
```

### Railway

The app is designed for one-click Railway deployment:

1. Connect your GitHub repo to Railway.
2. Railway auto-detects the Vite project.
3. **Build command:** `npm run build`
4. **Start command:** `npm run start`
5. Railway injects `PORT` automatically — nothing else is required.

No backend, no database, no environment variables to configure beyond `PORT`.

---

## Project structure

```
src/
  App.tsx                        # App shell, layout grid, keyboard handler
  main.tsx                       # React entrypoint
  index.css                      # Tailwind layer + theme tokens
  components/
    Header.tsx                   # Top bar (phase badge, theme toggle)
    OrgContext.tsx               # In-scope entity strip
    ScenarioSwitcher.tsx         # Scenario picker
    FlowTimeline.tsx             # Nine-phase timeline
    PhaseControls.tsx            # Advance / back / reset buttons
    PanelShell.tsx               # Reusable panel chrome (title, badge, state)
    ThreatFeedPanel.tsx          # Panel 1: Threat intel
    AgentPanel.tsx               # Panel 2: Agent orchestration
    AnalysisPanel.tsx            # Panel 3: Risk assessment
    PolicyPanel.tsx              # Panel 4: Policy Studio
    ApprovalPanel.tsx            # Panel 5: Approval gate
    EnvironmentPanel.tsx         # Panel 6: Corporate environment
    ExecutivePanel.tsx           # Panel 7: Executive summary
    MiniSparkline.tsx            # Reusable trend sparkline
  data/
    scenarioTypes.ts             # ScenarioData interface + icon unions
    scenarios.ts                 # All six scenarios (explainer + five real)
  hooks/
    useDemoStateMachine.ts       # Phase machine, audit trail, scenario state
    usePanelState.ts             # Per-panel active/dimmed derivation
    useTheme.ts                  # Light/dark theme toggle
  types/
    index.ts                     # Core domain types (Threat, Risk, Policy, …)
```

---

## Adding a new scenario

Every scenario is a self-contained `ScenarioData` object. To add one:

1. **Open** `src/data/scenarios.ts`.
2. **Copy** an existing scenario (e.g. `scenario5`) and give it a unique `id`, `label`, `subtitle`, and `icon`.
3. **Populate every field** — the type system in `src/data/scenarioTypes.ts` enforces completeness:
   - `threatEvent`, `threatSummary`, `riskMapping`, `analysisSummary`
   - `policy`, `policySummary`, `approval`, `approvalSummary`
   - `envBefore` / `envAfter` (five affected assets each)
   - `metricsBefore` / `metricsAfter` (risk score, compliance posture, open findings, control coverage, 6-point trends)
   - `agents` (the three canonical agent IDs: `threat-intake`, `risk-mapping`, `control-engineering`)
   - `agentSteps` (per-agent `processing` + `output` lines)
   - `auditEntries` (one per phase)
   - `boardStatement` and `controlAction`
4. **Register** the scenario by adding it to `ALL_SCENARIOS` at the bottom of the file.
5. **If you introduce a new icon:**
   - Extend the `icon` union in `src/data/scenarioTypes.ts`.
   - Register the matching Lucide icon in `src/components/ScenarioSwitcher.tsx` → `ICONS`.
6. **If you introduce a new policy-requirement icon:**
   - Extend the `requirements[].icon` union in `src/data/scenarioTypes.ts`.
   - Register the matching Lucide icon in `src/components/PolicyPanel.tsx` → `ICON_MAP`.

`npm run build` will fail loudly if any field is missing — lean on the types.

---

## Design principles

- **Narrative over dashboard.** Every panel tells *one* part of one story; an audience should be able to follow the loop without being guided.
- **Reversible demo.** Arrow keys step the state machine forward *and* backward, so a presenter can replay any transition live.
- **ISO-27001-literate.** Every scenario maps to specific A-series control themes so risk, audit, and regulatory audiences recognise the language.
- **Policy-as-code, not just prose.** The Policy Studio models both the human-readable policy *and* the artifact that would be deployed.
- **Human in the loop.** The approval gate is deliberately the pinch-point of the demo — AI drafts, humans decide.
- **Board-ready output.** The Executive panel closes the loop with a board-appropriate before/after statement, not just raw metrics.
