const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'source.html');
const source = fs.readFileSync(sourcePath, 'utf8');

// Extract CARDS
const cardsMatch = source.match(/const CARDS = (\[.*?\]);/s);
if (cardsMatch) {
  const cardsCode = `import { Card } from "./types";\n\nexport const CARDS: Card[] = ${cardsMatch[1]};\n`;
  fs.writeFileSync(path.join(__dirname, 'src', 'data', 'cards.ts'), cardsCode);
} else {
  console.error("Could not find CARDS");
}

// Extract PERSONAS
const personasMatch = source.match(/const PERSONAS = (\{.*?\});/s);
if (personasMatch) {
  const personasCode = `import { Persona } from "./types";\n\nexport const PERSONAS: Record<string, Persona> = ${personasMatch[1]};\n`;
  fs.writeFileSync(path.join(__dirname, 'src', 'data', 'personas.ts'), personasCode);
} else {
  console.error("Could not find PERSONAS");
}

console.log("Extraction complete.");
