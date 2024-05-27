const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();

// Use CORS middleware
app.use(cors({
    origin: 'https://backend-9p7kzehf6-daniel-careys-projects.vercel.app' // Replace with your frontend URL if deployed
}));

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send({
        message: "Hello World from Express API backend!"
    });
});

app.get('/highscores', async (req, res) => {
    const playerName = req.query.player;
    if (!playerName) {
        return res.status(400).send({ error: 'Player name is required' });
    }

    try {
        const response = await fetch(`https://secure.runescape.com/m=hiscore/index_lite.ws?player=${playerName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.text();
        const parsedData = parseHighScores(data);
        res.send(parsedData);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

function parseHighScores(data) {
    const lines = data.split('\n');
    const highScores = lines.map(line => {
        const [rank, level, experience] = line.split(',');
        return { rank, level, experience };
    }).filter(score => score.rank !== undefined && score.rank !== "-1").slice(0, 30); // Filter out invalid scores and limit to 30
    return highScores;
}

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
