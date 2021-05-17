const initialState = {
    isLoggingIn: false, // 로그인 시도중... (로딩창 띄우기 위한 목적)
    isLoggedIn: false,
    isLoggingOut: false, // 로그아웃 시도중... (로딩창 띄우기 위한 목적)
    me: null,
    signUpData: {},
    loginData: {}
}

export const loginRequestAction = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data
    };
};

export const logoutRequestAction = () => {
    return {
        type: 'LOG_OUT_REQUEST'
    }
}

// 하나의 request당 REQUEST, SUCCESS, FAILURE를 처리
const reducer = (state = initialState, action) => {
    switch (action.type) {
        // 각각의 saga action에 따라 화면을 업데이트 해주기 위해서 아래와 같이 작성
        case 'LOG_IN_REQUEST':
            return {
                ...state,
                isLoggingIn: true,
            }
        case 'LOG_IN_SUCCESS':
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                me: {...action.data, nickname: 'lee' }
            }
        case 'LOG_IN_FAILURE':
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: false,
            }
        case 'LOG_OUT_REQUEST':
            return {
                ...state,
                isLoggingOut: true,
            }
        case 'LOG_OUT_SUCCESS':
            return {
                ...state,
                isLoggingOut: false,
                isLoggedIn: false,
                me: null
            }
        case 'LOG_OUT_FAILURE':
            return {
                ...state,
                isLoggingOut: false,
            }
        default:
            return state;
    }
}

export default reducer;