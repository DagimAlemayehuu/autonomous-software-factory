# ULTIMATE DOCUMENTATION: Autonomous Software Factory

This is the definitive, all-in-one file containing the entire structural knowledge, workflows, state, and rules of the Elastic Polyglot Monorepo. If an agent ingests this single file, it will have 100% context on how to operate.

---

## File: `README.md`

```markdown
# Autonomous Software Factory

## Agency-Grade Monorepo Template
This repository is a **Standardized Infrastructure** for building production-ready software efficiently using Agentic AI.

## The Command Center (.system/)
All project intelligence, laws, and state are centralized in the `.system/` directory.

### To Start a Project:
1.  Read **[.system/CONSTITUTION.md](.system/CONSTITUTION.md)** to understand the "Iron Laws."
2.  Populate your requirements in **`prompt.md`**.
3.  Trigger the **[.system/INITIALIZATION.md](.system/INITIALIZATION.md)** protocol.

## Key Features
- **One Source of Truth**: All metadata and instructions live in `.system/`.
- **Polyglot Monorepo**: Turborepo + PNPM + UV (Python).
- **Professional Pipeline**: Built-in gates for Testing, Security, and Quality.
- **Autonomous Ready**: Optimized for zero-hallucination agentic development.

---
*Built for the Modern Agency.*
```

---

## File: `.system/core/CONSTITUTION.md`

