// import * as playwright from 'playwright';

// import { sleep } from './utils';

import * as puppeteer from 'puppeteer';

export const screenshotUrl = async (url: string) => {

  const screenShotUrl = async (url: string) => {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    await page.goto(url);
    await page.setDefaultNavigationTimeout(3 * 1e3);
    const base64 = await page.screenshot({ encoding: 'base64' });

    const dataUri = `data:image/png;base64,${base64}`;
    console.log(dataUri);

    await page.screenshot({
      // fullPage: true,
      path: 'example-chromium.png',
    });
    await browser.close();
  };

  (async () => {
    const url = 'https://youtube.com';
    // const url = 'https://github.com';
    screenShotUrl(url);
  }
  )();
};
