const puppeteer = require('puppeteer');
const path = require('path');

async function takeMobileScreenshot(url) {
  const browser = await puppeteer.launch();

  const mobileViewport = {
    width: 375,
    height: 812,
    isMobile: true,
    deviceScaleFactor: 2,
    hasTouch: true,
  };

  const page = await browser.newPage();
  await page.setViewport(mobileViewport);
  await page.goto(url);

  // Wait for the page to load completely (optional)
  // await page.waitForLoadState('networkidle');

  // Extract website name from URL
  const websiteName = url.replace(/^https?:\/\//, '').replace('.com', '').replace(/\W/g, '_');

  const screenshotPath = path.join("Imgs/MobImages", `${websiteName}_mobile_screenshot.png`);

  // Capture screenshot in mobile view
  await page.screenshot({ path: screenshotPath });
  console.log(`Mobile screenshot saved: ${screenshotPath}`);

  await browser.close();
}

// Replace 'https://example.com' with the desired URL
takeMobileScreenshot('https://example.com');
