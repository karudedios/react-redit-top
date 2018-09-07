import { REDDIT_TYPES } from 'actions/types';
import { Record, List } from 'immutable';

const Reddit = new Record({
  error: null,
  posts: List(),
  failed: false,
  loading: false,
}, 'Reddit');

const callOrReturn = (f) => {
  if (f instanceof Function) return f();
  return f;
};

const mapReducer = definition => (state = Reddit(), { type, payload }) => (
  type in definition
    ? definition[type](payload, callOrReturn(state))
    : callOrReturn(state)
);

export default mapReducer({
  [REDDIT_TYPES.FETCH_POSTS_START]: (_, state) => state.merge({
    error: null,
    loading: true,
    failed: false,
  }),

  [REDDIT_TYPES.FETCH_POSTS_SUCCESS]: (posts, state) => state.merge({
    loading: false,
    posts: List(posts),
  }),

  [REDDIT_TYPES.FETCH_POSTS_FAILURE]: (error, state) => state.merge({
    error,
    failed: true,
    loading: false,
  }),
});
