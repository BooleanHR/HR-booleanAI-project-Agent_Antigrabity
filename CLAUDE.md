# Project

이 문서는 Claude Code가 작업 시작 시 자동으로 로드하는 프로젝트 컨텍스트입니다.

---

## 1. 프로젝트 개요

### 비전
HR AI 서류 진위확인 솔루션 — 채용 서류(졸업증명서, 자격증, 경력증명서, 어학성적)의 진위를 AI + RPA 기반으로 자동 확인하여 HR 담당자의 수동 검토 시간을 건당 12분 → 30초 이하로 단축.

### 핵심 기능
- Triple Check Pipeline (입사지원서 × OCR × 기관DB 3중 교차 검증)
- Puppeteer RPA 엔진 (정부24, Q-Net, YBM, OPIc 등 자동 조회 + 4단계 폴백)
- Gemini Vision OCR (25개 서류 유형별 전용 프롬프트)
- AI Reviewer Agent (APPROVE / REJECT / ESCALATE 판정)
- 대시보드 (검증 현황, AI 검토 결과, 최종 승인/반려)
- 기관 URL 커스텀 설정 (PM 셀프서비스, hot-load)

### 아키텍처 원칙
- **로컬 퍼스트:** 모든 데이터 로컬 저장. 클라우드 전송 원천 차단.
- **폴백 설계:** 모든 외부 연동은 실패를 가정하고 폴백 전략 구현.
- **보안:** 기관 계정 AES-256-GCM 암호화, 주민번호 자동 마스킹.

---

## 2. 기술 스택

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** SQLite (Prisma ORM)
- **AI/OCR:** Google Gemini 1.5 Pro Vision (Vercel AI SDK)
- **RPA:** Puppeteer + puppeteer-extra-plugin-stealth
- **문서:** sharp, pdf-lib, exceljs
- **보안:** AES-256-GCM (Node.js crypto), SHA-256

---

## 3. 개발 가이드라인

### 코드 스타일
- TypeScript strict mode 필수.
- React 함수형 + Server Components 우선.
- import 절대 경로 (`@/lib/...`, `@/components/...`).
- WHY 중심 주석. 불필요한 주석 즉시 제거.

### 코드 코멘트
- 의미 있는 주석만 작성 (WHY 중심, WHAT는 코드로 표현).
- 사용되지 않거나 쓸모없어진 주석은 즉시 제거.

### 문제 해결
- 에러/예외 처리가 필요하면 에러 진단 7단계 프로세스를 따름.

---

## 4. 서브에이전트 & 스킬 라우팅

작업 성격에 따라 적합한 서브에이전트를 활용합니다.

### 서브에이전트 (`.claude/agents/`)
| 에이전트 | 사용 시점 |
|---|---|
| `rpa-engine` | Puppeteer RPA 캡처 엔진, 4단계 폴백, 셀렉터 관리, 헬스체크 |
| `ocr-ai-pipeline` | Gemini Vision OCR, AI Reviewer Agent, 프롬프트 작성 |
| `nextjs-dashboard` | Next.js 14 대시보드 UI, 기관 설정 폼, 검증 결과 패널 |
| `document-updater` | PRD/SRS/Harness 문서 업데이트, 커밋 전 문서 동기화 |

---

## 5. 참고
- 전체 프로젝트 규칙은 `AGENTS.md` 참조 (Cross-Tool 공통).
- 도메인 용어 사전은 `AGENTS.md` §005 참조.
- 상세 기술 명세는 `docs/PRD-HR-AI-Verification-v1_2.md`, `docs/SRS-HR-AI-Verification-v1_3.md` 참조.
