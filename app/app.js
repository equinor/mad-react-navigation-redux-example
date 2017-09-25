import React, { Component } from 'react';
import {
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';
import AppNavigator from './navigation';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(
  sagaMiddleware,
));

sagaMiddleware.run(sagas);


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
