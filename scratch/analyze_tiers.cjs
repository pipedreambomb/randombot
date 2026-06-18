const fs = require('fs');
const content = fs.readFileSync('src/data/bots.ts', 'utf8');
const start = content.indexOf('[');
const bots = eval(content.substring(start));

const targetGroups = ['Beginner', 'Intermediate', 'Advanced', 'Master'];
const elos = new Set();
bots.forEach(b => {
  if (targetGroups.includes(b.group)) {
    elos.add(b.elo);
  }
});

console.log(Array.from(elos).sort((a,b) => a-b));
