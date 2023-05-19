import React, { useState, useEffect } from 'react';
import csv from 'csvtojson';
import eos from './EOS_Chatbot_test_reduced.csv';
import SearchBar from './SearchBar';

function EosChatBot() {
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(eos);
      const csvData = await response.text();
      const jsonData = await csv().fromString(csvData);
      setData(jsonData);
    }
    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    // Effectuez la recherche dans le tableau des données CSV
    const results = data.filter((row) =>
      row.prompt.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {searchResults.map((result, index) => (
        <div key={index}>
          <a href={result.completion}>{result.completion}</a>
        </div>
      ))}
    </div>
  );
}

export default EosChatBot;
