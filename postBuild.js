import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'dist');

// Function to recursively update import statements
function updateImports(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = content.replace(/from\s+["']([^"']+)["']/g, (match, p1) => {
        return match.includes('.js') ? match : `from "${p1}.js"`;
    });
    if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Updated imports in: ${filePath}`);
    }
}

// Function to copy index.html to the dist folder and update script path
function copyHtml() {
    const sourcePath = path.join(__dirname, 'index.html'); // Adjusted path
    const destPath = path.join(dir, 'index.html');
    fs.copyFileSync(sourcePath, destPath);
    console.log('Copied index.html to dist folder');

    // Update the script path in the copied HTML
    let htmlContent = fs.readFileSync(destPath, 'utf8');
    htmlContent = htmlContent.replace(/<script src="dist\/index.js"/, '<script src="index.js"');
    fs.writeFileSync(destPath, htmlContent, 'utf8');
}

// Function to copy styles.css to the dist folder
function copyStyles() {
    const sourcePath = path.join(__dirname, 'styles.css'); // Adjusted path
    const destPath = path.join(dir, 'styles.css');
    fs.copyFileSync(sourcePath, destPath);
    console.log('Copied styles.css to dist folder');
}

// Recursively read all files in a directory
function readDirRecursive(directory) {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            readDirRecursive(filePath); // Recurse into subdirectory
        } else if (file.endsWith('.js')) {
            updateImports(filePath);
        }
    });
}

// Start processing
copyHtml(); // Copy index.html first
copyStyles(); // Copy styles.css next
readDirRecursive(dir); // Then update imports in .js files