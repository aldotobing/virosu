import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, 'public/assets');
const outputFile = path.join(__dirname, 'src/data/raw_details.json');

function getDirectories(srcPath) {
    return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
}

const products = {};

try {
    const dirs = getDirectories(assetsDir);
    dirs.forEach(dir => {
        const dirPath = path.join(assetsDir, dir);
        const files = fs.readdirSync(dirPath);
        const txtFile = files.find(f => f.endsWith('.txt'));

        if (txtFile) {
            const content = fs.readFileSync(path.join(dirPath, txtFile), 'utf-8');
            products[dir] = content;
        }
    });

    fs.writeFileSync(outputFile, JSON.stringify(products, null, 2));
    console.log(`Successfully wrote to ${outputFile}`);
} catch (e) {
    console.error(e);
}
