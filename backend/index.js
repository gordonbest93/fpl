const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/league/:leagueId', async (req, res) => {
  const leagueId = req.params.leagueId;
  const url = `https://fantasy.premierleague.com/api/leagues-classic/${leagueId}/standings/`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch league data.' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
