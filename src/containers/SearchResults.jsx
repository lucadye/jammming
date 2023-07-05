import TrackList from './TrackList.jsx';

export default function Playlist({trackList, addToPlaylist}) {
  const buttons = [{
    function: addToPlaylist,
    className: 'addToPlaylist',
  }];
  return (
    <>
      <h2>Results</h2>
      <TrackList trackList={trackList} buttons={buttons} />
    </>
  );
}
