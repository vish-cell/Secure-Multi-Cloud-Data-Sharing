const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors');

// Enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to save the shell script to the secrets directory
app.post('/save-credentials', (req, res) => {
    const { scriptContent } = req.body;
    const filePath = path.join(__dirname, '..', 'secrets', 'console_credentials.sh'); // Adjust path

    // Ensure the 'secrets' directory exists
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    // Write the content to the file
    fs.writeFile(filePath, scriptContent, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save the shell script' });
        }
        res.json({ message: 'Shell script saved successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
