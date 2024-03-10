const puppeteer = require('puppeteer');
const path = require('path');
const urls = require('./urls'); // Import the array of URLs from 'urls.js'

async function takeMobileScreenshots() {
  const browser = await puppeteer.launch();

  const iPhone = puppeteer.devices['iPhone X']; // Access the device list from puppeteer.devices

  for (let i = 0; i < urls.length; i++) {
    const page = await browser.newPage();
    await page.emulate(iPhone);
    await page.goto(urls[i]);

    // Wait for the page to load completely (optional)
    // await page.waitForTimeout(5000); 
    // Wait for 5 seconds

    // Extract website name from URL
    const websiteName = urls[i].replace(/^https?:\/\//, '').replace('.com', '');

    const screenshotPath = path.join("Imgs/MobImages", `${i}_${websiteName}_mobile_screenshot.png`);

    // Capture screenshot in mobile view
    const screenshotOptions = {
      fullPage: true // Capture full page in mobile view
    };

    await page.screenshot({ path: screenshotPath, ...screenshotOptions });
    console.log(`Mobile screenshot saved: ${screenshotPath}`);

    await page.close();
  }

  await browser.close();
}

takeMobileScreenshots();
