import { all, fork, call, put, delay, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// generator(*)
// 패턴대로 코딩을 하기 때문에 익숙해지면 된다.

// 제너레이터 함수가 아닌 일반함수이다.
function logInAPI() {
    return axios.post('/api/login');
}

function* login(action) {
    try {
        console.log('saga login');
        // result에 결과값이 담긴 상태로 다음 액션이 실행되야 하기 때문에 반드시 call로 작성해준다.
        // const result = yield call(logInAPI, action.data);
        // 서버가 아직 구현되지 않은 경우, delay를 사용해서 setTimeout과 같이 시간을 지연시켜준다.
        yield delay(1000);
        yield put({
            type: 'LOG_IN_SUCCESS',
            // 성공 결과는 result.data에 담겨있다.
            data: action.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: 'LOG_IN_FAILURE',
            // 실패 결과는 err.response.data에 담겨있다.
            data: err.response.data
        });
    }
}

function logOutAPI() {
    return axios.post('/api/logOut');
}

function* logout(action) {
    try {
        // const result = yield call(logOutAPI);
        yield delay(1000);
        yield put({
            type: 'LOG_OUT_SUCCESS',
            data: action.data
        });
    } catch (err) {
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: err.response.data
        });
    }
}

function* watchLogIn() {
    yield takeLatest('LOG_IN_REQUEST', login);
}

function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST', logout);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
    ])
}