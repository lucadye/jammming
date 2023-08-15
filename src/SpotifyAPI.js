// Setup for the Spotify export
const Spotify = {}

Spotify.token = undefined;
Spotify.redirectUri = 'https://dyenamite-jammming.netlify.app/';
Spotify.clientId = '2a9bd2c2e47e46db8d5df9773db48dad';

// Setup for the Spotify.format export
const format = {};

format.artists = artists => {
  // Concatenate all of the artists with ', ' between each one
  let str = '';
  artists.forEach(artist => {
    if (str) {
      str += ', ';
    }
    str += artist.name;
  });
  return str;
}

format.date = date => {
  const match = date.match(/([0-9]{4})/);
  if (!match) {
    return match;
  }
  return match[0];
}

format.time = ms => {
  let s = Math.round(ms / 1000);

  let m = (s - s % 60) / 60;
  s = (s % 60) * 10 % 10 * 0.1;

  return `${m}:${s < 10 ? '0' + s : s}`;
}

format.images = images => {
  // Make sure there is at least one image, then return the first one
  return images.length > 0 ? images[0].url : undefined;
}

format.trackData = data => {
  let album = track.album; // For readability
  return {
    id: track.id,
    title: track.name,
    length: format.time(track.duration_ms),
    year: format.date(album.release_date, album.release_date),
    album: album.name,
    artist: format.artists(track.artists),
    cover: format.images(album.images),
    explicit: track.explicit,
    preview: track.preview_url,
  };
}

Spotify.format = format;

// Main Spotify methods

Spotify.getToken = async () => {
  // If the token has already been requested, return it
  if (Spotify.token) {
    return Spotify.token;
  }

  // Extract the token from the current url
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
  const error = window.location.href.match(/error=([^&]*)/);
  if (error) {
    console.log(error[1]);
  }
  if (accessTokenMatch && expiresInMatch) {
    Spotify.token = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);
    window.setTimeout(() => Spotify.token = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
    return Spotify.token;
  } else {
    let accessUrl = `https://accounts.spotify.com/authorize?client_id=${Spotify.clientId}&response_type=token`
    accessUrl += `&scope=${encodeURIComponent('playlist-modify-private playlist-modify-public')}`
    accessUrl += `&redirect_uri=${Spotify.redirectUri}`;
    window.location = accessUrl;
  }
};

Spotify.searchTracks = async (query, pageSize=4, page=0) => {
  // If no query is provided, return nothing
  if (!query) {
    return undefined;
  }

  // Setup the request url
  const token = await Spotify.getToken();
  let url = 'https://api.spotify.com/v1/search';
  url += '?type=track';
  url += `&q=${query}`;
  url += `&limit=${pageSize}`;
  url += `&offset=${page}`;

  // Make the request then convert the response to an object
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
  .then(response => {
    if (!response.ok) {
      console.log('Error:');
      console.log(response);
    }
    return response.json();
  });

  // Make sure there are results
  if (!response.tracks) {
    return [];
  }

  // Format the results then return them
  return response.tracks.items.map(t => format.trackData(t));
}

Spotify.getTrack = async id => {
  // Setup the request url
  const token = await Spotify.getToken();
  let url = `https://api.spotify.com/v1/tracks/${id}`;

  // Make the request then convert the response to an object
  let track = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
  .then(response => {
    if (!response.ok) {
      console.log('Error:');
      console.log(response);
    }
    return response.json();
  });

  // Format the track object then return it
  return format.trackData(track);
}

Spotify.getUserID = async () => {
  // Setup the request url
  const token = await Spotify.getToken();
  let url = `https://api.spotify.com/v1/me`;

  // Make the request then convert the response to an object
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
  .then(response => {
    if (!response.ok) {
      console.log('Error:');
      console.log(response);
    }
    return response.json();
  });

  // Return the user id out of the response object
  return response.id;
}

Spotify.createPlaylist =  async (userID, title) => {
  // Setup the request url
  const token = await Spotify.getToken();
  let url = `https://api.spotify.com/v1/users/${userID}/playlists`;

  // Make the request then convert the response to an object
  let response = await fetch(url, {
    method: 'POST',
    // Include all of the playlist info in the body
    body: JSON.stringify({
      "name": title ? title : 'My Playlist',
      "description": "Made using Jammming.",
      "public": false,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
  .then(response => {
    if (!response.ok) {
      console.log('Error:');
      console.log(response);
    }
    return response.json();
  });

  // Return all of the new playlist's data
  return response;
};

Spotify.fillPlaylist =  async (trackList, id) => {
  // Reformat all of the track ids provided into uris 
  const uris = trackList.map(track => {
    return `spotify:track:${track.id}`;
  });

  // Setup the request url
  const token = await Spotify.getToken();
  let url = `https://api.spotify.com/v1/playlists/${id}/tracks`;

  // Make the request then convert the response to an object
  let response = await fetch(url, {
    method: 'POST',
    // Include all of the uris in the body
    body: JSON.stringify({
      "uris": uris,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
  .then(response => {
    if (!response.ok) {
      console.log('Error:');
      console.log(response);
    }
    return response.json();
  });

  // Return the result of the request
  return response;
};

Spotify.savePlaylist = async (trackList, title) => {
  // Get the user id
  let userID = await Spotify.getUserID();
  // Create an empty playlist using the user id
  const response = await Spotify.createPlaylist(userID, title);
  // Add all of the selected tracks to the new playlist
  Spotify.fillPlaylist(trackList, response.id);
  // Return the url of the new playlist
  return response.external_urls.spotify;
}

export default Spotify;
