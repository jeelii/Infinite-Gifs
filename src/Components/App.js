import React, { useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';

import SearchForm from './SearchForm';
import GifList from './GifList';
import useFetch from './useFetch';

const App = () => {
  const history = useHistory();

  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);

  const { data, hasMore, loading, error } = useFetch(query, offset);

  const observer = useRef();
  const lastGifRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + 24);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const performSearch = (value) => {
    setQuery(value);
    setOffset(0);
    const newPath = `?search=${value}`;
    return history.push(newPath);
  };

  return (
    <>
      <header className='main-header'>
        <div className='inner'>
          <SearchForm onSearch={performSearch} />
        </div>
      </header>
      <div className='main-content'>
        <GifList data={data} ref={lastGifRef} />
        <div>{loading && 'Loading...'}</div>
        <div>{error && 'Error'}</div>
      </div>
    </>
  );
};

export default App;
