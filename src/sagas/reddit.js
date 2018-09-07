import redditApi from 'factories/redditApi';
import { REDDIT_TYPES } from 'actions/types';
import {
  all,
  put,
  call,
  takeEvery,
} from 'redux-saga/effects';

function* fetchPosts() {
  try {
    const posts = yield call(redditApi.top);

    yield put({
      payload: posts,
      type: REDDIT_TYPES.FETCH_POSTS_SUCCESS,
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
