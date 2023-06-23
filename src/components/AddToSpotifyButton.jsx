import Requests from '../requests.js'

export default function AddToSpotifyButton({trackList, title, displayOutcome}) {
  function clickHandler(e) {
  	e.stopPropagation()
  	const outcome = Requests.addPlaylist(trackList, title)
    displayOutcome(outcome);
  }
  return (
  	<button onClick={clickHandler}>Add to Spotify</button>
  );
}