const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Path to your clones folder
const clonesDir = path.join(__dirname, '../clones/tier1');

// Read all HTML files in the directory
const files = fs.readdirSync(clonesDir).filter(file => file.endsWith('.html'));

// Parse each file and extract meaningful content
const parsedData = files.map(file => {
  const filePath = path.join(clonesDir, file);
  const htmlContent = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(htmlContent);

  // Extract text content (e.g., headings, paragraphs)
  const textContent = $('body').text().replace(/\s+/g, ' ').trim();

  // Extract structure (e.g., tag names, class names)
  const structure = $('body').html(); // or use specific tags/classes

  return {
    file,
    textContent,
    structure,
  };
});

console.log(parsedData); // Check the parsed data