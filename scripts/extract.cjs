const fs = require('fs');

const logPath = 'C:/Users/ASUS/.gemini/antigravity/brain/77673e9e-d3f5-445b-93c9-1e3db0632dc9/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(logPath, 'utf8').trim().split('\n');

for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].includes('"type":"USER_INPUT"')) {
    try {
      const data = JSON.parse(lines[i]);
      if (data.content && data.content.includes('Product Image and Description Alignment')) {
        fs.writeFileSync('scripts/prompt_alignment.md', data.content, 'utf8');
        console.log('Saved prompt to scripts/prompt_alignment.md, length:', data.content.length);
        break;
      }
    } catch (e) {
      console.error(e);
    }
  }
}
