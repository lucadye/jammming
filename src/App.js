import React, { useState } from 'react';

// Helpers
import Spotify from './SpotifyAPI.js';

// Containers
import SearchResults from './containers/SearchResults.jsx';
import Playlist from './containers/Playlist.jsx';

// Components
import AddToSpotifyButton from './components/AddToSpotifyButton.jsx';
import Alert from './components/Alert.jsx';
import SearchBar from './components/SearchBar.jsx';
import SearchPageSelector from './components/SearchPageSelector.jsx';

// Styles
import './styles/App.css';

function App() {
  Spotify.getToken(); // Makes user sign in to Spotify first

  // Search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPage, setSearchPage] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  function search() {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    Spotify.searchTracks(searchQuery, 10, searchPage * 10)
    .then(results => {
      setSearchResults(results);
    });
  }

  // Playlist functionality
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);

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
    const right = index === playlistTracks.length - 2 ? [] : arr.slice(index + 2);

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

  // Used to inform the user that there playlist has been added to Spotify
  const [alertMessage, setAlertMessage] = useState(null);
  function resetAlert() {
    setAlertMessage(null);
  }

  return (
    <main className="App">
    
      <Alert message={alertMessage} reset={resetAlert} />

      <section id="search-area">
        <SearchBar search={search} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <SearchResults trackList={searchResults} addToPlaylist={addToPlaylist} />
        <SearchPageSelector search={search} searchPage={searchPage} setSearchPage={setSearchPage} display={searchResults.length} />
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
        <AddToSpotifyButton
          trackList={playlistTracks}
          title={playlistTitle}
          setAlertMessage={setAlertMessage}
          reset={()=>{
            setPlaylistTitle('');
            setPlaylistTracks([]);
            setSearchQuery('');
            setSearchResults([]);
            setSearchPage(0);
          }}
        />
      </section>

    </main>
  );
}

export default App;
