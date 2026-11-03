const fs = require('fs');

const content = fs.readFileSync('scripts/prompt_alignment.md', 'utf8');
const regex = /Product\s+(\d+):\s*([^\r\n]+)([\s\S]*?)(?=(?:Product\s+\d+:|$))/g;
let match;
const products = [];

while ((match = regex.exec(content)) !== null) {
  const num = parseInt(match[1]);
  const title = match[2].trim();
  const body = match[3];
  const catMatch = body.match(/Category\s*&\s*Type:\s*([^\r\n]+)/);
  const promptMatch = body.match(/Anti-Gravity Prompt:\s*([^\r\n]+(?:\r?\n(?!(?:Product\s+\d+:|$))[^\r\n]+)*)/);
  products.push({
    num,
    title,
    cat: catMatch ? catMatch[1].trim() : '',
    prompt: promptMatch ? promptMatch[1].trim().replace(/\r?\n/g, ' ') : ''
  });
}

// Current identified matches:
// P1: Narmada Sideboard -> p5 or p11?
// P2: Betwa Accent Stool -> p8
// P4: Indus Lounge Chair -> p31
// P5: Narmada Accent Chair -> p14
// P6: Kaveri Armchair -> p16
// P7: Godavari Oval Coffee Table -> p17
// P8: Malabar Armchair -> p24
// P9: Godavari Lounge Chair -> p39
// P10: Narmada 4-Seater Grand Sofa -> p25
// P11: Kaveri Executive Swivel -> p26
// P12: Kaveri Daybed -> p32
// P13: Royal Amber Leather -> p33
// P14: Indus Low Lounge Table & Chair Set -> p37
// P15: Kaveri 4-Seater Dining Bench -> p40
// P16: Indus Low-Slung Lounge Chair -> p20 (hero p20)
// P17: Gomati Dining Chair -> p7
// P19: Indus 8-Seater Dining Table -> p4
// P22: Coromandel 6-Seater Dining Table -> p27
// P23: Yamuna Dining Set -> p38
// P25: Compact Bistro Set -> p28
// P26: Small Apartment Dinette -> p29
// P27: Sculptural Molded Teak Set -> p30
// P29: Nook 2-Person Set -> p34
// P30: Gomati 6-Person Grand Dining Set -> best hero 35
// P31: Son Chest of Drawers -> p9
// P32: Son Upholstered Storage Bed -> p12
// P35: Konkan Modern Poster Bed -> p19
// P36: Brahmaputra King Bed -> p22
// P38: Narmada Single Bed -> p36
// P39: Krishna Entryway Console Table -> p15
// P40: Godavari Writing Desk -> p6

console.log('Total products in prompt:', products.length);
products.forEach(p => console.log(`[P${p.num}] ${p.title} | ${p.cat}\n   PROMPT: ${p.prompt}\n`));
