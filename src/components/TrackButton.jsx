export default function TrackButton({id, index, children, buttonFunction}) {
  function clickHandler(e) {
    buttonFunction({id, index});
  }
  return (
    <button onClick={clickHandler}>{children}</button>
  )
}