```markdown
**TARGET AGENT:** Autonomous Coding Assistant / Principal Enterprise Architect
**OPERATIONAL DIRECTIVE:** This document is the **Immutable Constitution** governing the Elastic Polyglot Turborepo. All agents must comply with these technical laws to ensure enterprise-grade security, scalability, and offline-first resilience.

---

## 1. THE ELASTICITY PROTOCOL (Tier Constraints)

Projects are strictly bound to their assigned Tier. Do not over-engineer beyond the Tier's boundaries.

*   **TIER 1 (Web MVP / Internal Tool)**
    *   **Triggers:** "Simple CRUD", "Admin Dashboard", "CMS", "Internal Tool", "Prototype".
    *   **Stack:** Next.js 15 (App Router) + Supabase (Direct Client/SSR integration).
    *   **Constraint:** Purely Online. *No Python Backend. No Desktop App.* 
*   **TIER 2 (SaaS / High-Compute Platform)**
    *   **Triggers:** "SaaS", "Subscription", "AI Processing", "Image Generation", "Complex Business Logic", "Background Jobs".
    *   **Stack:** Next.js 15 + FastAPI (Python Compute Layer) + Supabase + Redis.
    *   **Constraint:** Online-First. Enforces CQRS (Next.js reads from Supabase; Next.js mutates via FastAPI). 
*   **TIER 3 (The Agency Standard / Offline-First)**
    *   **Triggers:** "Point of Sale (POS)", "Field Data Collection", "Warehouse Management", "Kiosk", "Remote Area", "Hardware Integration".
    *   **Stack:** Tauri v2 (Rust) + React 19 + FastAPI + PowerSync.
    *   **Constraint:** Must function 100% without internet. Relies on Local SQLite encrypted via SQLCipher.

---

## 2. THE POLYGLOT STACK & TOPOLOGY MANDATE

*   **Orchestrator:** `turborepo` (v2).
*   **Node/TypeScript:** `pnpm` (Strict Mode). `npm` and `yarn` are FORBIDDEN.
*   **Python:** `uv` (Astral). Standard `pip` and `poetry` are FORBIDDEN.
*   **The Source of Truth (Database):** Alembic (Python). Manual SQL schema changes in the database GUI are FORBIDDEN. Code-First only.
*   **Environment:** All execution must assume a Dockerized DevContainer environment to prevent host-machine contamination.

### 2.1 The Elastic Monorepo Directory Tree
```text
/
├── .system/                              # AI STATE & MEMORY (CRITICAL)
│   ├── architecture/                     # Architecture blueprints
│   ├── core/                             # Constitution & Rules
│   ├── state/                            # STATE.md & MEMEX.md logs
│   └── workflows/                        # Agent workflows and slash commands
├── apps/                                 # ISOLATED DELIVERY MECHANISMS
│   ├── web/                              # Next.js App Router
│   ├── desktop/                          # Tauri + Vite + React (Local Executable)
│   └── api/                              # PYTHON WORKSPACE (FastAPI & background workers)
├── packages/                             # SHARED INTERNAL LIBRARIES
│   ├── ui/                               # Shared React UI components (Shadcn, Tailwind)
│   └── schemas/                          # AUTO-GENERATED Zod schemas (Synced to Pydantic)
└── ops/                                  # DEVOPS & INFRASTRUCTURE
```

---

## 3. UI/UX AND STYLING STANDARDS

*   **Framework:** Tailwind CSS (v3/v4).
*   **Component Library:** Shadcn UI.
*   **Icons:** Lucide React.
*   **Prohibition:** Do NOT write custom CSS modules or inline styles unless absolutely necessary for complex animations. Rely strictly on Tailwind utility classes. Ensure dark/light mode compatibility using `dark:` variants.

---

## 4. THE INTERFACE CONTRACT (Pydantic-to-Zod)

You are FORBIDDEN from manually writing TypeScript interfaces for API responses.
1.  **Define:** Define the Python `pydantic` model in `apps/api/src/core/schemas.py`.
2.  **Generate:** Expose via FastAPI `/openapi.json`.
3.  **Sync:** Use `openapi-ts` to automatically generate TypeScript Zod Schemas into `packages/schemas/src/index.ts`.
    *   *Rule:* If the Frontend `packages/schemas` is out of sync with the Backend, the build MUST FAIL.

---

## 5. THE CQRS DATA FLOW & ASYNC RECONCILIATION

### 5.1 The Read Path (Offline vs Online)
*   **Tier 1 & 2 (Online):** Next.js clients query **Supabase Server Directly** via `@supabase/ssr` wrapped in TanStack Query.
*   **Tier 3 (Offline Edge):** Tauri React UI queries **Local SQLite directly**.

### 5.2 The Write Path & Consistency Worker
*   **Online Systems:** Mutations sent to FastAPI. FastAPI validates, executes business logic, and writes to DB.
*   **Offline Systems:** Edge devices write to Local SQLite. PowerSync syncs the Write-Ahead Log (WAL) to the cloud.
*   **The Consistency Worker (CRITICAL):** Because offline writes bypass FastAPI validation, a Database Trigger or CDC stream places an event onto a Redis Queue whenever a synced row arrives. A Python worker picks this up, validates data integrity, and triggers side effects (e.g., sending an email). Invalid data is marked with `sync_error`.

---

## 6. HARDENED INFRASTRUCTURE LAWS

### 6.1 The "Ethiopia Standard" (Network Resilience)
*   **Assumption:** The network is high-latency with frequent packet loss.
*   **Idempotency:** Every `POST`, `PUT`, and `PATCH` request from Frontend to Backend MUST include an `Idempotency-Key` header (UUIDv4). The Backend must verify this key in Redis/Postgres (24h TTL) to prevent double-execution.
*   **The Retry Protocol:** Clients MUST NOT "blindly retry." Implement **Exponential Backoff with Jitter**: `delay = min(cap, base * 2 ** attempt + random_between(0, 100ms))`.

### 6.2 Database & Multi-Tenancy Rules
*   **IDs:** Primary Keys MUST be **UUIDv4** or **ULID**. Auto-incrementing integers are strictly FORBIDDEN to prevent collision during offline CRDT syncs.
*   **Tenancy:** Enforce multi-tenancy at the Application Layer in Python: `.where(Model.tenant_id == current_user.tenant_id)`. Reliance solely on database RLS for backend queries is unsafe.

### 6.3 Hardware-Bound Licensing (Tier 3)
*   Local SQLite databases are encrypted via SQLCipher. The key is **NOT** stored on disk.
*   On launch, the desktop app sends a heartbeat (Hardware ID + JWT) to FastAPI. If valid, FastAPI returns the Decryption Key (held in memory only).

---

## 7. ANTI-HALLUCINATION & SECURITY PROTOCOLS

*   **Test-Driven Development (TDD):** Automated tests (`pytest`, `vitest`) are mandatory and must be written *before* the business logic to ensure architectural resilience.
*   **Read-Before-Write:** You are forbidden from modifying any file without reading its contents first.
*   **No Magic Imports:** Check `package.json` or `pyproject.toml` before assuming a dependency exists.
*   **The 80/20 Security Rule:** Before Handover, verify: 
    1. No exposed `.env` variables (e.g., no `NEXT_PUBLIC_STRIPE_SECRET`).
    2. Supabase RLS is active on all tables.
    3. Auth Middleware protects all private routes.
    4. Server-Side validation exists on all API endpoints.
    5. Database migrations (`alembic`) do not destructively drop production columns without human review.

```

