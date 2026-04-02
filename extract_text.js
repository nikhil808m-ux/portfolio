const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src/app/components/case-studies');
const outputFilePath = path.join(__dirname, 'CASE_STUDY_REFERENCE.md');

let output = '# Case Study Content Reference\n\nThis file contains the text content extracted from the case studies to provide context for AI assistants.\n\n';

function extractTextFromTSX(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Simple regex to grab text between > and <
    // And also generic string literals that might be long
    const tagTextRegex = />([^<]+)</g;
    let match;
    const texts = [];

    while ((match = tagTextRegex.exec(content)) !== null) {
        const text = match[1].trim();
        // Filter out short or code-like strings
        if (text.length > 15 && !text.includes('{') && !text.includes('}')) {
            texts.push(text);
        }
    }

    return texts;
}

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function processCaseStudy(name, folderPath) {
    if (!fs.existsSync(folderPath)) return;

    output += `## ${name} Case Study\n\n`;

    walkDir(folderPath, (filePath) => {
        if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
            const texts = extractTextFromTSX(filePath);
            if (texts.length > 0) {
                const relativePath = path.relative(__dirname, filePath);
                output += `### ${relativePath}\n`;
                texts.forEach(t => {
                    output += `- ${t.replace(/\n/g, ' ')}\n`;
                });
                output += '\n';
            }
        }
    });
}

processCaseStudy('Local AI', path.join(srcDir, 'localai-manager'));
processCaseStudy('UPI Balance', path.join(srcDir, 'upi-balance'));

fs.writeFileSync(outputFilePath, output);
console.log('Reference file created at ' + outputFilePath);
