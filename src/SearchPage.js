import React, { useState } from 'react';
import SearchBar from './SearchBar';

const SearchPage = () => {
  //const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
     // const response = await fetch(`/search?fileName=${searchTerm}`);
      const response = await fetch(`http://localhost:3000/search?fileName=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            <a href={result} target="_blank" rel="noopener noreferrer">
              {result}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
