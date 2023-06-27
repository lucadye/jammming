async function checkToken() {
}

function generateRandomString(length) {
  const options = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let str = '';
  for (let i = 0; i < length; i++) {
    str += options[Math.floor(Math.random() * options.length)];
  }
  return str;
}

async function getToken() {
  const client_id = '2a9bd2c2e47e46db8d5df9773db48dad';
  const redirect_uri = 'http://192.168.68.80:3000/';

  const state = generateRandomString(16);
  localStorage.setItem('state', state);

  const scope = 'playlist-modify-public playlist-modify-private';

  let url = 'https://accounts.spotify.com/authorize/';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  url += '&state=' + encodeURIComponent(state);

  let response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
  })
  .then(response => {
    if (response.ok) {
      return response;
    }
    console.log(response)
  });

  console.log(response)
}

async function searchTracksByTitle(input, pageSize=8, page=0) {
  getToken();
}

function getTrackById(id) {
}

function addPlaylist(trackList, title) {
  return Math.floor(Math.random() * 2) ? true : false;
}

const Requests = {
  searchTracksByTitle,
  getTrackById,
  addPlaylist,
}

export default Requests;
