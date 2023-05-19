import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    onSearch(searchTerm);
  };

  return (
    <input className='search-bar'
      type="text"
      placeholder="Search here"
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
