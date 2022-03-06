import axios from 'axios';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: ENDPOINT,
  params: {},
});

export const userApi = {
  login: (email: string, password: string) =>
    api.post('/user/login/general', {
      email,
      password,
    }),
  googleLogin: () => api.get('/auth/google'),
  signup: (email: string, username: string, password: string) =>
    api.post('/user/signup/general', { email, username, password }),
};

export const bookApi = {
  list: () => api.get('/list'),
  search: (title: string) => api.get(`/book/search?title=${title}`),
};
