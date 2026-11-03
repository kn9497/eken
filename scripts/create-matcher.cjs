const fs = require('fs');

const dir = 'd:/eken-v3/public/assets/real/gemini2';
const files = fs.readdirSync(dir);
const prods = JSON.parse(fs.readFileSync('scripts/products_dump.json', 'utf8'));

// Group images by base
const groups = {};
files.forEach(f => {
  let base = f.replace(/\.(png|jpg|jpeg)$/i, '');
  base = base.replace(/\s*\(2\)\s*/i, '').replace(/\s*\(hero\)\s*/i, '').replace(/\s*hero\s*/i, '').replace(/\s*\(1\)\s*/i, '').trim();
  if (!groups[base]) groups[base] = [];
  groups[base].push(f);
});

let html = `<!DOCTYPE html>
<html>
<head>
  <title>Visual Matcher</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0b0f19; color: #f1f5f9; padding: 20px; }
    .row { display: flex; gap: 20px; border-bottom: 1px solid #1e293b; padding: 15px 0; align-items: center; }
    .img-box { display: flex; gap: 10px; min-width: 420px; }
    .img-box img { width: 190px; height: 240px; object-fit: contain; background: #fff; border-radius: 4px; }
    .info { flex: 1; }
    .tag { font-weight: bold; font-size: 16px; color: #38bdf8; margin-bottom: 6px; }
    .files { font-size: 12px; color: #94a3b8; margin-bottom: 8px; }
    select { background: #1e293b; color: #fff; border: 1px solid #475569; padding: 8px; border-radius: 4px; font-size: 14px; width: 100%; max-width: 500px; }
  </style>
</head>
<body>
  <h1>EKEN Gemini 2 Visual Matcher (${Object.keys(groups).length} image groups)</h1>
`;

const sortedKeys = Object.keys(groups).sort((a, b) => {
  const numA = parseInt(a.replace(/\D/g, '')) || 0;
  const numB = parseInt(b.replace(/\D/g, '')) || 0;
  return numA - numB;
});

sortedKeys.forEach(k => {
  const imgList = groups[k];
  html += `
    <div class="row" id="row-${k}">
      <div class="img-box">
        ${imgList.map(img => `<img src="/assets/real/gemini2/${img}" title="${img}" />`).join('')}
      </div>
      <div class="info">
        <div class="tag">Group: ${k}</div>
        <div class="files">${imgList.join(', ')}</div>
      </div>
    </div>
  `;
});

html += `
</body>
</html>
`;

fs.writeFileSync('d:/eken-v3/public/visual-matcher.html', html, 'utf8');
console.log('Created visual-matcher.html');