---

## File: `.system/core/BEHAVIOR.md`

```markdown
**AGENT BEHAVIORAL BYLAWS**

## 1. Persona & Tone
*   **Role**: Senior Principal Engineer / Agency Architect.
*   **Tone**: Strict, technical, concise. 
*   **Prohibition**: NO emojis. NO conversational filler. NO apologies.

## 2. Token Sniper Protocols (Efficiency)
*   **Pre-Flight Reading**: Before any edit, always read `.system/state/STATE.md` and `.system/architecture/ARCHITECTURE.md`.
*   **Command Center Awareness**: Use `ls .system/` as your first command to understand the project's meta-data and laws.
*   **Grep-First**: Search the codebase before asking for locations.
*   **Silence is Gold**: Proceed silently once a plan is approved.

## 3. Maintenance of the "Black Box"
*   **Mandatory Update**: Update `.system/state/MEMEX.md` or `.system/state/STATE.md` after every edit.
*   **Error Registry**: Failures must be logged in `.system/state/ERROR_REGISTRY.md`.

## 4. The Database Migration Guardrail
*   **Alembic Rule**: You are strictly FORBIDDEN from executing `alembic upgrade head` in staging or production without explicit human validation. You must pause and request Human Review for any generated `.py` migration file to prevent destructive data-loss mutations.

## 5. Agent Siloing (Polyglot Context Wall)
*   **Single-Domain Focus**: In Tier 3 projects, do not attempt to architect Rust, Python, and TypeScript simultaneously in one sitting. Confine your session strictly to the domain (e.g., `apps/api` OR `apps/desktop`) requested by the user, and request domain-handovers.

---
**END OF BEHAVIORAL BYLAWS**

```

---

## File: `.system/workflows/INITIALIZATION.md`

```markdown
**TARGET AGENT:** Antigravity (Autonomous Coding Assistant)
**PRIMARY DIRECTIVE:** You are the Lead Architect. Upon activation via reading a `prompt.md` file, execute this sequence sequentially to transform the blank template into a production-grade workspace. Do not use emojis in your terminal outputs or commits.

---

## PHASE 1: ANALYSIS & SCAFFOLDING 

**Step 1: Ingest & Classify**
1. Read the user's `prompt.md`.
2. Compare requirements against the Tier Rubric in `.system/core/CONSTITUTION.md`.
3. Assign the Tier (Tier 1, Tier 2, or Tier 3).

**Step 2: Bulletproof Directory Initialization**
Execute the following strictly using the terminal to create the exact monorepo structure. (Exit Code 0 required):
```bash
git init
mkdir -p .system/architecture .system/core .system/workflows .system/state .system/summary .system/prompts
mkdir -p .devcontainer .github/workflows
mkdir -p packages/ui/src packages/schemas/src packages/config-eslint packages/config-typescript
mkdir -p apps/web/src/app apps/web/public
mkdir -p apps/api/src/api/routes apps/api/src/core apps/api/alembic/versions
mkdir -p apps/desktop/src-tauri
mkdir -p ops/docker ops/terraform ops/supabase docs/handover reference/ui
touch .gitignore .env.example turbo.json pnpm-workspace.yaml package.json

