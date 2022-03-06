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
  write: (bookInfo: any, review: any) =>
    api.post('/book/new', {
      ...bookInfo,
      published_at: bookInfo.datetime,
      author: bookInfo.authors[0],
      reviewContents: review.content,
      page: review.page,
    }),
  edit: (review_id: any, review: any) =>
    api.patch('/book/edit', {
      review_id,
      reviewContents: review.content,
      page: review.page,
    }),
};
