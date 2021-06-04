import { produce } from 'immer';
import { ADD_POST_TO_ME, CHANGE_NICKNAME_FAILURE, CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, FOLLOW_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, REMOVE_POST_OF_ME, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS } from '../types/user';

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
  changeNicknameLoading: false, // 닉네임 변경 시도중...
  changeNicknameDone: false,
  changeNicknameError: null,
  followLoading: false, // 로그인 시도중... (로딩창 띄우기 위한 목적)
  followDone: false,
  followError: null,
  unfollowLoading: false, // 로그인 시도중... (로딩창 띄우기 위한 목적)
  unfollowDone: false,
  unfollowError: null,
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
  Posts: [{ id: 1 }],
  Followings: [{ nickname: '부기초' }, { nickname: 'Chanho Lee' }, { nickname: 'neue zeal' }],
  Followers: [{ nickname: '부기초' }, { nickname: 'Chanho Lee' }, { nickname: 'neue zeal' }],
});

// 하나의 request당 REQUEST, SUCCESS, FAILURE를 처리
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    // 각각의 saga action에 따라 화면을 업데이트 해주기 위해서 아래와 같이 작성
    case LOG_IN_REQUEST:
      draft.logInLoading = true;
      draft.logInError = null;
      draft.logInDone = false;
      break;
    case LOG_IN_SUCCESS:
      // success 시에는 done: true
      draft.logInLoading = false;
      draft.logInDone = true;
      draft.me = action.data;
      break;
      // failure 시에는 loading: false, error 넣어주기
    case LOG_IN_FAILURE:
      draft.logInLoading = false;
      draft.logInError = action.error;
      break;
    case LOG_OUT_REQUEST:
      draft.logOutLoading = true;
      draft.logOutDone = false;
      draft.logOutError = null;
      break;
    case LOG_OUT_SUCCESS:
      draft.logOutLoading = false;
      draft.logOutDone = true;
      draft.me = null;
      break;
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false;
      draft.logOutError = action.error;
      break;
    case SIGN_UP_REQUEST:
      draft.signUpLoading = true;
      draft.signUpError = null;
      draft.signUpDone = false;
      break;
    case SIGN_UP_SUCCESS:
      draft.signUpLoading = false;
      draft.signUpDone = true;
      break;
    case SIGN_UP_FAILURE:
      draft.signUpLoading = false;
      draft.signUpError = action.error;
      break;
    case CHANGE_NICKNAME_REQUEST:
      draft.changeNicknameLoading = true;
      draft.changeNicknameError = null;
      draft.changeNicknameDone = false;
      break;
    case CHANGE_NICKNAME_SUCCESS:
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = true;
      break;
    case CHANGE_NICKNAME_FAILURE:
      draft.changeNicknameLoading = false;
      draft.changeNicknameError = action.error;
      break;
    case ADD_POST_TO_ME:
      draft.me.Posts.unshift({ id: action.data });
      break;
    case REMOVE_POST_OF_ME:
      draft.me.Posts.filter((v) => v.id !== action.data);
      break;
    case FOLLOW_REQUEST:
      draft.followLoading = true;
      draft.followError = null;
      draft.followDone = false;
      break;
    case FOLLOW_SUCCESS:
      // success 시에는 done: true
      draft.followLoading = false;
      draft.followDone = true;
      draft.me.Followings.push({ id: action.data });
      break;
      // failure 시에는 loading: false, error 넣어주기
    case FOLLOW_FAILURE:
      draft.followLoading = false;
      draft.followError = action.error;
      break;
    case UNFOLLOW_REQUEST:
      draft.unfollowLoading = true;
      draft.unfollowError = null;
      draft.unfollowDone = false;
      break;
    case UNFOLLOW_SUCCESS:
      // success 시에는 done: true
      draft.unfollowLoading = false;
      draft.unfollowDone = true;
      draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data);
      break;
      // failure 시에는 loading: false, error 넣어주기
    case UNFOLLOW_FAILURE:
      draft.unfollowLoading = false;
      draft.unfollowError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;
