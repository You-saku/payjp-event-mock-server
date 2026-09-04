// PAY.JP webhook mock sender. Zero deps. `node server.js` -> http://localhost:8787
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8787;
const files = { '/': 'index.html', '/templates.json': 'templates.json' };

http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/send') {
    let raw = '';
    for await (const chunk of req) raw += chunk;
    const { url, token, event } = JSON.parse(raw);
    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Payjp-Webhook-Token': token },
        body: JSON.stringify(event),
      });
      const body = await r.text();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: r.status, body }));
    } catch (e) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 0, body: String(e) }));
    }
    return;
  }
  const f = files[req.url];
  if (!f) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': f.endsWith('.json') ? 'application/json' : 'text/html; charset=utf-8' });
  fs.createReadStream(path.join(__dirname, f)).pipe(res);
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
