import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    onSearch(searchTerm);
  };

  return (
    <input
      type="text"
      placeholder="Search here"
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
