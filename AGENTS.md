# [SUPREME LAW]: AUTONOMOUS FACTORY DIRECTIVE
> **ATTENTION AGENT:** If you are reading this, you are operating in a multi-agent, asynchronous Monorepo Environment.
> You must strictly adhere to this protocol to ensure you do not break the factory or hallucinate instructions.

## 1. THE PRIME DIRECTIVE (ROLE ADOPTION)
You are a blank slate. You are forbidden from modifying code until you adopt a specific Persona.
When initialized by the user, you will be told: *"Read AGENTS.md and your role is [Role Name]"*.
You must immediately read your specific profile in `.system/agents/[role].md` and assume that identity.

## 2. STRICT CONTEXT LOADING PROTOCOL (TOKEN SAVER)
**DO NOT READ THE ENTIRE REPOSITORY.** To save tokens and maintain absolute focus, you must ONLY read the files listed for your role below.

**ALL AGENTS MUST FIRST READ:**
1. `.system/state/STATE.md` (Project macro-status).
2. `.system/state/GLOBAL_TASKS.md` (Find your section only).

**ROLE-SPECIFIC READING PROTOCOLS:**

*   **If you are the Frontend Agent (`02-frontend.md`):**
    *   Read `.system/design/design_rules.md`.
    *   Read `.system/design/app_structure.md`.
    *   View images in `references/` (if any exist).
    *   Read `apps/web-client/.domain/LOCAL_TASKS.md` (and `.domain/LOCAL_ERRORS.md` if fixing bugs).
    *   *DO NOT READ python/backend code.*

*   **If you are the Backend Agent (`03-backend.md`):**
    *   Read `.system/architecture/architecture.md` (Strictly memorize API payloads).
    *   Read `apps/backend-api/.domain/LOCAL_TASKS.md` (and `.domain/LOCAL_ERRORS.md` if fixing bugs).
    *   *DO NOT READ React/Vue frontend code.*

*   **If you are the Database Agent (`04-database.md`):**
    *   Read `.system/architecture/architecture.md` (Strictly memorize the Schema).
    *   Read `packages/database-orm/.domain/LOCAL_TASKS.md`.

*   **If you are the Surgeon/Update Agent (`05-surgeon.md`):**
    *   Ask the user for clarification on the feature.
    *   Read the user prompt and append the new feature to the "Pending Epics" section of `.system/state/GLOBAL_TASKS.md` under the correct agent.
    *   Adopt the necessary Builder persona(s) and follow their specific reading protocols to execute the feature.

*   **If you are the Detective/Debugger (`06-detective.md`):**
    *   Read `.system/state/ERROR_REGISTRY.md`.
    *   Trace the bug strictly to the offending `.domain` and read its `LOCAL_ERRORS.md`.

**STOP READING.** You now have full context. Do not read files outside your assigned domain unless required by an explicit import statement.

## 3. THE ISOLATION MANDATE
You are strictly forbidden from modifying files outside of your assigned domain as defined in your Agent Profile.
*   If you are assigned to `apps/web-client`, do not touch `apps/backend-api`.
*   If you find a bug in another domain, do NOT fix it. Log it in `.system/state/ERROR_REGISTRY.md` for the Debugger Agent.

## 4. THE PULL REQUEST GATE (MANDATORY)
Before you commit and push a Pull Request, you MUST execute the following validation sequence:
1.  **Type Safety:** Run the typechecker for your domain.
2.  **Automated Tests:** Run local tests for your domain (e.g., `turbo run test --filter=<your-app>`).
*If tests fail, fix them locally and log them in your domain's `LOCAL_ERRORS.md`. Do not push broken code.*

## 5. STATE SYNCHRONIZATION
When you finish your assigned task:
1.  Move the epic from "Pending" to "Completed" in your section of `.system/state/GLOBAL_TASKS.md`.
2.  Move the specific sub-tasks from "In-Progress" to "Completed" in your domain's `.domain/LOCAL_TASKS.md`.
3.  Push your branch and submit the Pull Request.
