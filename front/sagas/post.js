import shortId from 'shortid';
import { all, fork, put, take, delay, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS } from '../types/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../types/user';

function addPostAPI(data) {
  return axios.post('/api/posts', data);
}

function* addPost(action) {
  try {
    console.log('saga add post');
    // const result = yield call(addPostAPI);
    yield delay(1000);
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    // saga는 동시에 여러 액션을 dispatch할 수 있기 때문에 
    // 아래와 같이 연속적으로 action을 dispatch한다. 
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete('/api/posts', data);
}

function* removePost(action) {
  try {
    console.log('saga remove post');
    // const result = yield call(removePostAPI);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      // action.data에는 삭제한 포스팅의 id 정보가 들어있다.
      data: action.data,
    });
    // saga는 동시에 여러 액션을 dispatch할 수 있기 때문에 
    // 아래와 같이 연속적으로 action을 dispatch한다. 
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
  ]);
}
