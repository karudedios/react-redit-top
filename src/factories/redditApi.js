import axios from 'axios';

const context = axios("https://www.reddit.com/");

const serialize = (obj) => `?${
  Object.keys(obj).map((k) => `${k}=${encodeURIComponent(obj[k])}`).join('&')
}`;

export default({
  top({ after, limit = 25 }) {
    return context
      .get(`top${serialize({ after, limit })}`)
      .then(res => res.json());
  },
});
