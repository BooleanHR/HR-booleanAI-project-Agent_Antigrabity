---
name: 201-ocr-prompt-engineering
description: Gemini Vision OCR 프롬프트 작성 가이드 — 서류 유형별 스키마 참조
---
# OCR 프롬프트 엔지니어링 가이드

## 프롬프트 작성 원칙
1. 서류 유형(`doc_category`)에 맞는 전용 프롬프트 사용.
2. 추출할 필드를 명확히 나열 (Key, 설명, 예시값).
3. 출력 형식은 반드시 JSON. `generateObject` + Zod 스키마 사용.
4. `confidence_score` (0~100) 필수 포함.
5. 민감 정보(주민번호) 마스킹 지시 포함.

## 서류 유형별 핵심 추출 필드

### 졸업증명서
- `doc_source` (webminwon/certpia/gov24/icerts) 자동 판별
- `doc_confirm_number`, `name`, `birth_date`, `school_name`, `major`, `graduation_date`, `issue_date`

### 자격증
- `cert_form_type` (수첩형/상장형/카드형/확인서) 판별
- `cert_number`, `cert_name`, `name`, `birth_date`, `pass_date`, `issue_date`

### 경력사항 (4대보험)
- `doc_subtype` (health_insurance/national_pension/employment_insurance/four_insurance_gov24) 판별
- `career_records` 배열: `company_name`, `start_date`, `end_date`

### 어학 (TOEIC/OPIc)
- `total_score` / `grade`, `test_date`, `expire_date`(OPIc), `issue_number`

## 프롬프트 템플릿 구조
```
당신은 한국 [서류 유형] 전문 AI입니다.
첨부된 이미지에서 다음 필드를 추출하십시오.

## 추출 필드
- field_name: 설명 (형식 예시)

## 주의사항
- [특수 처리 규칙]

JSON 형식으로만 응답하십시오.
```
