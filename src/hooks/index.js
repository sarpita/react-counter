import {useEffect, useReducer, useRef,useCallback, useState} from 'react';
import Axios from 'axios';

const useFetch = (url) => {
  const cache = useRef({});
  const initialState = {
    loading: null,
    error: null,
    response: null,
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'FETCHING':
        return {...initialState, loading: true};
      case 'FETCHED':
        return {...initialState, loading: false, response: action.payload};
      case 'FETCH_ERROR':
        return {...initialState, loading: false, error: action.payload};
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;
    const fetchData = async () => {
      dispatch({type: 'FETCHING'});
      if (cache.current[url]) {
        const data = cache.current[url];
        dispatch({type: 'FETCHED', payload: data});
      } else {
        try {
          const response = await fetch(url);
          const data = await response.json();
          cache.current[url] = data;
          if (cancelRequest) return;
          dispatch({type: 'FETCHED', payload: data});
        } catch (error) {
          if (cancelRequest) return;
          dispatch({type: 'FETCH_ERROR', payload: error.message});
        }
      }
    };
    fetchData();
    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);
  return state;
}

const initialState = {
  response: {},
  error: null,
  loading: false,
};

const useUpdate = (method,{ url, body ,config }) => {
  const hasUnmounted = useRef(false);
  useEffect(() => () => { hasUnmounted.current = true; }, []);

  const [{ response, error, loading }, setter] = useState(initialState);

  const setData = useCallback((newData) => {
    if (!hasUnmounted.current) {
      setter(prevState => ({ ...prevState, ...newData }));
    }
  }, []);

  const updateData = useCallback(async () => {
    setData({ error: null, loading: true });
    try {
      const result = await Axios[method](url, body, { ...config });
      setData({ response: result.data, error: null, loading: false });
      return { result: result.data, error: null };
    } catch (err) {
      setData({ error: err, loading: false });
      return { error: err };
    }
  }, [url]);

  return [updateData, response, loading, error];
};

export {useFetch, useUpdate};