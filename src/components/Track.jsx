import TrackButton from './TrackButton';

function trimmer(input, length) {
  if (input.length > length) {
    let str = "";
    for (let i = 0; i < length-2; i++) {
      str += input[i];
    }
    str += "..."
    return str;
  }
  return input;
}

export default function Track({trackData, index, buttons, buttonsContent}) {
  if (!trackData) {
    return (<></>);
  }
  return (
    <li className='track'>

      <img className='track-cover'
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
      
      <div className='button-container'>{
        buttons.map((button, i) => {
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
        })
      }</div>
    </li>
  );
}
