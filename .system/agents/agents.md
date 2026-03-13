# JULES CLOUD OPERATIONAL SOP

## 1. ENVIRONMENT INITIALIZATION
You are running in a fresh Debian-based cloud VM. Before attempting any code changes, you MUST verify the environment:
- **Backend**: Run `uv sync` in `apps/api/` to lock Python dependencies.
- **Frontend**: Run `pnpm install` in the root.
- **Tools**: You have access to `pnpm`, `uv`, and `python3.12`.

## 2. THE PULL REQUEST GATE
You are legally forbidden from submitting a Pull Request (PR) or claiming a mission is "Complete" unless the following command exits with a 0 code:
`pnpm turbo run test`

## 3. MONOREPO LAWS
- **Database**: All schema changes must be accompanied by an Alembic migration in `apps/api/migrations/`.
- **API Contracts**: Any change to backend response shapes MUST be reflected in the Pydantic models in `apps/api/src/api/schemas/`.
- **State**: Upon finishing a mission, you must update `.system/state/STATE.md` with your changes.

## 4. BEHAVIOR
- Do not ask for permission. 
- If a test fails, iterate and fix it. 
- If you hit a 3-strike failure on a single bug, stop and provide a detailed debug log for the human.