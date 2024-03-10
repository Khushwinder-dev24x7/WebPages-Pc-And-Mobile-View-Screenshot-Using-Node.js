
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const urls = require('./urls');

//  For Desktop line 9 to 38

async function takeScreenshots() {
  const browser = await puppeteer.launch();

  for (let i = 0; i < urls.length; i++) {
    const page = await browser.newPage();
    await page.goto(urls[i]);
    await page.setViewport({ width: 1920, height: 1080 });

    // await page.waitForTimeout(5000);

    // Extract website name from URL
    const websiteName = urls[i].replace(/^https?:\/\//, '').replace('.com', '');

    const screenshotPath = path.join("Imgs/DeskImages", `${i}_${websiteName}_screenshot.png`);

    // Only for banners capture 
    await page.screenshot({ path: screenshotPath });

    // For Fullscreen Capture 
    // await page.screenshot({ path: screenshotPath, fullPage: true});

    console.log(`Screenshot saved: ${screenshotPath}`);

    await page.close();
  }
  await browser.close();
}

takeScreenshots();

