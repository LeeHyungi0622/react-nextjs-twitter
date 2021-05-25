import React from 'react';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import Head from 'next/head';
import withReduxSaga from 'next-redux-saga';
import wrapper from '../store/configureStore';

const App = ({ Component }) => (
  <>
    <Head>
      <meta charset="utf-8" />
      <title>NodeBird!</title>
    </Head>
    <Component />
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(App));
