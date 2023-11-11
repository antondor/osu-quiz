import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './content.module.css';
import AudioPlayer from '../audioPlayer/audioPlayer';

function Content() {
  const [randomBeatmaps, setRandomBeatmaps] = useState([]);
  const [selectedBeatmap, setSelectedBeatmap] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [visible, setVisible] = useState(true);
  const [selected, setSelected] = useState([]);

  const [rightGuesses, setRightGuesses] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  const audioPlayerRef = useRef();

  useEffect(() => {
    if (Object.keys(randomBeatmaps).length > 0) {
      const randomIndex = Math.floor(Math.random() * randomBeatmaps.length);
      const randomBeatmap = randomBeatmaps[randomIndex];
      setSelectedBeatmap(randomBeatmap);
      setIsCorrect(null);
    }
  }, [randomBeatmaps]);

  const fetchRandomBeatmaps = () => {
    axios.get('http://localhost:3001/random-maps')
      .then(response => {
        setRandomBeatmaps(response.data);
        setVisible(false);
      })
      .catch(error => {
        console.error('Error fetching random maps:', error.message);
        setVisible(true);
      });
  };
  

  const handleButtonClick = (id) => {
    if (id === selectedBeatmap.beatmapset_id) {
      setIsCorrect(true);
      setRightGuesses(count => count + 1);
      audioPlayerRef.current.pause();
      fetchRandomBeatmaps();
    } else {
      setSelected(id);
      setWrongGuesses(count => count + 1);
      setIsCorrect(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.mainWrapper}>
        {visible ? (
          <button onClick={fetchRandomBeatmaps} className={styles.buttonNewMaps}>
            Start
          </button>
        ) : null}
        {selectedBeatmap && (
          <div className={styles.playerWrapper}>
            <div className={styles.guessCount}>
              <span>Right guesses: {rightGuesses}</span>
              <span>Wrong guesses: {wrongGuesses}</span>
            </div>
            <div className={styles.imageWithPlay}>
              <img
                src={`https://assets.ppy.sh/beatmaps/${selectedBeatmap.beatmapset_id}/covers/cover.jpg`}
                className={styles.beatmapImage}
              />
              <div className={styles.audioControls}>
                <AudioPlayer src={`https://b.ppy.sh/preview/${selectedBeatmap.beatmapset_id}.mp3`} ref={(ref) => {audioPlayerRef.current = ref}} />
              </div>
            </div>
          </div>
        )}
        <div className={styles.buttonAnswerWrapper}>
          {randomBeatmaps && randomBeatmaps.map(item => (
            <button
              className={`${styles.buttonAnswer} ${selected === item.beatmapset_id && isCorrect === false ? styles.incorrect : ''}`}
              key={item.id}
              onClick={() => handleButtonClick(item.beatmapset_id)}
            >
              {item.artist + ` - ` + item.title}
            </button>
          ))}
        </div>
        {isCorrect && <h2 className={styles.correct}>Correct!</h2>}
      </div>
    </div>
  );
}

export default Content;