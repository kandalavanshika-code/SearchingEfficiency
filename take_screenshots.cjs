const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Visiting /');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screenshot_dashboard_light.png' });

  console.log('Visiting /visualizer');
  await page.goto('http://localhost:5173/visualizer', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screenshot_visualizer_light.png' });

  console.log('Visiting /analytics');
  await page.goto('http://localhost:5173/analytics', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screenshot_analytics_light.png' });
  
  await browser.close();
  console.log('Done screenshots');
})();
