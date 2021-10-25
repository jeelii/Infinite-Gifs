import React from 'react';
import Gif from './Gif';
import NoGifs from './NoGifs';

const GifList = React.forwardRef(({ data }, ref) => {
  let gifs;
  if (data.length) {
    gifs = data.map((gif, idx) => {
      if (data.length === idx + 1) {
        return (
          <Gif ref={ref} url={gif.image} title={gif.title} key={gif.id + idx} />
        );
      } else {
        return <Gif url={gif.image} title={gif.title} key={gif.id + idx} />;
      }
    });
  } else {
    gifs = <NoGifs />;
  }

  return <ul className='gif-list'>{gifs}</ul>;
});

export default GifList;
