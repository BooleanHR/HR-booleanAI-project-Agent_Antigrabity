---
name: 301-prisma-sqlite-patterns
description: Prisma + SQLite 스키마/쿼리 패턴 레퍼런스
---
# Prisma + SQLite 패턴

## 스키마 설계
```prisma
// prisma/schema.prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model Verification {
  id              String   @id @default(cuid())
  applicantName   String
  docCategory     String   // 졸업증명서, 자격증, 경력사항, 어학
  docSource       String?  // webminwon, certpia, gov24, icerts
  status          String   @default("PENDING") // PENDING, PROCESSING, PASS, FAIL, MANUAL_REVIEW
  aiDecision      String?  // APPROVE, REJECT, ESCALATE
  confidenceScore Float?
  mockUsed        Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

## 쿼리 패턴
```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client'
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## 주의사항
- SQLite는 로컬 전용. 프로덕션 서버 DB로 사용하지 않음.
- JSON 컬럼은 SQLite에서 String으로 저장, 코드에서 파싱.
- 마이그레이션: `npx prisma migrate dev --name <name>`.
