import React from 'react';
import './SearchBar.css'


const SearchBar = ({
    search,
    setSearch,
    searchOption,
    setSearchOption, 
    sortOption, 
    setSortOption,
    linkList, 
    setLinkList
}) => {
    return <>
    <div className='search-bar'>
    <div id="search">
        <label htmlFor="keywords">Search by Term</label>
        <input 
            id="keywords" 
            type="text" 
            placeholder="Enter Link Name" 
            value={ search } 
            onChange={(event) => {
            setSearch(event.target.value);
            }} />
          <select
            className='search-select'
            value={searchOption}
            onChange={(event) =>  {
              setSearchOption(event.target.value)
            }}>    
            [
              <option value="Links">Links</option>
              <option value="Tags">Tags</option>
            ]
          </select>
      </div>
    </div>
    <div className="sortByClicks" >
        <label>Sort By Click Count:</label>
        <select
          className='sort-select'
          value={sortOption}
          onChange={(event) =>  {
            setSortOption(event.target.value)

            if (event.target.value === "Highest") {
              let sortedHighest = linkList.sort((a, b) => (a.clickcount > b.clickcount)? -1: 1);
              setLinkList(sortedHighest);
            } else {
              let sortedLowest = linkList.sort((a, b) => (a.clickcount > b.clickcount)? 1: -1);
              setLinkList(sortedLowest);
            }
          }}>    
          [
            <option value="Highest">Highest</option>
            <option value="Lowest">Lowest</option>
          ]
        </select>

      </div>
    </>
}

export default SearchBar;

