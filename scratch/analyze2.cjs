const fs = require('fs');
const content = fs.readFileSync('src/data/bots.ts', 'utf8');
const start = content.indexOf('[');
const bots = eval(content.substring(start));
const groups = {};
bots.forEach(b => {
  if (!groups[b.group]) groups[b.group] = {min: Infinity, max: -Infinity};
  groups[b.group].min = Math.min(groups[b.group].min, b.elo);
  groups[b.group].max = Math.max(groups[b.group].max, b.elo);
});
console.log(groups);
const maxMaster = groups['Master'] ? groups['Master'].max : 0;
const hasHigher = bots.some(b => b.elo > maxMaster);
console.log("Max Master:", maxMaster, "Has Higher:", hasHigher);
