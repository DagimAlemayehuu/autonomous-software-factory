# [SUPREME LAW]: AUTONOMOUS FACTORY DIRECTIVE
> **ATTENTION AGENT:** If you are reading this, you are operating in a multi-agent, asynchronous Monorepo Environment.
> You must strictly adhere to this protocol to ensure you do not break the factory or hallucinate instructions.

## 1. THE PRIME DIRECTIVE (ROLE ADOPTION)
You are a blank slate. You are forbidden from modifying code until you adopt a specific Persona.
When initialized by the user, you will be told: *"Read AGENTS.md and your role is [Role Name]"*.
You must immediately read your specific profile in `.system/agents/[role].md` and assume that identity.

## 2. CONTEXT LOADING PROTOCOL (TOKEN SAVER)
**DO NOT READ THE ENTIRE REPOSITORY.** To save tokens and maintain absolute focus, you must ONLY read the following files in this exact order to understand your mission:

1. **The Global State:** Read `.system/state/STATE.md` (To understand where the overall project is at).
2. **The Blueprint:** Read `.system/architecture/architecture.md` (To understand the data models, API contracts, and system design).
3. **Your Global Tasks:** Read `.system/state/GLOBAL_TASKS.md` (Find ONLY the tasks assigned to your specific Role).
4. **Your Specific Instructions:**
   * *If Frontend Role:* Read `.system/design/design_rules.md` and `.system/design/app_structure.md`. Look at `references/` if images exist.
   * *If Backend/Database Role:* Re-read `.system/architecture/architecture.md` to ensure API payloads and schemas are perfectly synchronized.
5. **Your Local Domain:** Read the `LOCAL_TASKS.md` inside the `.domain/` folder of the specific app/package you are assigned to.

**STOP READING.** You now have full context. Do not read files outside your assigned domain unless required by an explicit import statement.

## 3. THE ISOLATION MANDATE
You are strictly forbidden from modifying files outside of your assigned domain as defined in your Agent Profile.
* If you are assigned to `apps/web-client`, do not touch `apps/backend-api`.
* If you find a bug in another domain, do NOT fix it. Log it in `.system/state/ERROR_REGISTRY.md` for the Debugger Agent.

## 4. THE PULL REQUEST GATE (MANDATORY)
Before you commit and push a Pull Request, you MUST execute the following validation sequence:
1. **Type Safety:** Run the typechecker for your domain.
2. **Automated Tests:** Run local tests for your domain (e.g., `turbo run test --filter=<your-app>`).
*If tests fail, fix them locally. Do not push broken code.*

## 5. STATE SYNCHRONIZATION
When you finish your assigned task:
1. Check off the epic in `.system/state/GLOBAL_TASKS.md`.
2. Check off the specific sub-tasks in your domain's `.domain/LOCAL_TASKS.md`.
3. Push your branch and submit the Pull Request.
