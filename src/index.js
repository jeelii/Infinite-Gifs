import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <Router basename='/Infinite-Gifs'>
    <Route path='/:search?' component={App} />
  </Router>,
  document.getElementById('root')
);
