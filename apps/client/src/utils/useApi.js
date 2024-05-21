import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

function useApi(urls = '') {
  // const { token } = useSelector((s) => s.users);
  const { token } = true;
  const [requests, setRequests] = useState({
    baseURL: 'http://localhost:9090' || urls,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    setRequests({
      ...requests,
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return axios.create(requests); // yang dipakai ini
}

export default useApi;
