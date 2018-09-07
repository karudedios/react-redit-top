import { REDDIT_TYPES } from 'actions/types';
import { Record, List } from 'immutable';

const Reddit = new Record({
  error: null,
  posts: List(),
  failed: false,
  loading: false,
  selectedPost: {},
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

  [REDDIT_TYPES.SELECT_POST]: (id, state) => {
    const predicate = ({ data }) => data.id === id;
    const affectedIndex = state.get('posts').findIndex(predicate);
    const post = state.getIn(['posts', affectedIndex]);

    const updatedState = state.setIn(['posts', affectedIndex], {
      ...post,

      data: {
        ...post.data,
        visited: true,
      },
    });

    return updatedState.merge({
      selectedPost: updatedState.get('posts').find(predicate),
    });
  },

  [REDDIT_TYPES.REMOVE_POST]: (id, state) => state.merge({
    posts: state.get('posts').filter(({ data }) => data.id !== id),
  }),
});
