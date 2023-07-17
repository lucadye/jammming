import Spotify from '../SpotifyAPI.js'

export default function AddToSpotifyButton({trackList, title, setAlertMessage, reset}) {
  async function clickHandler(e) {
  	e.stopPropagation()
  	const uri = await Spotify.savePlaylist(trackList, title)
    reset();
    const message = (<>
      <p>Added your new playlist to Spotify!</p>
      <a href={uri} target='_blank' rel='noreferrer' className='button'>View playlist</a>
    </>);
    setAlertMessage(message);
  }
  return (<>
  	{trackList.length > 0 && <button className='add-to-spotify' onClick={clickHandler}>Add to Spotify</button>}
  </>);
}