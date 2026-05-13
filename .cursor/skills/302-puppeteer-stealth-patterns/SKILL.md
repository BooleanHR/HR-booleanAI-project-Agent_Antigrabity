---
name: 302-puppeteer-stealth-patterns
description: Puppeteer + Stealth 플러그인 패턴 레퍼런스 — RPA 캡처 구현
---
# Puppeteer + Stealth 패턴

## 기본 설정
```typescript
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin())

const browser = await puppeteer.launch({
  headless: process.env.RPA_HEADLESS !== 'false',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  slowMo: Number(process.env.RPA_SLOW_MO) || 50
})
```

## 캡처 플로우
```typescript
async function captureVerification(
  agencyConfig: AgencyConfig,
  inputData: Record<string, string>
): Promise<CaptureResult> {
  const browser = await launchBrowser()
  try {
    const page = await browser.newPage()
    await page.goto(agencyConfig.url, { waitUntil: 'networkidle2', timeout: 30000 })

    // 셀렉터 배열 순서대로 시도
    for (const [field, value] of Object.entries(inputData)) {
      const element = await findElement(page, agencyConfig.rpa_selectors[field])
      await element.type(value, { delay: 50 })
    }

    await clickSubmit(page, agencyConfig.rpa_selectors.submit)
    await waitForResult(page, agencyConfig.rpa_selectors.result)

    const screenshot = await page.screenshot({ fullPage: false, type: 'png' })
    const hash = createHash('sha256').update(screenshot).digest('hex')
    return { success: true, screenshot, hash, capturedAt: new Date() }
  } finally {
    await browser.close()
  }
}
```

## 안티봇 회피
- Stealth Plugin 자동 적용 (navigator.webdriver 숨기기).
- 마우스 이동에 랜덤 지연 추가.
- User-Agent 자동 로테이션 (`puppeteer-extra-plugin-anonymize-ua`).
