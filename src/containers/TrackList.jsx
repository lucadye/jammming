import Track from '../components/Track.jsx';
import '../styles/Track.css'

export default function TrackList({trackList, buttons, buttonsContent, namespace}) {
  if (!(trackList instanceof Array)) {
    trackList = [trackList];
  }

  trackList = trackList.map((trackData, index) => {
    return (<Track
      key={index}
      trackData={trackData}
      index={index}
      buttons={buttons}
      buttonsContent={buttonsContent}
      namespace={namespace}
    />);
  });

  return (<ol className='track-list'>
    {trackList}
  </ol>);
}
