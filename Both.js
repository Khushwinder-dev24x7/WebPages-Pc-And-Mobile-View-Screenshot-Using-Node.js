const puppeteer = require('puppeteer');
const path = require('path');
const urls = require('./urls'); // Import the array of URLs from 'urls.js'

async function takeScreenshots() {
  const browser = await puppeteer.launch();

  // Emulate Desktop view
  const desktopViewport = {
    width: 1920,
    height: 1080,
    isMobile: false,
    deviceScaleFactor: 1,
  };

  // Emulate Mobile view
  const mobileViewport = {
    width: 375,
    height: 812,
    isMobile: true,
    deviceScaleFactor: 2,
    hasTouch: true,
  };

  for (let i = 0; i < urls.length; i++) {
    const pageDesktop = await browser.newPage();
    await pageDesktop.setViewport(desktopViewport);
    await pageDesktop.goto(urls[i]);

    const pageMobile = await browser.newPage();
    await pageMobile.setViewport(mobileViewport);
    await pageMobile.goto(urls[i]);

    // // Wait for the page to load completely (optional)
    // await Promise.all([
    //   pageDesktop.waitForLoadState('networkidle'),
    //   pageMobile.waitForLoadState('networkidle'),
    // ]);

    // Extract website name from URL
    const websiteName = urls[i].replace(/^https?:\/\//, '').replace('.com', '');

    const desktopScreenshotPath = path.join("Imgs/DeskImages", `${i}_${websiteName}_desktop_screenshot.png`);
    const mobileScreenshotPath = path.join("Imgs/MobImages", `${i}_${websiteName}_mobile_screenshot.png`);

    // Capture screenshots
    await pageDesktop.screenshot({ path: desktopScreenshotPath });
    console.log(`Desktop screenshot saved: ${desktopScreenshotPath}`);

    await pageMobile.screenshot({ path: mobileScreenshotPath });
    console.log(`Mobile screenshot saved: ${mobileScreenshotPath}`);

    await pageDesktop.close();
    await pageMobile.close();
  }

  await browser.close();
}

takeScreenshots();
