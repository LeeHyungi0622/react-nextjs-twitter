import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import rootSaga from '../sagas';

const loggerMiddleware = () => (next) => (action) => {
  console.log(action);
  return next(action);
};

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  // 개발용일때에만 devTools를 붙인다. (보안적 요소 고려)
  // history가 쌓이게 되면 메모리도 많이 잡아먹는다.
  const middlewares = [sagaMiddleware, loggerMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
  // 개발할때에는 redux-saga, thunk만 추가해준다.
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
