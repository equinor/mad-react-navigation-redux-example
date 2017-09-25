import React, { Component } from 'react';
import {
} from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducers from './reducers';
import Placeholder from './components/containers/Placeholder';


const store = createStore(reducers);


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Placeholder />
      </Provider>
    );
  }
}
