const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

(async () => {
  const server = spawn('npm', ['run', 'preview', '--workspace=playground'], { stdio: 'pipe' });
  server.stdout.on('data', async (data) => {
    const output = data.toString();
    if (output.includes('http://localhost:')) {
      const portMatch = output.match(/http:\/\/localhost:(\d+)/);
      if (portMatch) {
        const url = `http://localhost:${portMatch[1]}/general-design-system/`;
        const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
        await page.goto(url, { waitUntil: 'networkidle0' });
        console.log('Finished loading!');
        await browser.close();
        server.kill();
        process.exit(0);
      }
    }
  });
})();
