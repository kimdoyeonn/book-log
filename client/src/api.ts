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
};
