---
description: Next.js 14 App Router 패턴 규칙 — TypeScript/React 파일 편집 시 자동 적용
globs: ["src/**/*.ts", "src/**/*.tsx", "app/**/*.ts", "app/**/*.tsx"]
alwaysApply: false
---
# Next.js 14 App Router 규칙

## 라우팅
- `app/` 디렉토리 기반 파일시스템 라우팅 사용.
- `page.tsx` = 라우트 페이지, `layout.tsx` = 레이아웃, `loading.tsx` = 로딩 UI.
- API 엔드포인트는 `app/api/` 하위에 `route.ts`로 정의.

## 컴포넌트
- **Server Components 우선:** 데이터 fetching과 렌더링은 Server Component에서 처리.
- **Client Components:** `'use client'` 디렉티브는 인터랙티브 요소에만 사용.
- 컴포넌트 파일명은 kebab-case (`verification-status-card.tsx`).

## 데이터 페칭
- Server Actions을 사용하여 form mutation 처리.
- `revalidatePath()` / `revalidateTag()`로 캐시 무효화.
- 서버 사이드 데이터는 async Server Component에서 직접 호출.

## 에러 처리
- `error.tsx` 바운더리로 라우트별 에러 처리.
- `not-found.tsx`로 404 처리.
- 전역 에러는 `global-error.tsx` 사용.

## 스타일링
- Tailwind CSS 유틸리티 클래스 사용.
- shadcn/ui 컴포넌트 적극 활용.
- 커스텀 스타일은 CSS Modules 또는 `globals.css`에 정의.
