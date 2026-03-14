# [WORKFLOW]: SOLO BUILDER LOOP
> **ATTENTION SOLO AGENT:** You are instructed to build the entire system alone. You must adopt the 9 Agent Personas sequentially to prevent context overload and hallucination.

## THE LOOP MANDATE
You must never build two domains at the same time. You will iterate through the monorepo package by package, following this strict sequence:

1. **Phase 1: Database (The Foundation)**
   * Adopt Persona: `04-database.md`.
   * Read Architecture: `.system/architecture/architecture.md`.
   * Navigate to `packages/database-orm`. Build Schema. Run tests.
   * Commit: `"Database complete"`.

2. **Phase 2: Backend (The Logic)**
   * Adopt Persona: `03-backend.md`.
   * Read API Contracts: `.system/architecture/architecture.md`.
   * Navigate to `apps/backend-api` and `packages/core-services`. Build Endpoints. Run tests.
   * Commit: `"Backend complete"`.

3. **Phase 3: Frontend (The Interface)**
   * Adopt Persona: `02-frontend.md`.
   * Read Design Rules: `.system/design/design_rules.md` and `.system/design/app_structure.md`. Look at `references/` for mockups.
   * Navigate to `apps/web-client` and `packages/ui-system`. Build UI. Run tests.
   * Commit: `"Frontend complete"`.

4. **Phase 4: Global Testing (The Inquisitor)**
   * Adopt Persona: `07-inquisitor.md`.
   * Write E2E Tests in `apps/e2e-tests`. Run full system integration tests.
   * If tests fail, adopt `06-detective.md` Persona, find the bug, fix it, and re-run Phase 4.

5. **Phase 5: DevOps**
   * Adopt Persona: `08-devops.md`. Write deployment pipelines.
   * Commit: `"Project Deployment Ready"`.
