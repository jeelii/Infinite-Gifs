import React from 'react';
import { Link } from 'react-router-dom';

const SearchHistory = ({ setOffset, searchHistory }) => {
  return (
    <div className='history'>
      {searchHistory.length > 0 && (
        <>
          <h2 className='history__title'>Recent searches:</h2>
          <ul className='history__list'>
            {searchHistory.map((word, idx) => {
              return (
                <li key={idx} className='history__item'>
                  <Link to={`?search=${word}`} onClick={() => setOffset(0)}>
                    {word}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default SearchHistory;
