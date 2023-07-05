import TrackButton from './TrackButton';

export default function Track({trackData, index, buttons}) {
  if (!trackData) {
    return (<></>);
  }
  return (
    <li className='track'>
      <img className='track-cover'
        src={trackData.cover}
      />
      <h4 className='track-title'>
        {trackData.title}
      </h4>
      <p className='track-album'>
        {trackData.album}
      </p>
      <p className='track-artist'>
        {trackData.artist}
      </p>
      <p className='track-year'>
        {trackData.year}
      </p>
      <p className='track-length'>
        {trackData.length}
      </p>
      {
        buttons.map(button => {
          return (
            <TrackButton
              trackData={trackData}
              index={index}
              buttonFunction={button.function}
              className={button.className}
            />
          );
        })
      }
    </li>
  );
}
