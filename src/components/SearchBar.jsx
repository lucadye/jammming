function SearchBar({search, searchQuery, setSearchQuery}) {
  function keyPressHandler(e) {
    e.stopPropagation();
    const input = e.target.value;
    setSearchQuery(input);
  }
  function submitHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    search();
  }
  return (<form onSubmit={submitHandler}>
    <input
      id='search-input'
      type='text'
      placeholder='Search...'
      onKeyPress={keyPressHandler}
    />
  </form>);
} export default SearchBar;
