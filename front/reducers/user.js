import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from '../types/user';

const initialState = {
  logInLoading: false, // 로그인 시도중... (로딩창 띄우기 위한 목적)
  logInDone: false,
  logInError: false,
  logOutLoading: false, // 로그인 시도중... (로딩창 띄우기 위한 목적)
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중... (로딩창 띄우기 위한 목적)
  signUpDone: false,
  signUpError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

export const loginRequestAction = (data) => ({
  type: 'LOG_IN_REQUEST',
  data,
});

export const logoutRequestAction = () => ({
  type: 'LOG_OUT_REQUEST',
});

// data: email, password 포함
const dummyUser = (data) => ({
  ...data,
  nickname: 'lee',
  id: 1,
  Post: [],
  Followings: [],
  Followers: [],
});

// 하나의 request당 REQUEST, SUCCESS, FAILURE를 처리
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 각각의 saga action에 따라 화면을 업데이트 해주기 위해서 아래와 같이 작성
    case LOG_IN_REQUEST:
      // request시에는 3가지 속성 초기화
      return {
        ...state,
        logInLoading: true,
        logInError: null,
        logInDone: false,
      };
    case LOG_IN_SUCCESS:
      // success 시에는 done: true
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: dummyUser,
      };
      // failure 시에는 loading: false, error 넣어주기
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        logOutError: null,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
        signUpError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
