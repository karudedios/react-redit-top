import { REDDIT_TYPES } from './types';

export const fetchPosts = () => ({
  type: REDDIT_TYPES.FETCH_POSTS_START,
});

export const nextPage = () => ({
  type: '',
});
