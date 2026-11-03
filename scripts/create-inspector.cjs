const fs = require('fs');

const dir = 'd:/eken-v3/public/assets/real/gemini2';
const files = fs.readdirSync(dir);
files.sort();

let html = `<!DOCTYPE html>
<html>
<head>
  <title>Gemini 2 Image Inspector</title>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: #fff; margin: 0; padding: 20px; }
    h1 { margin-bottom: 20px; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .card { background: #1e293b; border-radius: 8px; overflow: hidden; padding: 8px; border: 1px solid #334155; }
    .card.highlight { border: 2px solid #38bdf8; }
    img { width: 100%; height: 260px; object-fit: contain; background: #f8fafc; border-radius: 4px; }
    .num { font-size: 12px; color: #94a3b8; margin-top: 4px; }
    .name { font-size: 13px; word-break: break-all; font-weight: bold; color: #38bdf8; margin-top: 2px; }
  </style>
</head>
<body>
  <h1>Gemini 2 Asset Library (${files.length} images)</h1>
  <div class="grid">
`;

files.forEach((file, idx) => {
  html += `
    <div class="card" id="card-${idx}">
      <img src="/assets/real/gemini2/${file}" alt="${file}" />
      <div class="num">#${idx + 1}</div>
      <div class="name">${file}</div>
    </div>
  `;
});

html += `
  </div>
</body>
</html>
`;

fs.writeFileSync('d:/eken-v3/public/inspector.html', html, 'utf8');
console.log('Updated inspector.html');
