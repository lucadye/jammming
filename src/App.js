import React, { useState } from 'react';

import SearchBar from './containers/SearchBar.jsx';
import SearchResults from './containers/SearchResults.jsx';
import Playlist from './containers/Playlist.jsx';

import AddToSpotifyButton from './components/AddToSpotifyButton.jsx';
import Alert from './components/Alert.jsx';

function App() {
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  function addToPlaylist({id}) {
    const arr = [];
    playlistTracks.forEach(track => {
      arr.push(track);
    })
    arr.push(id);
    setPlaylistTracks(arr);
  }

  function removeFromPlaylist({index}) {
    const arr = [];
    playlistTracks.forEach(track => {
      arr.push(track);
    })
    arr.splice(index, 1);
    setPlaylistTracks(arr);
  }

  const [successfulyAdded, setSuccessfulyAdded] = useState(null);
  function displayOutcome(isSuccessful) {
    setSuccessfulyAdded(isSuccessful);
  }
  function resetAlert() {
    setSuccessfulyAdded(null);
  }

  return (
    <main className="App">
      <Alert wasSuccessful={successfulyAdded} reset={resetAlert} />
      <section id="search-area">
        <SearchBar displayResults={setSearchResults} />
        {searchResults.length > 0 && (<SearchResults trackList={searchResults} addToPlaylist={addToPlaylist} />)}
      </section>
      <section id="playlist-area">
        <Playlist trackList={playlistTracks} title={playlistTitle} setTitle={setPlaylistTitle} removeFromPlaylist={removeFromPlaylist} />
        <AddToSpotifyButton trackList={playlistTracks} title={playlistTitle} displayOutcome={displayOutcome} />
      </section>
    </main>
  );
}

export default App;
