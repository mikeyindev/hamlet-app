import React from 'react';

const MusicPlayer = (props) => {
  const buttonText = props.isPlaying ? 'Pause music' : 'Play music!';

  return <div className="music-player">
      <audio id="music" src="/music/Jahzzar_-_05_-_Siesta.mp3" />
      <button className="button__link button--menu button--play" onClick={props.handlePlayMusic}>
        {buttonText}
      </button>
    </div>;
};

export default MusicPlayer;