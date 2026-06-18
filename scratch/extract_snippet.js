/**
 * Instructions:
 * 1. Open your standard web browser (Chrome, Firefox, Safari, etc)
 * 2. Go to https://www.chess.com/play/computer
 * 3. VERY IMPORTANT: Click "Choose" or "Choose a bot" so the full list of bots is visible on the screen.
 * 4. Open your browser's Developer Tools (F12, or Right Click -> Inspect)
 * 5. Go to the "Console" tab
 * 6. Paste this entire script into the console and hit Enter.
 * 7. The script will automatically click through every bot, scrape their true ELO, and copy the final JSON array directly to your clipboard!
 */

(async function extractBots() {
  console.log("Starting bot extraction... please wait! The page will rapidly open and close bot profiles.");
  const bots = [];
  
  // Find all bot elements
  const botElements = document.querySelectorAll('.bot-component, [data-bot-classification], .computer-bot-component');
  
  if (botElements.length === 0) {
    console.error("❌ No bots found! You need to click 'Choose' or 'Choose a bot' on the page first so the bot list is visible, then run the script again.");
    return;
  }

  for (const el of botElements) {
    // Scroll the bot into view to ensure it can be clicked
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    let name = el.getAttribute('data-bot-selection-name') || el.querySelector('.bot-name, .name, [data-test-element="user-tagline-username"]')?.innerText?.trim();
    let classification = el.getAttribute('data-bot-classification') || 'Unknown';
    let img = el.querySelector('img')?.src || el.querySelector('img.bot-img')?.src;
    
    if (!name || !img) continue;
    if (img.includes('crown-gold.svg')) continue;
    if (img.startsWith('/')) img = 'https://www.chess.com' + img;
    
    // Select the bot to update the introduction component
    el.click();
    
    // Wait for the introduction component to update (using 500ms to be safe!)
    await new Promise(r => setTimeout(r, 500));
    
    let elo = 1500;
    
    // Extract the rating from the selected bot introduction component
    const ratingEl = document.querySelector('[data-cy="selected-bot-introduction-rating"]');
    if (ratingEl) {
      const match = ratingEl.textContent.match(/(\d{3,4})/);
      if (match) elo = parseInt(match[1]);
    }
    
    // Wait a tiny bit before the next one just in case
    await new Promise(r => setTimeout(r, 50));

    let group = classification ? classification.charAt(0).toUpperCase() + classification.slice(1) : 'Unknown';
    if (group === 'Top_players') group = 'Top Players';
    if (group === 'Chess the musical') group = 'Musical';
    
    bots.push({
      id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: name,
      elo: elo,
      group: group,
      imageUrl: img
    });
  }
  
  const finalJson = JSON.stringify(bots, null, 2);
  const tsCode = `export interface Bot {
  id: string;
  name: string;
  elo: number;
  imageUrl: string;
  group: string;
}

export const bots: Bot[] = ${finalJson};
`;
  try {
    copy(tsCode);
    console.log(`✅ Success! ${bots.length} bots extracted. The full TypeScript code has been copied to your clipboard! You can safely select-all and paste it directly over your bots.ts file.`);
  } catch (err) {
    console.log(`✅ Success! ${bots.length} bots extracted.`);
    console.log(tsCode);
  }
})();
