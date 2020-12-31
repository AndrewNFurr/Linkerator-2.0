import React from 'react';
import './SearchBar.css'


const SearchBar = ({
    search,
    setSearch,
    searchOption,
    setSearchOption
}) => {
    return <div className='search-bar'>
        <h1>Test2222</h1>
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
        </div>
    <div>
        <select
            className='search-select'
            value={searchOption}
            onChange={(event) =>  {
                setSearchOption(event.target.value)
            }
            }>    
            [
                <option value="Links">Links</option>
                <option value="Tags">Tags</option>
            ]
        </select>
    </div>
  </div>
}

export default SearchBar;

