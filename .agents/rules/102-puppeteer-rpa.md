---
description: Puppeteer RPA 엔진 규칙 — RPA 관련 코드 편집 시 자동 적용
globs: ["src/**/rpa/**/*", "lib/rpa/**/*"]
alwaysApply: false
---
# Puppeteer RPA 엔진 규칙

## 셀렉터 관리
- 모든 셀렉터는 `agency_config.json`의 `rpa_selectors`에 배열로 정의.
- 하드코딩 셀렉터 금지. 설정 파일 참조 필수.
- 폴백 순서: ID → name → class → placeholder/text.
- 전체 실패 시 Gemini에게 DOM 분석 요청.

## 4단계 폴백 전략
1. Puppeteer + Stealth Plugin
2. Chrome 사용자 프로파일 재활용
3. API 직접 호출
4. Mock + MANUAL_REVIEW 전환

## 보안
- 기관 계정은 AES-256-GCM 암호화 저장.
- 로그에 자격증명 평문 기록 금지.
- 캡처 이미지는 SHA-256 해시 + 타임스탬프 저장.

## 안정성
- `page.goto()`: timeout 30000ms.
- `waitForSelector()`: timeout 10000ms.
- 사람처럼 입력: `{ delay: 50 }`.
- `finally` 블록에서 반드시 `browser.close()`.
