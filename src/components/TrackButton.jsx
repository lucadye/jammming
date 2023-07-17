export default function TrackButton({trackData, index, children, buttonFunction, className}) {
  function clickHandler(e) {
    e.stopPropagation();
    buttonFunction({trackData, index});
  }
  return (
    <button onClick={clickHandler} className={className}>{children}</button>
  )
}