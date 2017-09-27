import { combineReducers } from 'redux';
import counter from './counter';
import { navReducer } from '../navigation';


export default combineReducers({
  nav: navReducer,
  counter,
});
