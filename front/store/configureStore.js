import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = () => {
    // 개발용일때에만 devTools를 붙인다. (보안적 요소 고려)
    // history가 쌓이게 되면 메모리도 많이 잡아먹는다.
    const middlewares = [];
    const enhancer = process.env.NODE_ENV === 'production' ?
        // 개발할때에는 redux-saga, thunk만 추가해준다.
        compose(applyMiddleware(...middlewares)) :
        composeWithDevTools(applyMiddleware())
    const store = createStore(reducer, enhancer);
    return store;
}

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;