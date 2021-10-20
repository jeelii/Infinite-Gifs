import React from 'react';

const Gif = React.forwardRef((props, ref) => {
  if (ref != null) console.log(ref);
  return (
    <li className='gif-wrap'>
      <img src={props.url} alt='' ref={ref} />
    </li>
  );
});

export default Gif;
