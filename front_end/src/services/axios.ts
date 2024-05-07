import axios from 'axios';
import { parseCookies } from 'nookies';
import dotenv from 'dotenv';
dotenv.config();

export function getAPIClient(ctx?: any) {
  const { token: token } = parseCookies(ctx);
  axios.defaults.headers.post['Access-Control-Allow-Origin'] =
    'http://localhost:3001/*';
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URI,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Max-Age': 8000,
    },
    params: {
      secretToken: process.env.NEXT_PUBLIC_SECRET_TOKEN,
    },
    timeoutErrorMessage: '60',
  });

  api.interceptors.request.use((config) => {
    return config;
  });

  if (token) {
    api.defaults.headers['authorization'] = `Bearer ${token}`;
  }

  return api;
}
