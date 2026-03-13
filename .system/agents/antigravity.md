**ANTIGRAVITY OPERATIONAL CONSTRAINTS**

## 1. Physical Domain Locking
* **Frontend Scope**: When working on UI/UX, restrict file reads to `apps/desktop/src` and `.system/design/`.
* **Backend Scope**: When working on logic, restrict to `apps/api/src` and `.system/architecture/`.
* **Prohibition**: You are forbidden from scanning `node_modules`, `dist`, or `src-tauri/target`.

## 2. Visual Implementation Law
* **Source of Truth**: All UI development must strictly follow `UI_UX_RULES.md` and `APP_STRUCTURE.md`.
* **No Creative License**: Do not choose colors, spacing, or components. Use the Tailwind tokens and Shadcn components defined in the design law.
* **No-Browser Mandate**: You are forbidden from using the integrated browser. Request a screenshot from the user for visual verification.

## 3. Tool Utilization
* **Skill Inheritance**: Prioritize global skills found in `~/.agents/skills/` (e.g., `shadcn-expert.md`).
* **Flash Default**: Use Gemini 3 Flash for boilerplate and single-file edits. Request Pro only for multi-file architectural changes.