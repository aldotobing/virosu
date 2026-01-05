import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const aboutFile = path.join(__dirname, 'public/assets/ABOUT VIROSU.txt');
const outputFile = path.join(__dirname, 'src/data/about.json');

try {
    const content = fs.readFileSync(aboutFile, 'utf-8');
    fs.writeFileSync(outputFile, JSON.stringify({ content }, null, 2));
    console.log('About content saved to src/data/about.json');
} catch (e) {
    console.error(e);
}
