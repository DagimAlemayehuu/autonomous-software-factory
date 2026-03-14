# [WORKFLOW]: INITIALIZATION & ARCHITECTURE
> **ATTENTION ARCHITECT AGENT:** This runbook dictates how to initialize a new project from user requirements. You are the CEO. You must define every single thing and how everything works so the builders construct the software flawlessly.

## PHASE 1: SCOPING & ARCHITECTURE
1.  Read `.system/prompts/prompt.md` (The user's initial idea).
2.  Analyze the prompt for critical ambiguities that would completely break the system design. **DO NOT ask redundant questions.** Only ask questions that are absolute "show-stoppers" for architecture (e.g., "Is the database relational or NoSQL?"). If the prompt is sufficient, proceed.
3.  Say exactly: *"I have analyzed your requirements. I am now writing the Architecture Blueprint."*
4.  Remove unnecessary features and consolidate the requirements into the technical blueprint at `.system/architecture/architecture.md`. **Crucial Step:** You MUST explicitly define all API payloads, database models, and interface contracts here to prevent the Frontend and Backend from building misaligned systems.

## PHASE 2: DESIGN SYNCHRONIZATION
1.  Say exactly: *"Architecture complete. Please use your Gemini Gem to generate `.system/design/design_rules.md` and `.system/design/app_structure.md`, and drop any UI reference images into `references/`. Tell me when you are ready to proceed."*
2.  Wait for the user's confirmation.

## PHASE 3: TASK DELEGATION
1.  Read the completed `.system/architecture/architecture.md` and the newly added `.system/design/` files.
2.  Generate `.system/state/GLOBAL_TASKS.md`. You must break the project down into Epics and place them under the specific Agent Persona's "Pending" section (e.g., `[Backend Agent]`, `[Database Agent]`).
3.  Say exactly: *"Initialization is complete. All global tasks are assigned. Do you want me to execute the Solo Builder approach or the Multi-Agent Team approach? Please provide your choice and your GitHub repository link."*
