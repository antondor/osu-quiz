import React, { useState, useEffect, useRef } from 'react';

function CustomPlayer({ url }) {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

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
    setVolume(event.target.value);
    audioRef.current.volume = event.target.value;
  };

  const handleSeek = (event) => {
    const seekTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
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
        {isPlaying ? (
          <button onClick={handlePause}>Pause</button>
        ) : (
          <button onClick={handlePlay}>Play</button>
        )}
        <input
          type="range"
          min={0}
          max={100}
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
        />
        <span>
          {new Date(currentTime * 1000).toISOString().substr(11, 8)} /{' '}
          {new Date(duration * 1000).toISOString().substr(11, 8)}
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}          
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}

export default CustomPlayer;
