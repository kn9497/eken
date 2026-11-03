const fs = require('fs');

const content = fs.readFileSync('scripts/prompt_alignment.md', 'utf8');

const regex = /Product\s+(\d+):\s*([^\r\n]+)([\s\S]*?)(?=(?:Product\s+\d+:|$))/g;
let match;

const list = [];
while ((match = regex.exec(content)) !== null) {
  const num = parseInt(match[1]);
  const title = match[2].trim();
  const body = match[3];

  const descMatch = body.match(/Description:\s*([^\r\n]+(?:\r?\n(?!(?:Dimensions:|Materials Used:|Regular Price:|Discounted Price:|Anti-Gravity))[^\r\n]+)*)/);
  const promptMatch = body.match(/Anti-Gravity Prompt:\s*([^\r\n]+(?:\r?\n(?!(?:Product\s+\d+:|$))[^\r\n]+)*)/);
  const matMatch = body.match(/Materials Used:\s*([^\r\n]+)/);

  list.push({
    num,
    title,
    desc: descMatch ? descMatch[1].trim().replace(/\r?\n/g, ' ') : '',
    prompt: promptMatch ? promptMatch[1].trim().replace(/\r?\n/g, ' ') : '',
    mat: matMatch ? matMatch[1].trim() : ''
  });
}

fs.writeFileSync('scripts/products_dump.json', JSON.stringify(list, null, 2), 'utf8');
console.log('Saved 40 products to scripts/products_dump.json');
