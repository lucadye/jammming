import '../styles/Alert.css';

export default function Alert({message, reset}) {
  return (<>
  	{message && (<div className='alert'>
  	  <p>{message}</p>
  	  <button onClick={reset}>
       <i className="fa-solid fa-x"></i> 
      </button>
  	</div>)}
  </>)
}
