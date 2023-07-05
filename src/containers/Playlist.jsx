import TrackList from './TrackList.jsx';

export default function Playlist({trackList, title, setTitle, removeFromPlaylist, moveUpInPlaylist, moveDownInPlaylist}) {
  const buttons = [
    {
      function: moveUpInPlaylist,
      className: 'moveUpInPlaylist',
    },
    {
      function: removeFromPlaylist,
      className: 'removeFromPlaylist',
    },
    {
      function: moveDownInPlaylist,
      className: 'moveDownInPlaylist',
    },
  ];
  function inputHandler(e) {
    e.stopPropagation();
    setTitle(e.target.value);
  }
  return (
    <>
      <input id='playlist-title' placeholder='Name your playlist...' onInput={inputHandler} />
      <TrackList trackList={trackList} buttons={buttons} />
    </>
  );
}
