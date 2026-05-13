---
name: 202-agency-config-management
description: agency_config.json 기관 설정 추가/수정 절차
---
# 기관 설정 관리 가이드 (agency_config.json)

## 파일 위치
`config/agency_config.json`

## 기관 항목 스키마
```json
{
  "agency_id": "고유 영문 ID (예: gov24_doc)",
  "display_name": "표시명 (예: 정부24 — 인터넷 발급문서 진위확인)",
  "url": "진위확인 URL",
  "auth_required": false,
  "credential_key": "암호화 저장 키 (auth_required=true 시)",
  "input_fields": [
    { "field_key": "doc_confirm_number", "label": "문서확인번호", "format": "####-####-####-####" }
  ],
  "applicable_doc_types": ["졸업증명서_정부24", "장애인증명서"],
  "rpa_selectors": {
    "doc_confirm_number": ["#docNumber", "input[name='docNum']"],
    "submit": ["#btnConfirm"],
    "result": ["#resultArea"]
  },
  "valid_days": 180,
  "notes": "발급일로부터 180일 이내 유효"
}
```

## 새 기관 추가 절차
1. 진위확인 사이트 URL 확인.
2. 브라우저 DevTools로 입력 필드/버튼/결과 영역 셀렉터 수집.
3. 위 스키마에 맞춰 항목 작성.
4. `agencies` 배열 끝에 추가.
5. 저장 → hot-load 자동 반영 (재시작 불필요).
6. 대시보드 "RPA 테스트" 버튼으로 검증.

## 주의사항
- `agency_id`는 프로젝트 전체에서 고유해야 함.
- `credential_key`는 대시보드 계정 설정 UI에서 입력한 암호화 키와 매칭.
- `rpa_selectors` 배열은 우선순위 순서 (첫 번째가 최우선).
