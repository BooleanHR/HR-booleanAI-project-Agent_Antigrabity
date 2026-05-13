---
description: HR AI 서류 진위확인 솔루션 프로젝트 개요 — 모든 작업에 자동 적용
globs: ["**/*"]
alwaysApply: true
---
# 프로젝트 개요: HR AI 서류 진위확인 솔루션

## 비전
채용 과정 서류(졸업증명서, 자격증, 경력증명서, 어학성적 등) 진위를 AI + RPA 기반으로 자동 확인하여 HR 담당자 검토 시간을 건당 12분 → 30초 이하로 단축.

## 핵심 기능
- **Triple Check Pipeline:** 입사지원서 기재값 × OCR 추출값 × 기관 DB 3중 교차 검증
- **Puppeteer RPA 엔진:** 정부24, Q-Net, YBM, OPIc 등 기관 사이트 자동 조회 + 4단계 폴백
- **Gemini Vision OCR:** 25개 서류 유형별 전용 프롬프트, 구조화 JSON 추출
- **AI Reviewer Agent:** Gemini Vision LLM 기반 종합 판정 (APPROVE / REJECT / ESCALATE)
- **대시보드:** 검증 현황, AI 검토 결과, 담당자 최종 승인/반려
- **기관 URL 커스텀 설정:** PM 셀프서비스, agency_config.json hot-load

## 아키텍처
- **로컬 퍼스트:** 모든 데이터 로컬 저장, 클라우드 전송 원천 차단
- **파이프라인:** Seq-01 자동화 (스캔 → 변환 → OCR → Layer1 → RPA → Layer2 → AI Review → 결과)

## 참조
- [002-tech-stack.md](002-tech-stack.md) — 기술 스택
- [003-development-guidelines.md](003-development-guidelines.md) — 개발 가이드라인
