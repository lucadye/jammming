import TrackList from './TrackList.jsx';

export default function Playlist({trackList, title, setTitle, removeFromPlaylist}) {
  const button = {
    function: removeFromPlaylist,
    innerHTML: '-',
  }
  function inputHandler(e) {
    e.stopPropagation();
    setTitle(e.target.value);
  }
  return (
    <>
      <input id='playlist-title' placeholder='Name your playlist...' onInput={inputHandler} />
      <TrackList trackList={trackList} button={button} />
    </>
  );
}
