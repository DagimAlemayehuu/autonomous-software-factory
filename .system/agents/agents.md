# AGENT SOP (CLOUD VM / JULES)

## 1. INITIALIZATION SEQUENCE
Every session must begin with:
1. `uv sync` (Python Backend)
2. `pnpm install` (Frontend/Monorepo)
3. `pnpm turbo run build` (Verification)

## 2. PR GATEKEEPING
- No Pull Request or Branch Merge is permitted without a successful `pnpm turbo run test` execution.
- Security scans must be run on all new dependencies.

## 3. CONTEXT MANAGEMENT
- Use `Single-Domain Focus`: Only load context relevant to the active task in `TASKS.md`.
- Archive completed tasks to `TASKS_ARCHIVED.md` immediately.
