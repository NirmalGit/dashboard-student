const fs = require('fs');
const s = fs.readFileSync('index.tsx', 'utf8');
const startIdx = s.indexOf('return (');
const endIdx = s.indexOf(');\n};', startIdx);
const block = s.slice(startIdx, endIdx);
const lines = block.split('\n');
let net = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const opens = (line.match(/<div(\s|>)/g) || []).length;
  const closes = (line.match(/<\/div>/g) || []).length;
  net += opens - closes;
  if (net !== 0) {
    // log non-zero net for debugging
    console.log('line', i+1, 'net', net, 'lineStr:', line.trim());
  }
}
console.log('final net', net);
