#  AUTONOMOUS AGENT WORKFLOWS & SLASH COMMANDS

This document defines the strict, step-by-step Standard Operating Procedures (SOPs) for the agent when a user invokes a specific `/slash` command. Failure to follow every step sequentially is a violation of the Constitution.

---

## `/initialize` : The Genesis Protocol
**Trigger:** User inputs `/initialize` or drops a `prompt.md` and requests initialization.
**Objective:** Scaffold the monorepo based on the project tier and establish the initial state.

**Execution Steps:**
1. **Context Extraction:** Read `prompt.md` to understand the project requirements.
2. **Tier Classification:** Evaluate the requirements against the Tier Rubric (defined in `CONSTITUTION.md` / `INITIALIZATION.md`). Look for triggers like "Admin Dashboard" (Tier 1), "AI Processing" (Tier 2), or "Offline POS" (Tier 3).
3. **Directory Scaffolding:** Execute the bash commands defined in `INITIALIZATION.md` (Phase 1, Step 2) to build the folder structure.
4. **Environment Pruning:** Delete unnecessary directories (e.g., remove `apps/desktop` for a Tier 1 web app, or `apps/api` if strictly using Supabase client).
5. **Configuration Setup:** Generate `pnpm-workspace.yaml`, `turbo.json`, root `package.json`, and `.devcontainer.json`.
6. **State Initialization:** Overwrite `.system/state/STATE.md` and `.system/state/MEMEX.md` with the initial scaffolding state.
7. **Gap Analysis Interrogation:** Identify any architectural ambiguities in the `prompt.md`. Output a numbered list of clarifying questions to the user and **HALT**. Wait for answers before proceeding to Phase 2 (Blueprinting).

---

## `/blueprint` : The Master Architecture Generation
**Trigger:** User provides answers to the `/initialize` clarifying questions.
**Objective:** Generate the master architecture blueprint before writing any code.

**Execution Steps:**
1. **Analyze Responses:** Ingest the user's answers to the clarifying questions.
2. **Document Architecture:** Write `.system/architecture/ARCHITECTURE.md`. This must include:
   - System Topology (Frontend -> Backend -> DB).
   - Core Database Schema (Entities & Relationships).
   - Interface Contracts (Pydantic / Zod generation plan).
   - Data Flow definitions.
3. **State Update:** Update `.system/state/STATE.md` to indicate Phase 2 is complete.
4. **Approval Request:** Output: `[SYSTEM MESSAGE] Blueprint generated at .system/architecture/ARCHITECTURE.md. Review and reply '/build' to begin implementation.` and **HALT**.

---

## `/build` : The Autonomous Execution Loop
**Trigger:** User inputs `/build` after blueprint approval, or provides a new feature request.
**Objective:** Execute code changes following the "3-Strike Verification" rule.

**Execution Steps:**
1. **Context Sync:** Read `.system/state/STATE.md` to identify the next pending task. Read `ARCHITECTURE.md` to ensure modifications align with the master plan.
2. **Implementation:** Write the code. Start with backend Pydantic models/schemas if full-stack, then propagate to the frontend.
3. **Verification (Strike 1):** Run `pnpm turbo run build` and `pnpm typecheck`.
   - **If Pass:** Proceed to Step 4.
   - **If Fail:** Read the `stderr`, identify the fix, document the failure in `.system/state/ERROR_REGISTRY.md`, and retry.
4. **Verification (Strike 2 & 3):** If fixing the error fails up to 3 times, execute `git reset --hard HEAD` and `git clean -fd` to revert to the last stable state. Output `CRITICAL FAILURE. HUMAN INTERVENTION REQUIRED.` and **HALT**.
5. **State Update:** Mark the task as complete in `.system/state/STATE.md`. Add a chronological entry to `.system/state/MEMEX.md` detailing the changes made.

---

## `/checkpoint` : State Synchronization
**Trigger:** User inputs `/checkpoint` or periodic agent auto-trigger after major changes.
**Objective:** Ensure the AI's internal memory files match the exact repository reality.

**Execution Steps:**
1. **Audit Files:** Check the `apps/` and `packages/` directories to understand current file states.
2. **Update MEMEX:** Append a summary of all recent actions, file additions, and solved errors to `.system/state/MEMEX.md`.
3. **Update STATE:** Adjust completion percentages, active missions, and blockers in `.system/state/STATE.md`.
4. **Output:** Acknowledge the checkpoint is complete.

---

## `/audit` : The "80/20" Security & Quality Check
**Trigger:** Nearing completion of a sprint or user inputs `/audit`.
**Objective:** Prevent hallucinated code, broken types, and exposed secrets.

**Execution Steps:**
1. **Secret Scanning:** Grep for `NEXT_PUBLIC_` and verify no production secrets (e.g., Stripe, Supabase service keys) are hardcoded.
2. **RLS Verification:** Check Supabase migrations (`.sql` files) to ensure `ALTER TABLE x ENABLE ROW LEVEL SECURITY;` is present for every table.
3. **Type Strictness:** Run `pnpm typecheck` to ensure there are no `any` types escaping boundary layers.
4. **Linting:** Run `pnpm lint`.
5. **Report:** Output an audit report. If issues are found, log them in `STATE.md` as priority tasks.

---

## `/handover` : Project Completion & Documentation
**Trigger:** System reaches 100% completion or user inputs `/handover`.
**Objective:** Package the repository for human deployment and maintenance.

**Execution Steps:**
1. **Final Audit:** Automatically trigger the `/audit` workflow.
2. **API Documentation:** Generate or verify OpenAPI/Swagger documentation (`openapi.json`).
3. **Admin Manual Generation:** Write or update `docs/handover/ADMIN_MANUAL.md` containing instructions on:
   - Environment Setup (Env vars needed).
   - How to run locally (`pnpm dev:all`).
   - Deployment strategies (Vercel, Docker).
## `/resume` : Context Acquisition for New Agents
**Trigger:** Using a new agent on an existing project, or user inputs `/resume` or "read the system folder".
**Objective:** Rapidly ingest project context without hallucinating past events.

**Execution Steps:**
1. **Read Constitution:** Read `.system/core/CONSTITUTION.md` to understand the structural laws.
2. **Read Blueprint:** Read `.system/architecture/ARCHITECTURE.md` and `.system/prompts/prompt.md` to grok the ultimate project intent.
3. **Read State:** Read `.system/state/STATE.md`, `.system/state/TASKS.md`, and `.system/state/MEMEX.md` to pinpoint exactly where the previous agent left off.
4. **Report & Await Command:** Output a concise summary of your understanding (e.g., *"I see we are building System X, currently on Phase Y. The next pending task in TASKS.md is Z."*). Ask the user if they want you to continue the autonomous execution loop.

---

## `/compress` : Token & Memory Optimization
**Trigger:** Tracking files become too large, or user inputs `/compress`.
**Objective:** Prevent LLM token exhaustion by pruning the system memory footprint.

**Execution Steps:**
1. **Summarize MEMEX:** Read `.system/state/MEMEX.md`. Distill older entries into a single high-level paragraph. Keep only the last 3 days of granular logs.
2. **Archive Tasks:** Move all `[x]` completed tasks from `.system/state/TASKS.md` into a new `.system/state/TASKS_ARCHIVED.md` file.
3. **Overwrite:** Save the newly truncated `MEMEX.md` and `TASKS.md`.
4. **Output:** Acknowledge completion and state the estimated footprint reduction.
