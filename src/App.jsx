import { useState, useEffect } from 'react';
import './App.css';

const queryURL = "https://backend-9p7kzehf6-daniel-careys-projects.vercel.app/highscores?player=";

function App() {
    const [message, setMessage] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [highScores, setHighScores] = useState(null);

    const skillNames = [
        "Overall", "Attack", "Defence", "Strength", "Constitution", "Ranged", "Prayer", "Magic", "Cooking",
        "Woodcutting", "Fletching", "Fishing", "Firemaking", "Crafting", "Smithing", "Mining", "Herblore",
        "Agility", "Thieving", "Slayer", "Farming", "Runecrafting", "Hunter", "Construction", "Summoning",
        "Dungeoneering", "Divination", "Invention", "Archaeology", "Necromancy"
    ];

    useEffect(() => {
        fetch('https://backend-9p7kzehf6-daniel-careys-projects.vercel.app/')
            .then(res => res.json())
            .then(data => setMessage(data.message))
            .catch(err => console.error('Error:', err));
    }, []);

    const handleInputChange = (e) => {
        setPlayerName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${queryURL}${playerName}`)
            .then(res => res.json())
            .then(data => setHighScores(data))
            .catch(err => console.error('Error:', err));
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>{message}</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={playerName}
                        onChange={handleInputChange}
                        placeholder="Enter player name"
                    />
                    <button type="submit">Get High Scores</button>
                </form>
                {highScores && (
                    <div>
                        <h2>High Scores for {playerName}</h2>
                        {skillNames.slice(0, highScores.length).map((skill, index) => (
                            <div key={index}>
                                <h3>{skill}</h3>
                                <div>
                                    Rank: {highScores[index].rank} Level: {highScores[index].level} Experience: {highScores[index].experience}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
