import React from 'react';
import SearchForm from './SearchForm';
import SearchHistory from './SearchHistory';
import './styles/Header.css';

const Header = ({ performSearch, searchHistory, setOffset }) => {
  return (
    <header className='header'>
      <div className='inner header__inner'>
        <SearchForm onSearch={performSearch} />
        <SearchHistory searchHistory={searchHistory} setOffset={setOffset} />
      </div>
    </header>
  );
};

export default Header;
