import React, { useState } from 'react';
import TrackButton from './TrackButton';

export default function Track({trackData, index, buttons, buttonsContent, namespace}) {
  const [audioPlaying, setAudioPlaying] = useState(null);
  const [playbackPromise, setPlaybackPromise] = useState(null)

  const playIcon = (
    <svg class="svg-inline--fa fa-play" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg="">
      <path fill="currentColor" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path>
    </svg>
  );
  const pauseIcon = (
    <svg className="svg-inline--fa fa-pause" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="">
      <path fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"></path>
    </svg>
  );

  if (!trackData) {
    return (<></>);
  }

  return (
    <li className='track'>

      <img className='track-cover'
        alt={`${trackData.album} cover`}
        src={trackData.cover}
      />

      <div className='track-title tooltip'>
        <h3 className='tooltip-text'>{trackData.title}</h3>
        <span className='tooltip-hidden-text'>{trackData.title}</span>
      </div>

      <div className='track-album tooltip'>
        <p className='tooltip-text'>{trackData.album}</p>
        <span className='tooltip-hidden-text'>{trackData.album}</span>
      </div>

      <div className='track-artist tooltip'>
        <p className='tooltip-text'>{trackData.artist}</p>
        <span className='tooltip-hidden-text'>{trackData.artist}</span>
      </div>

      {trackData.explicit && <div className='track-explicit tooltip'>
        <p className='tooltip-text'>Explicit</p>
        <span className='tooltip-hidden-text'>This song has been marked as explicit by Spotify.</span>
      </div>}

      <p className='track-year'>
        {trackData.year}
      </p>

      <p className='track-length'>
        {trackData.length}
      </p>
      
      <div className='button-container'>
        {buttons.map((button, i) => {
          return (
            <TrackButton
              trackData={trackData}
              key={i}
              index={index}
              buttonFunction={button.function}
              className={button.className}
            >
              {buttonsContent[i]}
            </TrackButton>
          );
        })}
        {trackData.preview ? (<div className='track-preview'>
          <button
            onClick={e => {
              e.stopPropagation();
              let audio = document.getElementById(`${namespace}:${index}`);
              if (audio.paused) {
                for (let i of document.getElementsByTagName('audio')) {
                  i.pause();
                  i.currentTime = 0;
                };
                setPlaybackPromise(audio.play());
                setAudioPlaying(true);
              } else {
                playbackPromise.then(() => {
                  audio.pause();
                  setAudioPlaying(false);
                });
              }
            }}
          >
            {audioPlaying && pauseIcon}
            {!audioPlaying && playIcon}
          </button>
          <audio id={`${namespace}:${index}`} src={trackData.preview} autoPlay={false} preload={true}></audio>
        </div>) : null}
      </div>
    </li>
  );
}
