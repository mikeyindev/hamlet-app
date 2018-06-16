import React from 'react';

const MusicPlayer = (props) => {
  const buttonText = props.isPlaying ? 'Play music!' : 'Pause music';

  return (
    <div className="music-player">
      <button 
        className="button--link button__play" 
        onClick={props.handlePlayMusic}
      >{buttonText}</button>
    </div>
  );
};

export default MusicPlayer;