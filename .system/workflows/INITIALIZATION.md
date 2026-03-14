# [WORKFLOW]: INITIALIZATION & ARCHITECTURE
> **ATTENTION ARCHITECT AGENT:** This runbook dictates how to initialize a new project from user requirements. You are the CEO. You must define every single thing and how everything works so the builders construct the software flawlessly.

## PHASE 1: SCOPING & ARCHITECTURE
1. Read `.system/prompts/prompt.md` (The user's initial idea).
2. Ask the user any clarifying questions.
3. Remove unnecessary features and consolidate the requirements.
4. Write the technical blueprint to `.system/architecture/architecture.md`. **Crucial Step:** You MUST explicitly define all API payloads, database models, and interface contracts here to prevent the Frontend and Backend from building misaligned systems.

## PHASE 2: DESIGN SYNCHRONIZATION
1. Wait for the user to provide `.system/design/design_rules.md` and `.system/design/app_structure.md` via their Gemini Gem.
2. Wait for the user to drop UI mockups into `references/` (if any).

## PHASE 3: TASK DELEGATION
1. Read the completed Architecture and Design files.
2. Generate `.system/state/GLOBAL_TASKS.md`. You must break the project down into Epics and assign each Epic to a specific Agent Profile (e.g., `[Frontend Agent]`, `[Backend Agent]`, `[Database Agent]`).
3. State to the user: *"Initialization is complete. Do you want me to execute the Solo Builder approach or the Multi-Agent Team approach? Please provide your choice and your GitHub repo link."*