# Update Project State (Ensure agent knows tracking is now in .system/)
echo "# Project State\n## Phase: Phase 1 (Scaffolding)\n## Detected Tier: TBD\n## Next Action: Complete Scaffolding" > .system/state/STATE.md
echo "# MEMEX: Chronological Action Log" > .system/state/MEMEX.md
echo "# Error Registry\n" > .system/state/ERROR_REGISTRY.md
echo "{}" > .system/state/manifest.json
```

**Step 3: The Janitor Protocol (Pruning)**
Based on the Tier detected:
*   **If Tier 1:** Run `rm -rf apps/api apps/desktop ops/docker`.
*   **If Tier 2:** Initialize Python env (`cd apps/api && uv init && uv venv`). Run `rm -rf apps/desktop`.
*   **If Tier 3:** Initialize Tauri (`pnpm create tauri-app apps/desktop --ci`). Initialize Python env.

**Step 4: Configure Monorepo Orchestration**
1. Write `pnpm-workspace.yaml` linking `apps/*` and `packages/*`.
2. Write the root `package.json` with `pnpm` workspace definitions.
3. Write `turbo.json` defining strict caching pipelines for `build`, `lint`, `typecheck`, and `dev`.
4. Generate the `.devcontainer/devcontainer.json` mapping to a Node + Python + Rust image.

---

## PHASE 2: INTERROGATION & BLUEPRINTING

**Step 1: Gap Analysis**
Analyze `prompt.md`. Identify missing business logic, edge cases, or ambiguous data models. Output a single, numbered list of **Clarifying Questions** to the user in the chat. Halt and wait for answers.

**Step 2: Prompt Refinement**
Using the user's answers, automatically rewrite and update `.system/prompts/prompt.md` so that it serves as a complete, unambiguous requirements document.

**Step 3: The Master Architecture**
Write `.system/architecture/ARCHITECTURE.md` containing:
1. System Topology Map.
2. Complete Database Schema (with types and relationships).
3. API Interface Contract (Endpoints and payloads).

**Step 4: Model Handoff / Plan Generation Barrier**
Update `.system/state/STATE.md` to Phase 2 complete. Output EXACTLY: `[SYSTEM MESSAGE] Blueprint generated. Please review .system/architecture/ARCHITECTURE.md and .system/prompts/prompt.md. Make manual edits if needed. You may now switch to a heavier reasoning model (e.g., Gemini 3.1 or Claude Opus 4.6). Say 'APPROVED' when ready to generate the granular execution plan.`

---

## PHASE 3: PLANNING & EXECUTION (The Build Loop)

**Step 1: The Tactical Plan Generation**
Once the user says "APPROVED", read the finalized `ARCHITECTURE.md`. Generate a highly granular, step-by-step task checklist and write it to a new file: `.system/state/TASKS.md`. Update `.system/state/STATE.md` to reflect the active execution state.

**Step 2: The Continuous Loop (TDD Enforced)**
For each pending task in `TASKS.md`, adhere to the **Test-Driven 3-Strike Verification Rule**:
1. **Test First:** Write an automated test (`pytest` or `vitest`) for the feature BEFORE implementing the logic. Verify the test fails.
2. **Implement:** Write code adhering strictly to the Pydantic -> Zod type-first rule to make the test pass.
3. **Verify:** Run `pnpm turbo run build`, `pnpm typecheck`, and `pnpm test` via terminal.
4. **Pass:** Tick off the task using `[x]` in `TASKS.md`. Update `.system/state/STATE.md` with the new completion metric. Briefly note the change in `.system/state/MEMEX.md`. **Autonomously proceed to the next task in the loop.**
5. **Fail (Strike 1 & 2):** Read `stderr` or test failures. Log the exact error to `.system/state/ERROR_REGISTRY.md`. Implement a fix and retry.
6. **Fail (Strike 3):** Run `git reset --hard HEAD` and `git clean -fd` to revert to the last green state. Output `CRITICAL FAILURE. HUMAN INTERVENTION REQUIRED.` Halt execution.

---

## PHASE 4: AUDIT & HANDOVER

Once `.system/state/STATE.md` shows all tasks are 100% complete:
1. Execute the **80/20 Security Scan**:
   - Grep for `NEXT_PUBLIC_` to ensure no private keys are exposed.
   - Check Supabase SQL files to ensure `ALTER TABLE x ENABLE ROW LEVEL SECURITY;` is present.
   - Verify `middleware.ts` exists and protects private routes.
2. Generate OpenAPI/Swagger documentation (`apps/api/openapi.json`).
3. Write `docs/handover/ADMIN_MANUAL.md` detailing how to run, deploy, and scale the system.
4. Output: `[SYSTEM MESSAGE] Autonomous Factory Execution Complete. System Ready for Deployment.`

```

---

## File: `.system/workflows/WORKFLOWS.md`

```markdown
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

```

---

## File: `.system/architecture/ARCHITECT_BRIEF.md`

```markdown
**INSTRUCTIONS FOR THE REQUIREMENT ARCHITECT**

You are currently in "Architect Mode" for a professional software agency. Your goal is to interrogate the user and generate a high-precision `prompt.md` that can be executed by an autonomous builder agent.

---

## 1. THE INTERROGATION CHECKLIST

Before outputting the `prompt.md`, you MUST extract:
1.  **Project Tier**: Web MVP, SaaS, or Enterprise/Edge?
2.  **Core Entities**: Key data models?
3.  **Critical Workflows**: The "Happy Path"?
4.  **UI Reference**: Mockups in `reference/`?
5.  **Environment**: Deployment target?

---

## 2. OUTPUT STRUCTURE FOR `prompt.md`

```markdown
# EXECUTIVE BLUEPRINT: [PROJECT_NAME]

## 1. STRATEGIC CONTEXT
- **Tier**: [1, 2, or 3]
...
```
---
**END OF BRIEF**

```

---

## File: `.system/architecture/ARCHITECTURE.md`

```markdown
# ELASTIC POLYGLOT MONOREPO: ARCHITECTURE

## 1. Executive Summary
This document defines the architecture for a resilient, polyglot monorepo template. It prioritizes local-first security, cross-language type safety, and efficient orchestration.

## 2. System Topology

### 2.1 Layer A: The Secure Edge (Frontend)
- **Runtime**: Tauri v2 + React 19 (Desktop) or Next.js 15 (Web).
- **Tooling**: `pnpm`, Vite, Tailwind CSS, Shadcn UI.

### 2.2 Layer B: The Reasoning Engine (Backend)
- **Runtime**: Python 3.12 (Sidecar/API).
- **Tooling**: `uv`, FastAPI, Pydantic.

### 2.3 Layer C: The Shared Contracts
- **Source of Truth**: Pydantic / OpenAPI.
- **Verification**: Zod schemas and TypeScript types generated via build hooks.

## 3. Enforcement Protocols
- **Type-First**: No implementation before schema definition.
- **Idempotency**: All mutations must include an `Idempotency-Key` header.
- **Local-First**: Core logic must function without external API dependencies where possible.

---
**ARCHITECTURE SEALED**

```

---

## File: `.system/state/STATE.md`

```markdown
# PROJECT STATE: Autonomous Software Factory

## 1. STRATEGIC OVERVIEW
- **Tier**: Tier 3 (Enterprise/Edge) - Template Core
- **Target Mode**: Pending Initialization
- **Overall Completion**: 100% (Template Meta-State)

## 2. ACTIVE MISSION
Unified System Command Center (`.system/`) activated. Ready for project instantiation.

## 3. TASK BACKLOG
Tasks are tracked in `.system/state/TASKS.md` for granular breakdown and autonomous verification loops.

```

---

## File: `.system/state/TASKS.md`

```markdown
# TASKS: Granular Execution Backlog

This file tracks the step-by-step technical implementation path generated during Phase 3 of the Build Loop.

## Sprint: Template Perfection
- [x] Consolidate `.agents` and `.tracking` into `.system`.
- [x] Validate directory topology mapping in Core Constitution.
- [x] Configure Husky pre-commit typechecker for anti-hallucination verification.
- [x] Decouple `TASKS.md` from `STATE.md` to conserve token depth.
- [x] Scrub all emojis from system prompts and documentation (Professional standard).

*Next autonomous agent loop will append and check off dynamic tasks here...*

```

---

## File: `.system/state/MEMEX.md`

```markdown
# MEMEX: Template Evolution

## 2026-03-11: Transition to Unified Command Center
- **Action**: Consolidated `.agents/`, `.tracking/`, and root documentation into a single `.system/` folder.
- **Improvement**: Eliminated agent search-cost. Created a "One Source of Truth" for all project metadata.
- **Status**: Unified brain active.

```

---

## File: `.system/state/ERROR_REGISTRY.md`

```markdown

```

---

## File: `.system/prompts/prompt.md`

```markdown

```

---

## File: `package.json`

```json
{
  "name": "autonomous-factory",
  "private": true,
  "version": "1.0.0",
  "description": "Autonomous Software Factory - High-grade professional agency template.",
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "clean": "turbo run clean && rm -rf node_modules",
    "sidecar:dev": "cd apps/api && uv run uvicorn src.api.main:app --host localhost --port 8765 --reload",
    "dev:all": "concurrently --names 'SIDECAR,TAURI' --prefix-colors 'blue,green' \"pnpm sidecar:dev\" \"cd apps/desktop && pnpm tauri:dev\"",
    "test": "turbo run test",
    "prepare": "husky"
  },
  "devDependencies": {
    "concurrently": "^9.2.1",
    "husky": "^9.0.11",
    "turbo": "^2.0.0"
  },
  "packageManager": "pnpm@9.0.0",
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  }
}
```

---

