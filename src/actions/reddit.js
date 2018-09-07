import { REDDIT_TYPES } from './types';

export const fetchPosts = () => ({
  type: REDDIT_TYPES.FETCH_POSTS_START,
});

export const removePost = id => ({
  payload: id,
  type: REDDIT_TYPES.REMOVE_POST,
});

export const selectPost = id => ({
  payload: id,
  type: REDDIT_TYPES.SELECT_POST,
});
