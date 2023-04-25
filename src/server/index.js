async function startServer() {
    const express = require('express');
    const cors = require('cors');
    const app = express();
    const apiKey = process.env.API_KEY;
    app.use(cors());
  
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
  
    const randomDate = new Date(Date.now() - getRandomInt(9) * 365 * 24 * 60 * 60 * 1000);
  
    app.get('/beatmaps', async (req, res) => {
      try {
        const fetch = await import('node-fetch');
        const url = `https://osu.ppy.sh/api/get_beatmaps?k=${apiKey}&since=${randomDate.toISOString().replace('T', ' ')}`;
        const response = await fetch.default(url);
        const data = await response.json();
        const randomBeatmaps = getRandomBeatmaps(data, 4);
  
        res.send(JSON.stringify(randomBeatmaps));
      } catch (error) {
        console.error(error);
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.status(500).send('Error retrieving beatmaps');
      }
    });
  
    app.get('/images/:beatmapsetId', async (req, res) => {
      try {
        const fetch = await import('node-fetch');
        const url = `https://assets.ppy.sh/beatmaps/${req.params.beatmapsetId}/covers/cover.jpg`;
        const response = await fetch.default(url);
        const buffer = await response.buffer();
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(buffer);
      } catch (error) {
        console.log(error);
        res.status(500).send('Error retrieving image');
      }
    });
  
    function getRandomBeatmaps(beatmaps, count) {
      const shuffled = beatmaps.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
  
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
  
  startServer();
  