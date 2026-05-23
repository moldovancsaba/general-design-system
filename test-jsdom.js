const { spawn } = require('child_process');
const { JSDOM } = require('jsdom');

const server = spawn('npm', ['run', 'preview', '--workspace=playground'], { stdio: 'pipe' });

server.stdout.on('data', async (data) => {
  const output = data.toString();
  console.log('SERVER:', output);
  
  if (output.includes('http://localhost:')) {
    const portMatch = output.match(/http:\/\/localhost:(\d+)/);
    if (portMatch) {
      const url = `http://localhost:${portMatch[1]}/general-design-system/`;
      console.log('Testing url:', url);
      JSDOM.fromURL(url, {
        runScripts: "dangerously",
        resources: "usable"
      }).then(dom => {
        const window = dom.window;
        window.console.error = (...args) => console.log('ERROR:', ...args);
        window.console.warn = (...args) => console.log('WARN:', ...args);
        window.console.log = (...args) => {}; // ignore standard logs
        
        window.addEventListener('error', (event) => {
          console.log('UNCAUGHT ERROR:', event.error);
        });
        
        setTimeout(() => {
          console.log('BODY HTML:', window.document.body.innerHTML);
          console.log('Done testing.');
          server.kill();
          process.exit(0);
        }, 5000);
      }).catch(err => {
        console.error('JSDOM Error:', err);
        server.kill();
        process.exit(1);
      });
    }
  }
});

server.stderr.on('data', data => console.error('SERVER ERR:', data.toString()));
