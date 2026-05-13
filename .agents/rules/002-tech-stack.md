---
description: HR AI 서류 진위확인 솔루션 기술 스택 정의
alwaysApply: true
---
# 기술 스택

## Frontend + Backend (Unified)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + shadcn/ui
- **Server Logic:** Next.js Server Actions + Route Handlers

## Database
- **ORM:** Prisma
- **DB:** SQLite (로컬 전용)

## AI / OCR
- **LLM:** Google Gemini 1.5 Pro Vision
- **SDK:** Vercel AI SDK (`ai` 패키지, `generateObject` 함수)

## RPA
- **Core:** Puppeteer + puppeteer-extra + puppeteer-extra-plugin-stealth
- **스케줄러:** node-cron

## 문서 / 이미지 / 엑셀
- **이미지:** sharp (HEIC→JPG, EXIF 회전 보정)
- **PDF:** pdf-lib (감사 리포트)
- **엑셀:** exceljs
- **이메일:** Resend API

## 보안
- **암호화:** Node.js crypto (AES-256-GCM)
- **해싱:** SHA-256

## 참조
- [003-development-guidelines.md](003-development-guidelines.md) — 개발 가이드라인
