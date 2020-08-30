import * as playwright from 'playwright';

export const screenshotUrl = async (url: string) => {
  const browser = await playwright['chromium'].launch({
    args: ['--no-sandbox'],
  });
  const context = await browser.newContext({
    // viewport: null,
    viewport: {
      width: 1920,
      height: 1080,
    },
  });

  const page = await context.newPage();
  // await page.goto('http://whatsmyuseragent.org/');
  await page.goto(url);
  await page.waitForTimeout(3 * 1e3);
  const base64 = (await page.screenshot()).toString('base64');
  const dataUri = `data:image/png;base64,${base64}`;

  await page.screenshot({
    // fullPage: true,
    path: 'example-chromium.png',
  });
  await browser.close();

  return dataUri;
};
