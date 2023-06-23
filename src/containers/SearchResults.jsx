import TrackList from './TrackList.jsx';

export default function Playlist({trackList, addToPlaylist}) {
  const button = {
    function: addToPlaylist,
    innerHTML: '+',
  }
  return (
    <>
      <h2>Results</h2>
      <TrackList trackList={trackList} button={button} />
    </>
  );
}
