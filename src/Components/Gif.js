import React from 'react';

const Gif = React.forwardRef((props, ref) => {
  return (
    <li className='gif-wrap'>
      <img src={props.url} alt={props.title} ref={ref} />
    </li>
  );
});

export default Gif;
