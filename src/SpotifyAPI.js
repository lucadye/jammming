const Spotify = {}

Spotify.token = undefined;
Spotify.redirectUri = 'https://lucadye-jammming.netlify.app/';
Spotify.clientId = '2a9bd2c2e47e46db8d5df9773db48dad';

Spotify.randomString = length => {
  const options = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let str = '';
  for (let i = 0; i < length; i++) {
    str += options[Math.floor(Math.random() * options.length)];
  }
  return str;
}

const format = {};

format.artists = artists => {
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
  return images.length > 0 ? images[0].url : undefined;
}

Spotify.format = format;

Spotify.getToken = async () => {
  if (Spotify.token) {
    return Spotify.token;
  }

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
  if (!query) {
    return undefined;
  }
  const token = await Spotify.getToken();
  let url = 'https://api.spotify.com/v1/search';
  url += '?type=track';
  url += `&q=${query}`;
  url += `&limit=${pageSize}`;
  url += `&offset=${page}`;

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
  if (!response.tracks) {
    return [];
  }
  return response.tracks.items.map(track => {
    let album = track.album;
    return {
      id: track.id,
      title: track.name,
      length: Spotify.format.time(track.duration_ms),
      year: Spotify.format.date(album.release_date, album.release_date),
      album: album.name,
      artist: Spotify.format.artists(track.artists),
      cover: Spotify.format.images(album.images),
      explicit: track.explicit,
      preview: track.preview_url,
    };
  });
}

Spotify.getTrack = async id => {
  const token = await Spotify.getToken();
  let url = `https://api.spotify.com/v1/tracks/${id}`;

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
  let album = track.album;
  track = {
    id: track.id,
    title: track.name,
    length: Spotify.format.time(track.duration_ms),
    year: Spotify.format.date(album.release_date, album.release_date),
    album: album.name,
    artist: Spotify.format.artists(track.artists),
    explicit: track.explicit,
    preview: track.preview_url,
  };
  return track;
}

Spotify.getUserID = async () => {
  const token = await Spotify.getToken();
  let url = `https://api.spotify.com/v1/me`;

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
  return response.id;
}

Spotify.createPlaylist =  async (userID, title) => {
  const token = await Spotify.getToken();
  let url = `https://api.spotify.com/v1/users/${userID}/playlists`;

  let response = await fetch(url, {
    method: 'POST',
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
  return response;
};

Spotify.fillPlaylist =  async (trackList, id) => {
  const uris = trackList.map(track => {
    return `spotify:track:${track.id}`;
  });

  const token = await Spotify.getToken();
  let url = `https://api.spotify.com/v1/playlists/${id}/tracks`;

  let response = await fetch(url, {
    method: 'POST',
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
  return response;
};

Spotify.savePlaylist = async (trackList, title) => {
  let userID = await Spotify.getUserID();
  const response = await Spotify.createPlaylist(userID, title);
  Spotify.fillPlaylist(trackList, response.id);
  return response.external_urls.spotify;
}

export default Spotify;
