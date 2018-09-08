import redditApi from 'factories/redditApi';
import { REDDIT_TYPES } from 'actions/types';
import {
  all,
  put,
  call,
  select,
  takeEvery,
} from 'redux-saga/effects';

function* fetchPosts() {
  try {
    const posts = yield call(redditApi.top);

    yield put({
      payload: posts,
      type: REDDIT_TYPES.FETCH_POSTS_SUCCESS,
    });

    const firstPost = yield select(state => state.getIn(['reddit', 'posts', 0]));

    yield put({
      payload: firstPost.data.id,
      type: REDDIT_TYPES.SELECT_POST,
    });
  } catch (e) {
    yield put({
      payload: e.message,
      type: REDDIT_TYPES.FETCH_POSTS_FAILURE,
    });
  }
}

export default function* redditSaga() {
  yield all([
    takeEvery(REDDIT_TYPES.FETCH_POSTS_START, fetchPosts),
  ]);
}
