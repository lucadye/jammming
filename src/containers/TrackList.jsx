import Track from '../components/Track.jsx';

import Requests from '../requests.js';

export default function TrackList({trackList, button}) {
  if (!(trackList instanceof Array)) {
    trackList = [trackList];
  }
  const arr = [];
  trackList.forEach(trackId => {
    arr.push(Requests.getTrackById(trackId));
  });
  trackList = [];
  arr.forEach((trackData, index) => {
    trackList.push((<Track
      key={index}
      trackData={trackData}
      index={index}
      button={button}
    />));
  });
  return (<ol>
    {trackList}
  </ol>);
}
