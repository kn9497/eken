const fs = require('fs');

const content = fs.readFileSync('scripts/prompt_alignment.md', 'utf8');

const regex = /Product\s+(\d+):\s*([^\r\n]+)([\s\S]*?)(?=(?:Product\s+\d+:|$))/g;
let match;
const products = [];

function parseDimensions(str) {
  // Looks for cm measurements: e.g. 162.5 cm x 45.7 cm x 86.4 cm
  // Or: 40.6 cm Dia x 45.7 cm H
  // Or: King: 78" W x 84" L x 54" Headboard H ( 198.1 cm x 213.4 cm x 137.2 cm)
  // Or multi-part: Table: ... | Chair: ...
  const cmMatch = str.match(/([0-9.]+)\s*cm.*?([0-9.]+)\s*cm.*?([0-9.]+)\s*cm/i);
  if (cmMatch) {
    return {
      width: Math.round(parseFloat(cmMatch[1])),
      depth: Math.round(parseFloat(cmMatch[2])),
      height: Math.round(parseFloat(cmMatch[3])),
      unit: 'cm'
    };
  }
  const diaMatch = str.match(/([0-9.]+)\s*cm\s*Dia.*?([0-9.]+)\s*cm\s*H/i);
  if (diaMatch) {
    const dia = Math.round(parseFloat(diaMatch[1]));
    const h = Math.round(parseFloat(diaMatch[2]));
    return {
      width: dia,
      depth: dia,
      height: h,
      unit: 'cm'
    };
  }
  const twoMatch = str.match(/([0-9.]+)\s*cm.*?([0-9.]+)\s*cm/i);
  if (twoMatch) {
    return {
      width: Math.round(parseFloat(twoMatch[1])),
      depth: Math.round(parseFloat(twoMatch[2])),
      height: Math.round(parseFloat(twoMatch[2])),
      unit: 'cm'
    };
  }
  return { width: 0, height: 0, depth: 0, unit: 'cm' };
}

while ((match = regex.exec(content)) !== null) {
  const num = parseInt(match[1]);
  const title = match[2].trim();
  const body = match[3];

  const catMatch = body.match(/Category\s*&\s*Type:\s*([^\r\n]+)/);
  const descMatch = body.match(/Description:\s*([^\r\n]+(?:\r?\n(?!(?:Dimensions:|Materials Used:|Regular Price:|Discounted Price:|Anti-Gravity))[^\r\n]+)*)/);
  const dimMatch = body.match(/Dimensions:\s*([^\r\n]+(?:\r?\n(?!(?:Materials Used:|Regular Price:|Discounted Price:|Anti-Gravity))[^\r\n]+)*)/);
  const matMatch = body.match(/Materials Used:\s*([^\r\n]+)/);
  const regPriceMatch = body.match(/Regular Price:\s*₹?([0-9,]+)/);
  const discPriceMatch = body.match(/Discounted Price:\s*₹?([0-9,]+)/);

  const rawDim = dimMatch ? dimMatch[1].trim().replace(/\r?\n/g, ' ') : '';
  const parsedDim = parseDimensions(rawDim);
  const rawMat = matMatch ? matMatch[1].trim() : '';
  const materials = rawMat.split(/,\s*/).map(m => m.trim().replace(/\.$/, '')).filter(Boolean);

  products.push({
    num,
    title,
    categoryType: catMatch ? catMatch[1].trim() : '',
    description: descMatch ? descMatch[1].trim().replace(/\r?\n/g, ' ') : '',
    dimensions: parsedDim,
    dimensionsRaw: rawDim,
    materials,
    regularPrice: regPriceMatch ? parseInt(regPriceMatch[1].replace(/,/g, '')) * 100 : 0,
    discountedPrice: discPriceMatch ? parseInt(discPriceMatch[1].replace(/,/g, '')) * 100 : 0
  });
}

console.log('Processed', products.length, 'products');
products.forEach(p => {
  console.log(`P${p.num}: ${p.title} | ${JSON.stringify(p.dimensions)} | Disc: ${p.discountedPrice} | Reg: ${p.regularPrice}`);
});
