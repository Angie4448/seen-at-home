const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const allowed = new Set(['index.html', 'styles.css', 'data.js', 'app.js']);
const types = {'.html':'text/html', '.css':'text/css', '.js':'text/javascript'};
http.createServer((req,res) => {
  const name = new URL(req.url, 'http://localhost').pathname.slice(1) || 'index.html';
  if (!allowed.has(name)) {res.writeHead(404); return res.end('Not found');}
  const file = path.join(__dirname,name);
  if (!fs.existsSync(file)) {res.writeHead(503); return res.end('Preparing preview');}
  res.writeHead(200, {'Content-Type':types[path.extname(name)]+'; charset=utf-8','Cache-Control':'no-store'});
  res.end(fs.readFileSync(file));
}).listen(8767,'127.0.0.1',()=>console.log('Local prototype: http://127.0.0.1:8767/'));
