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

  function addToPlaylist({trackData}) {
    const arr = [];
    playlistTracks.forEach(track => {
      arr.push(track);
    })
    arr.push(trackData);
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

  function moveUpInPlaylist({index}) {
    if (index === 0) {
      return;
    }

    let arr = [];
    playlistTracks.forEach(track => {
      arr.push(track);
    })

    const left = index === 1 ? [] : arr.slice(0, index - 1);
    const right = index === playlistTracks.length - 1 ? [] : arr.slice(index + 1);

    let tracks = [];
    const x = i => {
      tracks.push(i);
    };

    left.forEach(x);
    tracks.push(arr[index]);
    tracks.push(arr[index - 1]);
    right.forEach(x);

    setPlaylistTracks(tracks);
  }

  function moveDownInPlaylist({index}) {
    if (index === playlistTracks.length - 1) {
      return;
    }

    let arr = [];
    playlistTracks.forEach(track => {
      arr.push(track);
    })

    const left = index === 0 ? [] : arr.slice(0, index);
    const right = index === playlistTracks.length - 2 ? [] : arr.slice(index + 1);

    let tracks = [];
    const x = i => {
      tracks.push(i);
    };
    
    left.forEach(x);
    tracks.push(arr[index + 1]);
    tracks.push(arr[index]);
    right.forEach(x);

    setPlaylistTracks(tracks);
  }

  const [alertMessage, setAlertMessage] = useState(null);
  function resetAlert() {
    setAlertMessage(null);
  }

  return (
    <main className="App">
      <Alert message={alertMessage} reset={resetAlert} />
      <section id="search-area">
        <SearchBar displayResults={setSearchResults} />
        <SearchResults trackList={searchResults} addToPlaylist={addToPlaylist} />
      </section>
      <section id="playlist-area">
        <Playlist
          trackList={playlistTracks}
          title={playlistTitle}
          setTitle={setPlaylistTitle}
          removeFromPlaylist={removeFromPlaylist}
          moveUpInPlaylist={moveUpInPlaylist}
          moveDownInPlaylist={moveDownInPlaylist}
        />
        <AddToSpotifyButton trackList={playlistTracks} title={playlistTitle} setAlertMessage={setAlertMessage} />
      </section>
    </main>
  );
}

export default App;
