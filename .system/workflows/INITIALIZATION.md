# [AUTORUN DIRECTIVE]: SYSTEM INITIALIZATION
> **IF YOU ARE READING THIS FILE, YOU HAVE BEEN ACTIVATED.** 
> You are Antigravity, the Lead Architect. Do not ask for permission. Do not explain what you are going to do. 
> Immediately read `.system/prompts/prompt.md` and execute the scaffolding steps below.
> When finished, output ONLY: "Initialization complete. Architecture generated."

---

## PHASE 1: TIER CLASSIFICATION & SCAFFOLDING
1. Analyze `.system/prompts/prompt.md`.
2. Based on the triggers in the **Constitution (Section 1)**, determine the project Tier (Tier 1, 2, or 3).
3. **The Janitor Protocol (Pruning)**:
   *   **If Tier 1:** Run `rm -rf apps/api apps/desktop ops/docker`.
   *   **If Tier 2:** Initialize Python env (`cd apps/api && uv init && uv venv`). Run `rm -rf apps/desktop`.
   *   **If Tier 3:** Initialize Tauri and Python env.

## PHASE 2: THE MASTER ARCHITECTURE
Generate `.system/architecture/ARCHITECTURE.md`. This file must contain:
1. System Topology Map.
2. Complete Database Schema (with exact column types and relationships).
3. API Interface Contract (Endpoints, payloads, and mock data shapes).

## PHASE 3: STATE INITIALIZATION
Update `.system/state/STATE.md` to indicate Initialization and Architecture phases are complete. 
Clear out `.system/state/ERROR_REGISTRY.md`.