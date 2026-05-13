---
name: execute-next-task
description: DAG 기반으로 다음 실행 가능한 Task를 자동 탐색하고, 적합한 서브에이전트에 위임하는 오케스트레이터 워크플로우
---

# 🎯 Task 오케스트레이터 — 다음 Task 자동 실행

## Step 1: 현재 상태 파악

`tasks/task-status.json`을 읽고 모든 Task의 상태를 파악하세요.

- `pending` — 미착수
- `in_progress` — 진행 중
- `done` — 완료
- `blocked` — 선행 Task 미완료로 차단됨

## Step 2: 실행 가능 Task 탐색 (DAG 순회)

아래 조건을 **모두** 만족하는 Task를 찾으세요:
1. `status`가 `pending`
2. `depends_on` 배열의 **모든** Task가 `done`

찾은 Task가 **여러 개**인 경우:
- `phase`가 작은 것 우선
- 같은 phase면 **병렬 실행 가능**으로 표시
- `complexity`가 `L` → `M` → `H` 순서로 제안 (쉬운 것 먼저)

## Step 3: Task 상세 확인

`tasks/TASK-001-HR-AI-Verification-v1_2.md`에서 해당 Task의:
- Task Breakdown (TB) 항목
- Acceptance Criteria
- Dependencies / Blocks 관계

를 확인하세요.

## Step 4: 서브에이전트 위임

Task의 `agent` 필드에 맞는 서브에이전트를 호출하세요:

| agent 값 | 서브에이전트 | 전문 분야 |
|---|---|---|
| `rpa-engine` | Puppeteer RPA 전문가 | RPA, 셀렉터, 암호화 |
| `ocr-ai-pipeline` | Gemini OCR + AI 전문가 | OCR, AI Reviewer, 검증 |
| `nextjs-dashboard` | Next.js UI 전문가 | 대시보드, 설정 폼 |

## Step 5: 완료 처리

// turbo
Task의 모든 TB 항목과 AC를 충족했다면:
1. `task-status.json`에서 해당 Task의 `status`를 `"done"`으로 변경
2. `git add -A && git commit -m "feat(<scope>): <Task-ID> 구현 완료"`

## Step 6: 다음 Task 보고

업데이트된 DAG에서 새로 실행 가능해진 Task 목록을 보고하세요.

```
📊 진행 현황: X/14 완료
✅ 방금 완료: <Task-ID> <제목>
🟢 다음 실행 가능: <Task-ID 목록> (병렬 가능 여부 표시)
⏳ 대기 중: <차단된 Task 수>개
```
