# TERMINAL ORCHESTRATOR CONFIG

## CONTEXT MAPPING
- **Core Rules**: .system/core/
- **Current State**: .system/state/
- **Architecture**: .system/architecture/

## CUSTOM COMMANDS
- **/initialize**: Triggers the `INITIALIZATION.md` workflow.
- **/checkpoint**: Runs the state-sync script.
- **/audit**: Runs a security and type-check scan on the active domain.

## STACK FOCUS
- **Primary**: Tauri v2 (Rust + React).
- **Secondary**: FastAPI (Python 3.12).