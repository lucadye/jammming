export default function Alert({message, reset}) {
  return (<>
  	{message && (<div className='alert'>
  	  <p>{message}</p>
  	  <button onClick={reset}></button>
  	</div>)}
  </>)
}
