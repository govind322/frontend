import React, { useState } from 'react';

const StockSearch = ({ setStockSymbol }) => {
  const [input, setInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setStockSymbol(input.toUpperCase());
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter stock symbol (e.g., AAPL)"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default StockSearch;