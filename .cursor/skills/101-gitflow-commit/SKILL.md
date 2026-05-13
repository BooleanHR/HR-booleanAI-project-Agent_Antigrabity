---
name: 101-gitflow-commit
description: Git Flow 브랜치 전략 기반 커밋 및 PR 작성 절차
---
# Git Flow 커밋 / PR 절차

## 브랜치 네이밍
- `feat/RX-001-puppeteer-setup` — 기능 개발
- `fix/RX-003-selector-broken` — 버그 수정
- `docs/update-prd-v1.2` — 문서 업데이트
- `refactor/ocr-prompt-optimization` — 리팩토링

## 커밋 메시지 형식 (Conventional Commits)
```
<type>(<scope>): <subject>

<body>

<footer>
```
- **type:** feat, fix, docs, refactor, test, chore
- **scope:** rpa, ocr, dashboard, pipeline, config, auth
- **예시:** `feat(rpa): RX-002 4단계 폴백 캡처 엔진 구현`

## PR 작성
1. 변경 파일 확인: `git diff --stat`
2. 제목: `[Task-ID] 간결한 설명`
3. 본문: 변경 사유, 접근 방식, 테스트 결과
4. 리뷰어 지정 및 레이블 추가
