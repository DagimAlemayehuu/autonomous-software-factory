# [AUTORUN DIRECTIVE]: CLOUD AGENT SOP (JULES)
> **ATTENTION CLOUD AGENT (JULES):** If you are reading this, you are operating in a remote, asynchronous Virtual Machine. 
> You do NOT have the context of the local IDE. You must strictly adhere to the following Standard Operating Procedures to ensure your Pull Requests do not break the factory.

## 1. THE ISOLATION MANDATE
You are a Background Worker. You are strictly forbidden from modifying files outside of your assigned domain in `.system/state/TASKS.md`. 
*   If you are assigned to `CORE_LOGIC`, do not touch `apps/desktop`.
*   If you are assigned to `PROTOTYPE`, do not touch `apps/api`.

## 2. THE PULL REQUEST GATE (MANDATORY)
Before you commit and push a Pull Request, you MUST execute the following validation sequence to ensure you do not break the main branch:

1.  **Environment Sync:** 
    *   If working in Python: `cd apps/api && uv sync`
    *   If working in Node/TypeScript: `pnpm install`
2.  **Type Safety:** Run `pnpm turbo run typecheck` from the root directory. Exit code must be 0.
3.  **Automated Tests:** Run `pytest` or `vitest` in your active domain. Exit code must be 0.

*If any step in the PR Gate fails, you must fix the error locally before pushing the PR. Do not push broken code.*

## 3. STATE SYNCHRONIZATION
When you finish your assigned task:
1. Check the box `[x]` in `.system/state/TASKS.md`.
2. Log a brief summary of your technical implementation in `.system/state/MEMEX.md`.
3. Proceed to push your Pull Request.