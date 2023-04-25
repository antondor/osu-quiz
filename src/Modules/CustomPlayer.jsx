import React, { useState, useEffect, useRef } from 'react';
import "../styles/CustomPlayer.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeXmark, faVolumeHigh, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

function CustomPlayer({ url, setIsPlaying, isPlaying }) {
  const audioRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [volumeIcon, setVolumeIcon] = useState(faVolumeHigh);
  
    useEffect(() => {
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('durationchange', handleDurationChange);
    audioRef.current.addEventListener('ended', handleEnd);

    return () => {
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.removeEventListener('durationchange', handleDurationChange);
      audioRef.current.removeEventListener('ended', handleEnd);
    };
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleDurationChange = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setVolumeIcon(newVolume === '0' ? faVolumeXmark : faVolumeHigh);
  };

  const handleSeek = (event) => {
    const seekTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeButtonClick = () => {
    const newVolume = volume === 0 ? 1 : 0;
    setVolume(newVolume);
    setVolumeIcon(newVolume === 0 ? faVolumeXmark : faVolumeHigh);
    audioRef.current.volume = newVolume;
  };
  

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className='player-container'>
      <audio ref={audioRef} src={url} preload="metadata"></audio>
      <div className="player-controls">
          {isPlaying ? 
            (<button onClick={handlePause} className='player-button-play'><FontAwesomeIcon icon={faPause} /></button>) : 
            (<button onClick={handlePlay} className='player-button-play'><FontAwesomeIcon icon={faPlay} /></button>)
          }
          <div className='player-duration'>
            <span>
              {new Date(currentTime * 1000).toISOString().substr(14, 5)}
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={(currentTime / duration) * 100 || 0}
              onChange={handleSeek}
            />
            <span>
              {new Date(duration * 1000).toISOString().substr(14, 5)}
            </span>
          </div>
          <button
            className='player-volume-button'
            onClick={handleVolumeButtonClick}
          >
            <FontAwesomeIcon icon={volumeIcon} />
          </button>
          <input
            className='player-volume'
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
    </div>
  );
}

export default CustomPlayer;