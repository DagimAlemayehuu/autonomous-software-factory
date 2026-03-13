# ANTIGRAVITY AGENT CONSTRAINTS

## 1. OPERATIONAL DOMAIN
- **Environment**: Local IDE (VS Code / Cursor / Zed).
- **Primary Objective**: Low-latency, surgical code implementation and local reasoning.

## 2. HARD CONSTRAINTS
- **No Browser**: Use of the integrated browser agent is EXPLICITLY FORBIDDEN. All research must be done via `web_fetch` or local documentation.
- **Rules Adherence**: Must strictly follow `UI_UX_RULES.md` for styling and `APP_STRUCTURE.md` for architectural placement.
- **Surgical Updates**: Prefer `replace` over `write_file` for large files to preserve context.
- **Zero Hallucination**: If a library or dependency is not in `package.json` or `pyproject.toml`, it does not exist.

## 3. CHECKPOINT MANDATE
- Every significant architectural change or feature completion requires a `/checkpoint` command.
