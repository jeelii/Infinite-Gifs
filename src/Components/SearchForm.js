import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const onSearchChange = (e) => setSearchText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
    e.currentTarget.reset();
  };

  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <label className='is-hidden' htmlFor='search'>
        Search
      </label>
      <input
        type='search'
        onChange={onSearchChange}
        name='search'
        placeholder='Find gifs'
      />
      <button type='submit' id='submit' className='search-button'>
        Search
      </button>
    </form>
  );
}

export default SearchForm;
