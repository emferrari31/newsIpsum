const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images, etc.) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Function to shuffle an array (for generating random Ipsum)
const shuffle = (jsonData) => {
    for (let i = jsonData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [jsonData[i], jsonData[j]] = [jsonData[j], jsonData[i]];
    }
    return jsonData;
};

// Home route (renders index page with randomized "ipsum")
app.get('/', (req, res) => {
    const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    let sentences = [];

    // Generate the requested number of paragraphs
    for (let i = 0; i < req.query.numberOfParagraphs; i++) {
        sentences.push(shuffle(jsonData.ipsum).slice(0, 5).join(', '));
    }

    res.render('index', { data: sentences, query: req.query });
});

// Start the server on port 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
