import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function Beatmaps() {
  const [beatmaps, setBeatmaps] = useState([]);
  const [current, setCurrent] = useState(null);

  const fetchBeatmaps = useCallback(() => {
    try {
      axios.get("https://osu-music-quiz.herokuapp.com/beatmaps")
      .then(response => {
        const parsedData = response.data;
        setBeatmaps(parsedData);
      })}
      catch (error) {
        console.error(error);
      }
  }, []);

  useEffect(() => {
    axios
      .get('https://osu-music-quiz.herokuapp.com/beatmaps')
      .then(response => {
        const parsedData = response.data;
        setBeatmaps(parsedData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  

  useEffect(() => {
    if (beatmaps.length > 0) {
      const randomIndex = Math.floor(Math.random() * beatmaps.length);
      setCurrent(beatmaps[randomIndex]);
    }
  }, [beatmaps]);

  const isCorrect = (beatmap) => {
    try {
      if (current && current.beatmapset_id === beatmap.beatmapset_id) {
        alert("Correct!");
        fetchBeatmaps();
      } else {
        alert(`Wrong :( Correct beatmap is ${current.artist} - ${current.title}`);
        fetchBeatmaps();
      }
    } catch (error) {
      alert(`Error loading audio. ${error.message}`);
      fetchBeatmaps();
    }
  };

  const handleAudioError = () => {
    alert('Error playing audio. Fetching new beatmaps...');
    fetchBeatmaps();
  }
 
  return (
    <div className="app-container" style={{
      backgroundImage: `url(https://assets.ppy.sh/beatmaps/${current ? current.beatmapset_id : ''}/covers/cover@2x.jpg)`,
      backgroundRepeat: 'no-repeat'
      }}>
      <div className='beatmaps-container'>
        {current && (
          <audio
            src={`https://b.ppy.sh/preview/${current.beatmapset_id}.mp3`}
            controls
            onError={handleAudioError}
          />
        )}
        <div className='button-container'>
          {beatmaps.map((beatmap, index) => (
              <button key={index} onClick={() => isCorrect(beatmap)}>
                {beatmap.artist} - {beatmap.title}
              </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Beatmaps;
