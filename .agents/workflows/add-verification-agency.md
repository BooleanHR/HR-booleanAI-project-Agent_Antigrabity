---
name: add-verification-agency
description: agency_config.json에 새 진위확인 기관을 추가하는 워크플로우
---

# 기관 추가 워크플로우

새 진위확인 기관을 `config/agency_config.json`에 추가하는 단계별 절차입니다.

---

## Step 1: 기관 정보 수집

사용자에게 아래 정보를 확인합니다:
- 기관명 (한글)
- 진위확인 URL
- 로그인 필요 여부
- 입력 필드 목록 (문서확인번호, 성명 등)
- 적용 서류 유형 (졸업증명서_아이써티 등)

## Step 2: 셀렉터 수집

// turbo
1. 해당 URL의 HTML 구조를 분석하여 입력 필드, 제출 버튼, 결과 영역의 CSS 셀렉터를 수집합니다.
2. 각 필드에 대해 최소 2개 이상의 폴백 셀렉터를 준비합니다.

## Step 3: JSON 항목 작성

`config/agency_config.json`의 `agencies` 배열 끝에 새 항목을 추가합니다:

```json
{
  "agency_id": "영문_고유_ID",
  "display_name": "한글 표시명",
  "url": "https://...",
  "auth_required": false,
  "input_fields": [
    { "field_key": "doc_confirm_number", "label": "문서확인번호" }
  ],
  "applicable_doc_types": ["서류유형"],
  "rpa_selectors": {
    "doc_confirm_number": ["#selector1", "input[name='..']"],
    "submit": ["#btnSubmit"],
    "result": ["#resultArea"]
  },
  "valid_days": null,
  "notes": "특이사항"
}
```

## Step 4: 검증

// turbo
1. JSON 문법 검증 (파싱 테스트).
2. 가능하면 Puppeteer로 해당 URL 접속 + 셀렉터 존재 여부 확인.

## Step 5: 완료
- hot-load 적용되므로 앱 재시작 불필요.
- 결과를 사용자에게 보고.
