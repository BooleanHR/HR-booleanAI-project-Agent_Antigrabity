import { getBrowser, closeBrowser } from '../src/lib/rpa/browser';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load .env.local manually for standalone script
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function runTest() {
  console.log('Starting RPA smoke test (gov24)...');
  
  const capturesDir = path.join(process.cwd(), 'captures');
  if (!fs.existsSync(capturesDir)) {
    fs.mkdirSync(capturesDir, { recursive: true });
  }

  try {
    const browser = await getBrowser();
    const page = await browser.newPage();
    
    // Test navigator.webdriver
    const webdriverValue = await page.evaluate(() => navigator.webdriver);
    console.log(`navigator.webdriver detected as: ${webdriverValue}`);
    
    if (webdriverValue !== false && webdriverValue !== undefined) {
      console.warn('⚠️ WARNING: navigator.webdriver is true. Stealth mode might not be working.');
    } else {
      console.log('✅ Stealth mode active.');
    }

    console.log('Navigating to 정부24...');
    await page.goto('https://www.gov.kr/portal/main', { waitUntil: 'networkidle2', timeout: 30000 });
    
    const screenshotPath = path.join(capturesDir, 'test_gov24.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`✅ Screenshot saved to: ${screenshotPath}`);
  } catch (err) {
    console.error('❌ Failed to navigate or capture gov24:', err);
  } finally {
    await closeBrowser();
    console.log('Browser closed.');
  }
}

runTest();
