const puppeteer = require('puppeteer');
const path = require('path');

const url = 'https://wordpress-102119-4026418.cloudwaysapps.com'; // Replace with your desired URL

async function takeDesktopScreenshot() {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 }); // Set desired viewport size

  await page.goto(url);

  // Wait for the page to load completely (optional)
  // await page.waitForLoadState('networkidle');

  // Extract website name from URL
  const websiteName = url.replace(/^https?:\/\//, '').replace('.com', '');

  const screenshotPath = path.join("Imgs/DeskImages", `${websiteName}_desktop_screenshot.png`);

  // Capture desktop screenshot
  await page.screenshot({ path: screenshotPath });
  console.log(`Desktop screenshot saved: ${screenshotPath}`);

  await browser.close();
}

takeDesktopScreenshot();
