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

  const initialSearch = 'dog';

  useEffect(() => {
    setData([]);
  }, [query]);

  const sendQuery = useCallback(async () => {
    setLoading(true);
    setError(false);
    let cancel;
    console.log('fetching');
    axios({
      method: 'GET',
      url: 'http://api.giphy.com/v1/gifs/search',
      params: {
        q: query || initialSearch,
        offset: offset,
        limit: 24,
        api_key: 'dc6zaTOxFJmzC',
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setData((prevGifs) => {
          console.log(
            'has more:',
            res.data.pagination.total_count >
              res.data.pagination.count + res.data.pagination.offset
          );
          return [...new Set([...prevGifs, ...res.data.data])];
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
  }, [query, offset]);

  useEffect(() => {
    const locationParam = getParam('search', location.search);
    if (locationParam !== query) {
      console.log('useFetch with location params');
      sendQuery(locationParam);
    } else {
      console.log('useFetch with query params');
      sendQuery(query);
    }
  }, [location, query, sendQuery, offset]);

  return { loading, error, data, hasMore };
};

export default useFetch;
