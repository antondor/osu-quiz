import express from 'express';
import axios from 'axios';
import cors from 'cors';
import moment from 'moment';

const apiKey = process.env.API_KEY || 'c1a02998c78c5e4f7771c3976dfc9248a523218b';
const app = express();
const port = 3001;

app.use(cors());

app.get('/random-maps', async (req, res) => {
  const startDate = moment('2014-01-01');
  const endDate = moment();

  const randomDate = moment(endDate).subtract(
    Math.random() * moment(endDate).diff(startDate),
    'milliseconds'
  );

  try {
    const response = await axios.get('https://osu.ppy.sh/api/get_beatmaps', {
      params: {
        k: apiKey,
        limit: 100,
        type: 'approved',
        since: randomDate.format('YYYY-MM-DD'),
        m: 0,
        a: 0
      },
    });

    const sortBeatmaps = (response) => {
      let beatmapsArray = [];
      let index = 0;
    
      response.forEach((beatmap) => {
        if (
          beatmapsArray.length < 4 &&
          !beatmapsArray.some((item) => item.beatmapset_id === beatmap.beatmapset_id)
        ) {
          beatmapsArray.push({ id: index, beatmapset_id: beatmap.beatmapset_id, title: beatmap.title, artist: beatmap.artist });
          index++;
        }
      });
    
      return beatmapsArray;
    };

    const randomMaps = response.data;
    const sortedMaps = sortBeatmaps(randomMaps);
    res.json(sortedMaps);
  } catch (error) {
    console.error('Error fetching random maps:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
