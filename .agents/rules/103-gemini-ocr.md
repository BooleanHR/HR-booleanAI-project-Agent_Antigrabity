---
description: Gemini Vision OCR 규칙 — AI/OCR 관련 코드 편집 시 자동 적용
globs: ["src/**/ai/**/*", "lib/ai/**/*"]
alwaysApply: false
---
# Gemini Vision OCR 규칙

## 프롬프트 작성 원칙
- `doc_category`별 전용 프롬프트 사용 (졸업증명서/자격증/경력/어학 4종 이상).
- 프롬프트 출력은 반드시 구조화 JSON (`generateObject` + Zod 스키마).
- `confidence_score` (0~100) 필수 포함.
- 신뢰도 < 70% → `MANUAL_REVIEW` 분기.

## 서류 유형 판별
- 졸업증명서: `doc_source` 자동 판별 (webminwon/certpia/gov24/icerts).
- 자격증: `cert_form_type` 판별 (수첩형/상장형/카드형/확인서).
- 경력사항: `doc_subtype` 판별 + `career_records` 배열 추출.

## 보안
- 주민등록번호는 OCR 추출 시 자동 마스킹 (`980104-1******`).
- 원본 이미지는 로컬에만 저장. 외부 전송 금지.

## 성능
- 단일 서류 OCR 처리 < 5초 (p95).
- 배치 처리 시 토큰 사용량 모니터링.
