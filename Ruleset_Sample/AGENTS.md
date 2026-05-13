# Project Instructions

이 문서는 Google Antigravity, Cursor, Claude Code 등 AI 코딩 어시스턴트가 공통으로 읽어들이는 **프로젝트 글로벌 규칙(Global Rules)** 파일입니다.

---

## 001. 프로젝트 개요 (Project Overview)

**프로젝트명:** HR AI 서류 진위확인 솔루션  
**버전:** PRD v1.2 + SRS v1.3 기준  
**아키텍처:** 로컬 퍼스트 (Local-First) — 개인정보 클라우드 전송 원천 차단

### 비전

기업 채용 과정에서 지원자가 제출한 서류(졸업증명서, 자격증, 경력증명서, 어학성적 등)의 **진위를 AI + RPA 기반으로 자동 확인**하여, HR 담당자의 수동 검토 시간을 건당 12분에서 30초 이하로 단축하는 솔루션.

### 핵심 기능

1. **Triple Check Pipeline** — 3중 교차 검증
   - Layer 1: 입사지원서 기재값 vs Gemini OCR 추출값 비교
   - Layer 2: OCR 추출값 vs 기관 사이트 RPA 캡처 결과 비교
   - AI Reviewer: 전체 데이터 종합 분석 → APPROVE / REJECT / ESCALATE 판정
2. **Puppeteer RPA 엔진** — 정부24, Q-Net, YBM, OPIc 등 기관 사이트 자동 조회
3. **Gemini Vision OCR** — 25개 서류 유형별 전용 프롬프트로 구조화 데이터 추출
4. **대시보드** — 검증 진행 현황, AI 검토 결과, 담당자 최종 승인/반려 UI
5. **기관 URL 커스텀 설정** — PM이 코딩 없이 30초 내 신규 기관 추가 (agency_config.json hot-load)
6. **감사 증적 (Audit Trail)** — SHA-256 해시 + 타임스탬프 + RPA 캡처 기반 법적 증거

### 대상 사용자

- **Primary:** HR 채용 담당자 (서류 진위확인 업무 수행자)
- **Secondary:** HR 관리자/PM (기관 설정, 대시보드 모니터링)

### 성공 지표 (KPI)

- RPA 캡처 성공률 ≥ 95% (폴백 포함)
- AI Reviewer 정확도 ≥ 95% (Precision)
- 담당자 검토 시간 ≤ 30초/건
- 수동 에스컬레이션 비율 ≤ 5%
- 서류 유형 OCR 정확도 ≥ 90%

---

## 002. 기술 스택 (Technical Stack)

### Frontend + Backend (Unified)

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Server Logic:** Next.js Server Actions + Route Handlers

### Database

- **ORM:** Prisma
- **DB:** SQLite (로컬 전용 — 개인정보 보호)

### AI / OCR

- **LLM Provider:** Google Gemini 1.5 Pro Vision
- **SDK:** Vercel AI SDK (`ai` 패키지)
- **용도:** OCR 추출 (구조화 JSON), AI Reviewer Agent, DOM 셀렉터 자동 분석

### RPA (서류 진위확인 자동화)

- **Core:** Puppeteer
- **Anti-detection:** puppeteer-extra + puppeteer-extra-plugin-stealth
- **CAPTCHA:** puppeteer-extra-plugin-recaptcha
- **스케줄러:** node-cron (사이트 헬스체크)

### 문서 / 이미지 / 엑셀

- **이미지 처리:** sharp (HEIC→JPG 변환, EXIF 회전 보정)
- **PDF 생성:** pdf-lib (감사 리포트)
- **엑셀:** exceljs (결과 파일, 에듀퓨어/윈스팩 양식 생성)
- **이메일:** Resend API

### 보안

- **암호화:** Node.js crypto (AES-256-GCM) — 기관 계정 암호화 저장
- **해싱:** SHA-256 — 캡처 이미지 무결성 증명

### 설정

- **기관 설정:** `config/agency_config.json` (hot-load, 재시작 불필요)
- **환경변수:** `.env.local`

---

## 003. 개발 가이드라인 (Development Guidelines)

### 아키텍처 원칙

- **로컬 퍼스트:** 모든 데이터(서류 이미지, 검증 결과, DB)는 로컬에만 저장. 클라우드 전송 원천 차단.
- **파이프라인 기반:** 검증 작업은 Seq-01 파이프라인(폴더 스캔 → 변환 → OCR → Layer1 → RPA → Layer2 → AI Review → 결과)을 따름.
- **폴백 설계:** 모든 외부 연동(RPA, OCR)은 실패를 가정하고 폴백 전략 구현 필수.
- **Hot-reload:** 기관 설정 변경 시 앱 재시작 없이 즉시 반영.

