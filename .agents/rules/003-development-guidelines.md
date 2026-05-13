---
description: 개발 가이드라인 — 보안 원칙, 코드 스타일, 성능 표준
globs: ["**/*"]
alwaysApply: true
---
# 개발 가이드라인

## 아키텍처 원칙
- **로컬 퍼스트:** 모든 데이터(서류 이미지, 검증 결과, DB)는 로컬에만 저장. 클라우드 전송 금지.
- **파이프라인 기반:** 검증 작업은 Seq-01 파이프라인을 따름.
- **폴백 설계:** 모든 외부 연동(RPA, OCR)은 실패를 가정하고 폴백 전략 필수.
- **Hot-reload:** 기관 설정(agency_config.json) 변경 시 앱 재시작 불필요.

## 보안 원칙
- 기관 로그인 계정은 AES-256-GCM 암호화 후 SQLite 저장.
- 복호화는 메모리에서만 수행. 로그에 평문 절대 기록 금지.
- 주민등록번호는 OCR 추출 시 자동 마스킹 처리 (`980104-1******`).

## 코드 스타일
- **TypeScript strict mode** 필수.
- React 함수형 컴포넌트 + Server Components 우선.
- 네이밍: camelCase(변수/함수), PascalCase(컴포넌트/타입), kebab-case(파일명).
- import 절대 경로 사용 (`@/lib/...`, `@/components/...`).
- WHY 중심 주석, 불필요한 주석 즉시 제거.

## 성능 표준
- 대시보드 페이지 전환: < 500ms
- OCR 단일 서류 처리: < 5초 (p95)
- RPA 캡처 단일 기관: < 15초 (타임아웃 30초)
- 전체 파이프라인 1인 분량: < 60초

## 버전 관리
- Git + Feature Branch Workflow
- Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`)

## 참조
- [001-project-overview.md](001-project-overview.md)
- [002-tech-stack.md](002-tech-stack.md)
