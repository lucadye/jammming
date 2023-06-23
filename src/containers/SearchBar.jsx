import Requests from '../requests.js';

function findInput(e) {
  let siblings = e.target.parentNode.children;

  if (siblings instanceof HTMLCollection) {
    return siblings['search-input'].value;
  } else {
    return siblings.value;
  }
}

function SearchBar({displayResults}) {
  function inputHandler(e) {
    e.stopPropagation()
    const input = e.target.value;
    const results = Requests.searchTracksByTitle(input)
    displayResults(results);
  }
  return (
    <input
      id='search-input'
      type='text'
      placeholder='Search...'
      onInput={inputHandler}
    />
  );
} export default SearchBar;
