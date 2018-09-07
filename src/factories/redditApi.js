/* eslint-disable */
import axios from 'axios';
import _response from './top.js';

const context = axios.create({
  baseURL: 'https://www.reddit.com/',
});

const serialize = obj => `?${
  Object.keys(obj).filter(k => obj[k]).map(k => `${k}=${encodeURIComponent(obj[k])}`).join('&')
}`;

export default ({
  top({ limit = 25 } = {}) {
    return new Promise(resolve => {
      const { children } = _response.data;
      resolve(children.slice(0, limit));
    });
  },
});
