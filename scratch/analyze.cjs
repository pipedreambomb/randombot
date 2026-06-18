const fs = require('fs');
const content = fs.readFileSync('src/data/bots.ts', 'utf8');
const match = content.match(/export const bots: Bot\[\] = (\[[\s\S]+\]);/);
if (match) {
  const bots = eval(match[1]);
  const groups = {};
  bots.forEach(b => {
    if (!groups[b.group]) groups[b.group] = {min: Infinity, max: -Infinity, bots: 0};
    groups[b.group].min = Math.min(groups[b.group].min, b.elo);
    groups[b.group].max = Math.max(groups[b.group].max, b.elo);
    groups[b.group].bots++;
  });
  console.log(groups);
  
  const allElos = [...new Set(bots.map(b => b.elo))].sort((a,b) => a-b);
  console.log("Unique ELOs:", allElos);
}
