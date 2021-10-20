import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import getParam from './utilities/getParam';

const useFetch = (query, offset) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState([]);

  const location = useLocation();

  const sendQuery = useCallback(async () => {
    setLoading(true);
    setError(false);
    let cancel;
    const locationParam = getParam('search', location.search);
    const searchTerm = locationParam ? locationParam : 'doggo';
    if (offset === 0) setData([]);
    axios({
      method: 'GET',
      url: 'http://api.giphy.com/v1/gifs/search',
      params: {
        q: searchTerm,
        offset: offset,
        limit: 24,
        api_key: `${process.env.REACT_APP_API_KEY}`,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setData((prevGifs) => {
          return [
            ...new Set([
              ...prevGifs,
              ...res.data.data.map((gif) => {
                return {
                  id: gif.id,
                  image: gif.images.fixed_height.url,
                  title: gif.title,
                };
              }),
            ]),
          ];
        });
        setHasMore(
          res.data.pagination.total_count >
            res.data.pagination.count + res.data.pagination.offset
        );
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        console.log(e);
        setError(true);
      });
    return () => cancel();
  }, [location, offset]);

  useEffect(() => {
    sendQuery();
  }, [location, query, sendQuery, offset]);

  return { loading, error, data, hasMore };
};

export default useFetch;
