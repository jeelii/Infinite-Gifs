import React from 'react';
import Gif from './Gif';
import NoGifs from './NoGifs';

const GifList = React.forwardRef((props, ref) => {
  const results = props.data;
  let gifs;
  if (results.length) {
    gifs = results.map((gif, idx) => {
      if (results.length === idx + 1) {
        return <Gif ref={ref} url={gif.images.fixed_height.url} key={gif.id} />;
      } else {
        return <Gif url={gif.images.fixed_height.url} key={gif.id} />;
      }
    });
  } else {
    gifs = <NoGifs />;
  }

  return <ul className='gif-list'>{gifs}</ul>;
});

export default GifList;
