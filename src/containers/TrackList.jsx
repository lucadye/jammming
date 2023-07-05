import Track from '../components/Track.jsx';

export default function TrackList({trackList, buttons}) {
  if (!(trackList instanceof Array)) {
    trackList = [trackList];
  }
  trackList = trackList.map((trackData, index) => {
    return (<Track
      key={index}
      trackData={trackData}
      index={index}
      buttons={buttons}
    />);
  });
  return (<ol>
    {trackList}
  </ol>);
}
