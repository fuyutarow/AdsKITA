"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.screenshotUrl = void 0;
const puppeteer = require("puppeteer");
exports.screenshotUrl = async (url) => {
    const browser = await puppeteer.launch({
        // args: ['--no-sandbox', '--disable-setuid-sandbox'],
        args: ['--no-sandbox'],
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
    await browser.close();
    return dataUri;
};
//# sourceMappingURL=screenshot.js.map