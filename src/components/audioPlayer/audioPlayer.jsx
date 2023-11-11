import React from 'react';
import styles from './audioPlayer.module.css';
import PlayIco from '../../assets/svg/play.svg';
import PauseIco from '../../assets/svg/pause.svg';


class AudioPlayer extends React.Component {
  state = {
    playing: false,
    currentTime: 0
  }

  audioRef = React.createRef()

  pause = () => {
    this.audioRef.current.pause();
    this.setState({ playing: false });
  }

  handleEnded = () => {
    this.setState({ playing: false });
  }

  handlePlay = () => {
    this.audioRef.current.play()
    this.setState({ playing: true })
  }

  handlePause = () => {
    this.audioRef.current.pause()
    this.setState({ playing: false })
  }

  handleVolumeChange = (e) => {
    this.setState({ volume: e.target.value });
    this.audioRef.current.volume = e.target.value;
  }

  render() {
    const { playing, volume } = this.state;
    const { src } = this.props;
  
    return (
      <div className={styles.audioWrapper}>
        <audio
          ref={this.audioRef}
          src={src}
          onTimeUpdate={this.handleTimeUpdate}
          onEnded={this.handleEnded}
        />
        <button className={styles.playButton} onClick={playing ? this.handlePause : this.handlePlay}>
          <img className={styles.playImg} src={playing ? PauseIco : PlayIco} alt="Play" />
        </button>
        {/* <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={this.handleVolumeChange}
          className={styles.volume}
        /> */}
      </div>
    );
  }
  
}

export default AudioPlayer;