const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

// Path to your EJS template file
const templatePath = path.join(__dirname, 'views', 'index.ejs');

// Default data for the template (you can replace this with dynamic content later)
const queryData = {
    numberOfParagraphs: 1  // Or any other data needed for your template
};

// Sample data for the "data" variable (for now, we can use some placeholder text)
const data = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
];

// Render the EJS template with data
ejs.renderFile(templatePath, { query: queryData, data: data }, (err, str) => {
    if (err) {
        console.error('Error rendering EJS:', err);
        return;
    }

    // Write the rendered HTML to a file
    const outputPath = path.join(__dirname, 'index.html');
    fs.writeFileSync(outputPath, str);
    console.log('index.html has been generated.');
});
