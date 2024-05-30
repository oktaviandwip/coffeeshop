import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const apiURL = import.meta.env.VITE_BASE_URL_API || 'http://localhost:9090';
function useApi(urls = '') {
  const { token } = useSelector((s) => s.users);

  const [requests, setRequests] = useState({
    baseURL: apiURL || urls,
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
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  return axios.create(requests); // yang dipakai ini
}

export default useApi;
