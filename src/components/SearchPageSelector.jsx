function SearchPageSelector({search, searchPage, setSearchPage, display}) {
  function backward (e) {
  	if (searchPage === 0) {
  		return;
  	}
  	setSearchPage(searchPage - 1);
  	search();
  }
  function forward (e) {
  	setSearchPage(searchPage + 1);
  	search();
  }
  return display ? (<div className='SearchPageSelector'>
  	<button onClick={backward}>
  		<i className="fa-solid fa-arrow-left"></i>
  	</button>
  	{searchPage + 1}
  	<button onClick={forward}>
  		<i className="fa-solid fa-arrow-right"></i>
  	</button>
  </div>) : undefined;
} export default SearchPageSelector;
