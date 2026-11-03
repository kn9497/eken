const fs = require('fs');

const list = JSON.parse(fs.readFileSync('scripts/products_dump.json', 'utf8'));

list.forEach(p => {
  console.log(`[P${p.num}] ${p.title}`);
  console.log(`  Desc: ${p.desc}`);
  console.log(`  Materials: ${p.mat}`);
  console.log(`  Prompt: ${p.prompt}`);
  console.log('----------------------------------------------------');
});
