import fs from 'fs';
import readline from 'readline';

const transcriptPath = '/home/violentfemme/.gemini/antigravity-ide/brain/49b406e4-080b-4fef-8067-6b88c7b772df/.system_generated/logs/transcript.jsonl';

const fileStream = fs.createReadStream(transcriptPath);
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

let allUserInput = '';

for await (const line of rl) {
  const step = JSON.parse(line);
  if (step.type === 'USER_INPUT') {
    allUserInput += step.content + '\n';
  }
}

const liRegex = /<li[^>]*data-bot-classification="([^"]+)"[^>]*data-bot-selection-name="([^"]+)"[^>]*>(.*?)<\/li>/gs;

let liMatch;
const bots = [];
let eloMap = {
  'beginner': 250,
  'intermediate': 800,
  'advanced': 1400,
  'master': 2000,
  'top': 2500,
  'streamer': 1500,
  'personality': 1500,
  'engine': 3000
};

while ((liMatch = liRegex.exec(allUserInput)) !== null) {
  const classification = liMatch[1];
  const name = liMatch[2];
  const innerHtml = liMatch[3];
  
  const imgRegex = /src="([^"]+)"/;
  const imgMatch = imgRegex.exec(innerHtml);
  if (!imgMatch) continue;
  let imageUrl = imgMatch[1];
  
  // Skip default icons or empty
  if (imageUrl.includes('crown-gold.svg')) continue;

  if (imageUrl.startsWith('/')) {
    imageUrl = 'https://www.chess.com' + imageUrl;
  }

  let elo = eloMap[classification] || 1500;
  eloMap[classification] = elo + 50; 
  
  // Specific known overrides
  if (name === 'Martin') elo = 250;
  if (name === 'Nelson') elo = 1300;
  if (name === 'Antonio') elo = 1500;
  if (name === 'Isabel') elo = 1600;
  if (name === 'Wally') elo = 1800;
  if (name === 'Luke') elo = 2000;
  if (name === 'Noam') elo = 2200;

  // deduplicate by name
  if (!bots.find(b => b.name === name)) {
    let group = classification.charAt(0).toUpperCase() + classification.slice(1);
    bots.push({
      id: name.toLowerCase(),
      name: name,
      elo: elo,
      group: group,
      imageUrl: imageUrl
    });
  }
}

const fileContent = `export interface Bot {
  id: string;
  name: string;
  elo: number;
  imageUrl: string;
  group: string;
}

export const bots: Bot[] = ${JSON.stringify(bots, null, 2)};
`;

fs.writeFileSync('/home/violentfemme/code/randombot/src/data/bots.ts', fileContent);
console.log(`Extracted ${bots.length} bots and saved to src/data/bots.ts`);
