---
name: 200-rpa-selector-management
description: RPA 셀렉터 추가/수정/테스트 절차 가이드 — agency_config.json 기반
---
# RPA 셀렉터 관리 가이드

## 셀렉터가 파손되었을 때 (헬스체크 알림 수신 시)

### Step 1: 대상 기관 사이트 직접 접속
- `agency_config.json`에서 해당 기관의 URL 확인.
- 브라우저 DevTools (F12)에서 변경된 DOM 구조 분석.

### Step 2: 새 셀렉터 후보 탐색 (우선순위)
1. `#id` — ID 기반 (가장 안정적)
2. `input[name="fieldName"]` — name 속성
3. `.class-name` — 클래스
4. `input[placeholder*="텍스트"]` — placeholder 텍스트

### Step 3: agency_config.json 수정
- `rpa_selectors` 배열의 **첫 번째** 위치에 새 셀렉터 추가.
- 기존 셀렉터는 뒤로 밀어 폴백용으로 유지.

### Step 4: 테스트
- 대시보드 "RPA 테스트" 버튼 또는 직접 Puppeteer 스크립트 실행.
- 성공 시 커밋. 실패 시 Step 2로 복귀.

## 새 기관 추가 시
- `agency_config.json`의 `agencies` 배열 끝에 새 항목 추가.
- 필수 필드: `agency_id`, `display_name`, `url`, `auth_required`, `input_fields`, `rpa_selectors`.
- hot-load 적용되므로 앱 재시작 불필요.
