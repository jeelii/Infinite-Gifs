import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../App.css";
import axios from "axios";
import getParam from "./utilities/getParam";

import SearchForm from "./SearchForm";
import GifList from "./GifList";

const App = () => {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState(
    getParam("search", location.search) || "dog"
  );
  const [isLoading, setIsLoading] = useState(true);

  const performSearch = (value) => {
    setQuery(value);
    const newPath = `?search=${value}`;
    return history.push(newPath);
  };

  useEffect(() => {
    axios(
      `http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=dc6zaTOxFJmzC`
    )
      .then((response) => setData(response.data.data))
      .catch((error) => console.log("Error fetching and parsing data", error))
      .finally(() => setIsLoading(false));
  }, [query]);

  useEffect(() => {
    const locationParam = getParam("search", location.search);
    if (locationParam !== query) {
      setQuery(locationParam);
    }
  }, [location, query]);

  return (
    <>
      <div className='main-header'>
        <div className='inner'>
          <h1 className='main-title'>GifSearch for {query}</h1>
          <SearchForm onSearch={performSearch} />
        </div>
      </div>
      <div className='main-content'>
        {isLoading ? <p>Loading...</p> : <GifList data={data} />}
      </div>
    </>
  );
};

export default App;
