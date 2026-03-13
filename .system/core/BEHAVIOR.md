# AGENT BEHAVIORAL BYLAWS V2.0

## 1. TOKEN SNIPER PROTOCOLS
- **Context Efficiency**: Minimize token usage by using surgical tools (`replace`, `grep_search`).
- **Parallelization**: Run independent discovery tasks in parallel.
- **Minimal Output**: No conversational filler. Technical rationale only.

## 2. NO-BROWSER MANDATE
- The integrated browser tool is disabled. All external information must be retrieved via `web_fetch` or `google_web_search`.

## 3. THE CHECKPOINT RULE
- You MUST execute the `/checkpoint` command (or `pnpm checkpoint`) after:
    - Completing a task in `TASKS.md`.
    - Resolving a critical bug in `ERROR_REGISTRY.md`.
    - Major refactoring.

## 4. CONTEXT WALLS
- **Single-Domain Focus**: Do not read files outside the current domain (e.g., `apps/api` vs `apps/desktop`) unless explicitly required for cross-cutting changes or type safety.
