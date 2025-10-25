#!/usr/bin/env node
/*
  Minimal MCP-like echo server (simulation):
  - HTTP server with /health and /echo endpoints
  - Purpose: local validation of marketplace + plugin structure + process startup
  - Note: This is NOT a full MCP protocol implementation; use it to validate end-to-end wiring.
*/
const http = require('http');

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', port: PORT }));
    return;
  }
  if (req.method === 'POST' && req.url === '/echo') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ echo: data }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'invalid json' }));
      }
    });
    return;
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(PORT, () => {
  console.log(`Echo MCP simulation running on http://localhost:${PORT}`);
  console.log(`Health: GET /health, Echo: POST /echo`);
});

