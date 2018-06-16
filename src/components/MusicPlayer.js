import React from 'react';

const MusicPlayer = (props) => {
  return (
    <div className="music-player">
      <button 
        className="button--link button__play" 
        onClick={props.handlePlayMusic}
      >Play music!</button>
    </div>
  );
};

export default MusicPlayer;