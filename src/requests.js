function searchTracksByTitle(input, pageSize=8, page=1) {
  if (!input) {
    return [];
  }

  const x = [];

  for (let i = 0; i < pageSize; i++) {
    x.push(42 + (pageSize * (page - 1)) + i);
  }

  return x;
}

function getTrackById(id) {
  id = {
    id: id,
    title: 'Never Gonna Give You Up ' + id,
    album: 'Whenever You Need Somebody',
    artist: 'Rick Astley',
    year: '1987',
    length: '3:35',
  }
  return id;
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
