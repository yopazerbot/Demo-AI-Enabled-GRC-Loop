# GRC Control Loop — AI-Driven Cyber Risk Demo

A conference-grade single-page application that simulates a dynamic GRC (Governance, Risk, and Compliance) control loop for AI-driven cyber risk. Built for live conference demos.

## What it does

The demo walks through a complete governance engineering scenario:

1. **Threat Intelligence** — A new MISP-style threat event arrives (AI-assisted phishing campaign)
2. **Agent Orchestration** — Three agents analyze the threat, map risk, and generate policy
3. **Risk Mapping** — Threat mapped to ISO/IEC 27001 control themes with entity-specific impact
4. **Policy Studio** — Human-readable policy and policy-as-code artifact generated
5. **Governance Approval** — Human approval gate with business friction warning
6. **Environment Deployment** — Simulated corporate environment updates
7. **Executive Summary** — Board-level metrics refresh with before/after comparison

The demo features a fictive Belgian company (Verhelst Industries) — an NIS2 essential entity in the energy sector, ISO 27001 certified. Two scenarios are included: an AI-assisted phishing campaign and a critical RCE discovered through a bug bounty program.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- Lucide Icons

## Running Locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Production Build

```bash
npm run build
npm run start
```

## Deploy on Railway

This app is designed for Railway deployment:

1. Connect your GitHub repo to Railway
2. Railway auto-detects the Vite project
3. **Build command:** `npm run build`
4. **Start command:** `npm run start`
5. Railway sets the `PORT` environment variable automatically

No backend, no database, no environment variables required beyond `PORT`.

## Demo Flow

Click **"Simulate Incoming Threat Event"** to start the demo. The flow auto-advances through analysis phases, pauses at the **Approval Gate** for human interaction, then completes deployment after approval.

Use the **Skip** button to advance manually, or **Reset** to restart.

## Project Structure

```
src/
  components/     # UI panels and reusable components
  data/           # Mock data (threats, org structure, policies, etc.)
  hooks/          # State machine and custom hooks
  types/          # TypeScript type definitions
```
