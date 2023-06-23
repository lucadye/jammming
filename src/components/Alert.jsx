export default function Alert({wasSuccessful, reset}) {
  let message = ''
  if (wasSuccessful !== null) {
  	if (wasSuccessful) {
  	  message = 'Successfuly added your playlist to Spotify!';
  	} else {
  	  message = 'Failed to add your playlist to Spotify!';
  	}
  }
  return (<>
  	{message && (<div className='alert'>
  	  <p>{message}</p>
  	  <button onClick={reset}>X</button>
  	</div>)}
  </>)
}
