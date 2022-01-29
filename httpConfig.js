import axios from 'axios';

export const APIRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
});
