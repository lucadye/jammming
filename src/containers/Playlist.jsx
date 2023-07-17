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
  const buttonsContent = [
    (<i className="fa-solid fa-arrow-up"></i>),
    (<i className="fa-solid fa-minus"></i>),
    (<i className="fa-solid fa-arrow-down"></i>)
  ];

  function inputHandler(e) {
    e.stopPropagation();
    setTitle(e.target.value);
  }

  return (
    <>
      <input id='playlist-title' type='text' placeholder='Name your playlist...' onInput={inputHandler} />
      {trackList.length > 0 && <h2>Selected Songs</h2>}
      <TrackList trackList={trackList} buttons={buttons} buttonsContent={buttonsContent} namespace='playlist' />
    </>
  );
}
