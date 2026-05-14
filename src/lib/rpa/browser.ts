import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser } from 'puppeteer';

// Apply stealth plugin
puppeteer.use(StealthPlugin());

let browserInstance: Browser | null = null;

export const getBrowser = async (): Promise<Browser> => {
  if (browserInstance) {
    return browserInstance;
  }

  const isHeadless = process.env.RPA_HEADLESS !== 'false';
  const slowMo = parseInt(process.env.RPA_SLOW_MO || '0', 10);
  const timeout = parseInt(process.env.RPA_TIMEOUT || '30000', 10);

  browserInstance = await puppeteer.launch({
    headless: isHeadless,
    slowMo,
    timeout,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled'
    ],
  });

  return browserInstance;
};

export const closeBrowser = async (): Promise<void> => {
  if (browserInstance) {
    await browserInstance.close();
    browserInstance = null;
  }
};
