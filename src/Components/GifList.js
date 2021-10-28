import React from 'react';
import Gif from './Gif';
import GifMessage from './GifMessage';

const GifList = React.forwardRef(
  ({ data, error, errorMessage, loading }, ref) => {
    let gifs;
    const noGifsMessage = 'Sorry, no GIFs match your search.';
    const loadingMessage = 'Loading...';
    const errorInfo = `Error! ${errorMessage}`;
    if (data.length) {
      gifs = data.map((gif, idx) => {
        if (data.length === idx + 1) {
          return (
            <Gif
              ref={ref}
              url={gif.image}
              title={gif.title}
              key={gif.id + idx}
            />
          );
        } else {
          return <Gif url={gif.image} title={gif.title} key={gif.id + idx} />;
        }
      });
    } else if (!loading && !error) {
      gifs = <GifMessage message={noGifsMessage} />;
    }

    return (
      <main className='main-content'>
        <ul className='gif-list'>{gifs}</ul>
        {loading && !error && <GifMessage message={loadingMessage} />}
        {error && <GifMessage message={errorInfo} />}
      </main>
    );
  }
);

export default GifList;
