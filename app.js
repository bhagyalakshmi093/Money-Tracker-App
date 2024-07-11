const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to handle adding entries
let entries = [];
app.post('/add-entry', (req, res) => {
    const entry = req.body;
    entries.push(entry);
    res.json({ status: 'success', entries });
});

// API endpoint to get entries
app.get('/entries', (req, res) => {
    res.json(entries);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