### 보안 원칙

- 기관 로그인 계정은 AES-256-GCM으로 암호화하여 SQLite에 저장.
- 복호화는 메모리에서만 수행, 로그에 평문 기록 절대 금지.
- 주민등록번호는 OCR 추출 시 자동 마스킹 처리 (`980104-1******`).

### 코드 스타일

- **언어:** TypeScript strict mode
- **컴포넌트:** React 함수형 컴포넌트 + Server Components 우선
- **네이밍:** camelCase (변수/함수), PascalCase (컴포넌트/타입), kebab-case (파일명)
- **코멘트:** WHY 중심, WHAT는 코드로 표현. 불필요한 주석 즉시 제거.
- **import:** 절대 경로 (`@/lib/...`, `@/components/...`)

### 성능 표준

- 대시보드 페이지 전환: < 500ms
- OCR 단일 서류 처리: < 5초 (p95)
- RPA 캡처 단일 기관: < 15초 (타임아웃 30초)
- 전체 파이프라인 (1인 분량): < 60초

### 버전 관리

- **VCS:** Git
- **Branching:** Feature Branch Workflow
- **Commit:** Conventional Commits 형식 (`feat:`, `fix:`, `docs:`, `refactor:`)

---

## 004. 데이터 파이프라인 흐름 (Pipeline Flow)

```
[Seq-01 v1.2 — 완전 자동화 파이프라인]

로컬 폴더 스캔 (fs.readdirSync)
    ↓
파일 형식 변환 (sharp: HEIC→JPG, DOCX→PDF)
    ↓
이미지 회전 보정 (sharp: EXIF 기반 auto-orient)
    ↓
파일 자동 명명 ({수험번호}_{서류종류}.ext)
    ↓
Gemini Vision OCR (generateObject → 구조화 JSON)
    ↓ [신뢰도 < 70% → MANUAL_REVIEW 분기]
Triple Check Layer 1 (입사지원서 vs OCR 값)
    ↓
로컬 RPA 병렬 캡처 (Puppeteer × N개 사이트)
    ↓ [캡처 실패 → 4단계 폴백]
Triple Check Layer 2 (OCR vs RPA 기관 DB)
    ↓
AI Reviewer Agent (Gemini Vision LLM)
    ↓
APPROVE / REJECT / ESCALATE → 대시보드 표시
    ↓
담당자 최종 승인/반려
    ↓
Audit Trail + PDF 감사 리포트 + Excel 결과
```

---

## 005. 도메인 용어 사전 (Domain Glossary)

| 용어 | 정의 |
|---|---|
| **Triple Check** | 3중 교차 검증 — 입사지원서 기재값, OCR 추출값, 기관 DB 조회 결과를 삼각 대조 |
| **Layer 1** | 입사지원서 기재값 vs OCR 추출값 비교 단계 |
| **Layer 2** | OCR 추출값 vs RPA 기관 사이트 조회 결과 비교 단계 |
| **AI Reviewer** | Gemini Vision LLM이 전체 데이터를 종합 분석하여 판정하는 에이전트 |
| **APPROVE** | 모든 핵심 항목 일치 + 이미지 정상 + 신뢰도 ≥ 90% |
| **REJECT** | 핵심 항목 불일치 1건 이상 + 위조 징후 발견 |
| **ESCALATE** | OCR 신뢰도 부족 / 이미지 판독 불가 / RPA 캡처 실패 → 담당자 직접 검토 필요 |
| **mock_used** | RPA 4단계 폴백 모두 실패 시 설정되는 플래그. 수동 확인 큐로 전환 |
| **agency_config.json** | 기관별 URL, 입력 필드, RPA 셀렉터, 유효기간을 정의하는 설정 파일 |
| **doc_source** | 졸업증명서 발급처 유형 (webminwon / certpia / gov24 / icerts) |
| **doc_category** | 서류 대분류 (졸업증명서 / 자격증 / 경력사항 / 가점사항 / 교육사항 / 어학사항) |
| **career_records** | 4대보험 경력 서류에서 추출한 직장 이력 배열 |
| **Stealth Plugin** | puppeteer-extra-plugin-stealth — navigator.webdriver 감지 회피 |
| **Audit Trail** | SHA-256 해시 + 타임스탬프 + 캡처 이미지를 묶은 감사 증적 |
