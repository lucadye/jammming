import TrackButton from './TrackButton';

export default function Track({trackData, index, button}) {
  return (
    <li className='track'>
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
      <TrackButton id={trackData.id} index={index} buttonFunction={button.function}>{button.innerHTML}</TrackButton>
    </li>
  );
}
