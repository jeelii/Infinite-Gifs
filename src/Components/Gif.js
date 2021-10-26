import React from 'react';

const Gif = React.forwardRef(({ url, title }, ref) => {
  return (
    <li className='gif-wrap'>
      <img src={url} alt={title} ref={ref} />
    </li>
  );
});

export default Gif;
