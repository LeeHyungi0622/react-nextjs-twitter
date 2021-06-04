import { all, fork, call, put, delay, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { FOLLOW_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS } from '../types/user';

// generator(*)
// 패턴대로 코딩을 하기 때문에 익숙해지면 된다.

// 제너레이터 함수가 아닌 일반함수이다.
function logInAPI(data) {
  return axios.post('/user/login', data);
}

function* login(action) {
  try {
    console.log('saga login');
    // result에 결과값이 담긴 상태로 다음 액션이 실행되야 하기 때문에 반드시 call로 작성해준다.
    const result = yield call(logInAPI, action.data);
    // 서버가 아직 구현되지 않은 경우, delay를 사용해서 setTimeout과 같이 시간을 지연시켜준다.
    // yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      // 성공 결과는 result.data에 담겨있다.
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOG_IN_FAILURE,
      // 실패 결과는 err.response.data에 담겨있다.
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/logout');
}

function* logout(action) {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

// 비동기 처리 함수는 제너레이터 함수가 아니다.
function signUpAPI(data) {
  // email, password, nickname object를 같이 넘겨준다.
  return axios.post('/user', data);
}

function* signup(action) {
  try {
    // action.data를 함께 넘겨준다.
    // yield delay(1000);
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    // 이 시점에서 에러를 던지면 아래 catch문으로 넘어간다.
    // throw new Error('')
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    // error가 발생하는 경우, server로부터 받은 에러 메시지를 error를 통해 전달한다.
    // reducer에서 error 상태값에 초기화를 시켜준다.
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}
// 비동기 처리 함수는 제너레이터 함수가 아니다.
function followAPI() {
  return axios.post('/follow');
}

function* follow(action) {
  try {
    // const result = yield call(followAPI);
    yield delay(1000);
    // 이 시점에서 에러를 던지면 아래 catch문으로 넘어간다.
    // throw new Error('')
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}
// 비동기 처리 함수는 제너레이터 함수가 아니다.
function unfollowAPI() {
  return axios.post('/unfollow');
}

function* unfollow(action) {
  try {
    // const result = yield call(unfollowAPI);
    yield delay(1000);
    // 이 시점에서 에러를 던지면 아래 catch문으로 넘어간다.
    // throw new Error('')
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
  ]);
}
