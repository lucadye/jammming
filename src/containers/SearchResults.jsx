import TrackList from './TrackList.jsx';

export default function Playlist({trackList, addToPlaylist}) {
  const buttons = [{
    function: addToPlaylist,
    className: 'addToPlaylist',
  }];
  const buttonsContent = [
    (<i className="fa-solid fa-plus"></i>)
  ];
  return (
    <>
      {trackList.length > 0 && <h2>Search Results</h2>}
      <TrackList trackList={trackList} buttons={buttons} buttonsContent={buttonsContent} namespace='SearchResults' />
    </>
  );
}
