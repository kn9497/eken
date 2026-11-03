const fs = require('fs');

const unmappedGroups = ['p1', 'p2', 'p3', 'p10', 'p11', 'p13', 'p18', 'p21', 'p23'];
const files = fs.readdirSync('d:/eken-v3/public/assets/real/gemini2');

let html = `<!DOCTYPE html>
<html>
<head>
  <title>Inspect Remaining Groups</title>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: #fff; padding: 20px; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .card { background: #1e293b; padding: 12px; border-radius: 8px; }
    img { width: 100%; height: 320px; object-fit: contain; background: #fff; border-radius: 4px; }
    h3 { margin: 8px 0 4px; color: #38bdf8; }
    p { margin: 0; font-size: 13px; color: #94a3b8; }
  </style>
</head>
<body>
  <h1>Inspect Remaining Groups (${unmappedGroups.join(', ')})</h1>
  <div class="grid">
`;

unmappedGroups.forEach(grp => {
  const matched = files.filter(f => {
    let base = f.replace(/\.(png|jpg|jpeg)$/i, '');
    base = base.replace(/\s*\(2\)\s*/i, '').replace(/\s*\(hero\)\s*/i, '').replace(/\s*hero\s*/i, '').replace(/\s*\(1\)\s*/i, '').trim();
    return base === grp;
  });
  matched.forEach(f => {
    html += `
      <div class="card">
        <img src="/assets/real/gemini2/${f}" />
        <h3>${grp}</h3>
        <p>${f}</p>
      </div>
    `;
  });
});

html += `
  </div>
</body>
</html>
`;

fs.writeFileSync('d:/eken-v3/public/remaining.html', html, 'utf8');
console.log('Created remaining.html');
