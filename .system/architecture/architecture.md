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

## 2. Database Schema (The Source of Truth)
> Define every single table, column, and relationship. Use Prisma or SQLAlchemy schema notation. This is the absolute law for the Database Builder.

```schema
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}
```

## 3. API Contracts (The Interface Law)
> Define the exact JSON payloads for every endpoint. The Frontend and Backend builders will strictly adhere to these shapes. DO NOT omit this section.

### Endpoint: `POST /api/users`
**Request Payload:**
```json
{
  "email": "user@example.com",
  "name": "John Doe"
}
```
**Response Payload (201 Created):**
```json
{
  "id": "uuid-1234",
  "email": "user@example.com",
  "createdAt": "2024-05-15T12:00:00Z"
}
```

## 4. Key Decisions & Trade-offs
> Document any architectural compromises (e.g., "Choosing NoSQL for speed over relational integrity").

1.  **Decision 1:** ...
2.  **Decision 2:** ...
