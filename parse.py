import json
import re

html_path = '/home/violentfemme/code/randombot/component from chess.com.html'
with open(html_path, 'r') as f:
    all_text = f.read()

# Match the full li blocks
li_pattern = re.compile(r'<li[^>]*data-bot-classification="([^"]+)"[^>]*data-bot-selection-name="([^"]+)"[^>]*>(.*?)</li>', re.DOTALL)
img_pattern = re.compile(r'src="([^"]+)"')
elo_pattern = re.compile(r'data-test-element="user-tagline-rating">\s*\(\s*(\d+)\s*\)')

bots = []
seen = set()

for match in li_pattern.finditer(all_text):
    classification = match.group(1)
    name = match.group(2)
    inner_html = match.group(3)
    
    img_match = img_pattern.search(inner_html)
    if not img_match:
        continue
    image_url = img_match.group(1)
    
    if 'crown-gold.svg' in image_url:
        continue
        
    if image_url.startswith('/'):
        image_url = 'https://www.chess.com' + image_url
        
    if name in seen:
        continue
    seen.add(name)
    
    elo = 1500
    elo_match = elo_pattern.search(inner_html)
    if elo_match:
        elo = int(elo_match.group(1))
    
    group = classification.capitalize()
    
    bots.append({
        'id': name.lower(),
        'name': name,
        'elo': elo,
        'group': group,
        'imageUrl': image_url
    })

print(f"Found {len(bots)} bots")

with open('/home/violentfemme/code/randombot/src/data/bots.ts', 'w') as f:
    f.write("export interface Bot {\n  id: string;\n  name: string;\n  elo: number;\n  imageUrl: string;\n  group: string;\n}\n\n")
    f.write("export const bots: Bot[] = [\n")
    for i, bot in enumerate(bots):
        safe_name = bot['name'].replace("'", "\\'")
        f.write(f"  {{\n    id: '{bot['id']}',\n    name: '{safe_name}',\n    elo: {bot['elo']},\n    group: '{bot['group']}',\n    imageUrl: '{bot['imageUrl']}'\n  }}")
        if i < len(bots) - 1:
            f.write(",\n")
        else:
            f.write("\n")
    f.write("];\n")

