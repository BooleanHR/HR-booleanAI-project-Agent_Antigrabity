---
name: 300-nextjs-app-router-patterns
description: Next.js 14 App Router 패턴 레퍼런스 — 라우팅, Server Components, Server Actions
---
# Next.js 14 App Router 패턴

## 디렉토리 구조
```
app/
├── (dashboard)/         # 대시보드 라우트 그룹
│   ├── layout.tsx       # 대시보드 공통 레이아웃 (사이드바)
│   ├── page.tsx         # 메인 대시보드 (검증 현황)
│   ├── verification/    # 검증 상세
│   └── settings/        # 기관 설정, 계정 설정
├── api/
│   ├── rpa/route.ts     # RPA 실행 API
│   ├── ocr/route.ts     # OCR 실행 API
│   └── config/route.ts  # agency_config CRUD
├── layout.tsx           # 루트 레이아웃
└── page.tsx             # 랜딩 페이지
```

## Server Actions 패턴
```typescript
// app/actions/verification.ts
'use server'
import { revalidatePath } from 'next/cache'

export async function approveVerification(id: string) {
  await db.verification.update({
    where: { id },
    data: { status: 'APPROVED', approvedAt: new Date() }
  })
  revalidatePath('/dashboard')
}
```

## Route Handler 패턴
```typescript
// app/api/rpa/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  // RPA 실행 로직
  return NextResponse.json({ success: true })
}
```
