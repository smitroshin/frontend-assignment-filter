import axios from 'axios';

export const APIRequest = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
});
