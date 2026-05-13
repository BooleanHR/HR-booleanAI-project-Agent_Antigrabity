---
name: 303-tailwind-shadcn-patterns
description: Tailwind CSS + shadcn/ui 컴포넌트 패턴 레퍼런스
---
# Tailwind CSS + shadcn/ui 패턴

## shadcn/ui 설치
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card badge table dialog
```

## 대시보드 UI 패턴

### 검증 상태 뱃지
```tsx
import { Badge } from '@/components/ui/badge'

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    APPROVE: 'bg-green-100 text-green-800',
    REJECT: 'bg-red-100 text-red-800',
    ESCALATE: 'bg-yellow-100 text-yellow-800',
    PENDING: 'bg-gray-100 text-gray-800',
  }
  return <Badge className={variants[status]}>{status}</Badge>
}
```

### 신뢰도 게이지
```tsx
function ConfidenceGauge({ score }: { score: number }) {
  const color = score >= 90 ? 'bg-green-500' : score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className={`${color} h-2 rounded-full`} style={{ width: `${score}%` }} />
    </div>
  )
}
```

## 스타일링 원칙
- shadcn/ui 컴포넌트 우선 사용. 커스텀 컴포넌트는 최소화.
- 다크모드 지원: `className="dark:bg-gray-900"`.
- 반응형: `sm:`, `md:`, `lg:` 브레이크포인트 활용.
- 색상 팔레트: shadcn/ui 기본 테마 사용.
