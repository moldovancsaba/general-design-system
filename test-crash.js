const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('apps/playground/dist/index.html', 'utf8');

const dom = new JSDOM(html, {
  url: "http://localhost/general-design-system/",
  runScripts: "dangerously",
  resources: "usable",
  beforeParse(window) {
    window.console.error = (...args) => console.log('ERROR:', ...args);
    window.console.warn = (...args) => console.log('WARN:', ...args);
    window.console.log = (...args) => console.log('LOG:', ...args);
    window.addEventListener('error', (event) => {
      console.log('UNCAUGHT ERROR:', event.error);
    });
  }
});
setTimeout(() => {
  console.log('Finished waiting for DOM.');
  process.exit(0);
}, 3000);
