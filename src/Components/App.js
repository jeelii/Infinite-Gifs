import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import './styles/App.css';

import Header from './Header';
import GifList from './GifList';
import NoGifs from './NoGifs';

import useFetch from './useFetch';

const App = () => {
  const history = useHistory();

  const oldSearches = localStorage.getItem('gifSearches');

  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [searchHistory, setSearchHistory] = useState(
    oldSearches ? oldSearches.split(',') : []
  );

  const { data, hasMore, loading, error, errorMessage } = useFetch(
    query,
    offset
  );

  const observer = useRef();
  const lastGifRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + 50);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    localStorage.setItem('gifSearches', searchHistory);
  }, [searchHistory]);

  const performSearch = (value) => {
    const trimmedSearch = value.trim();
    if (!trimmedSearch) return;
    setQuery(trimmedSearch);
    setOffset(0);
    setSearchHistory((prevHistory) => {
      return [...new Set([trimmedSearch, ...prevHistory.slice(0, 5)])];
    });
    history.push(trimmedSearch);
    return;
  };

  return (
    <>
      <Header
        performSearch={performSearch}
        searchHistory={searchHistory}
        setOffset={setOffset}
      />
      <main className='main-content'>
        <GifList data={data} error={error} loading={loading} ref={lastGifRef} />
        {loading && !error && <NoGifs message='Loading...' />}
        {error && <NoGifs message={`Error! ${errorMessage}`} />}
      </main>
    </>
  );
};

export default App;
