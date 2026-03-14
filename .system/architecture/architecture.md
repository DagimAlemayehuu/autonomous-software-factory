<!--
[TEMPLATE: ARCHITECTURE BLUEPRINT]
Instructions for the Architect Agent (Delete this block before use):
You MUST fill out this file based on the user's `prompt.md`.
This file defines the absolute law for the Database and Backend Builders.
You must meticulously define the Schema, API Contracts, and System Map.
-->

# System Architecture
## 1. System Map & Technologies
> Define the physical packages and apps used to satisfy the `prompt.md`. List languages and frameworks (e.g., `apps/web-client` uses Next.js 14, `apps/backend-api` uses Node/Express).

*   `apps/web-client`: [Framework/Tech]
*   `apps/backend-api`: [Framework/Tech]
*   `packages/database-orm`: [ORM/Tech]
*   `packages/schemas`: [Shared Types/Zod/OpenAPI specs]

## 2. API-First Contracts (The Shared Types)
> List the exact interfaces and payloads that will be generated inside `packages/schemas`. Do not leave ambiguity. The Frontend and Backend builders MUST strictly adhere to these shapes, or the Husky pre-commit hooks will block their PRs.

### Example Contract: `packages/schemas/src/user.ts`
```typescript
import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  role: z.enum(["admin", "user"]).default("user")
});

export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
```
*   *(Architect: Generate every single endpoint payload request/response shape here or directly in the `packages/schemas` folder before moving on to Phase 3).*

## 3. Database Schema Blueprint
> Define every single table, column, and relationship. This must match the payloads defined above. Use Prisma or SQLAlchemy schema notation. This is the absolute law for the Database Builder.

```schema
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  firstName String
  role      String   @default("user")
  createdAt DateTime @default(now())
}
```

## 4. Key Decisions & Trade-offs
> Document any architectural compromises (e.g., "Choosing NoSQL for speed over relational integrity").

1.  **Decision 1:** ...
2.  **Decision 2:** ...
