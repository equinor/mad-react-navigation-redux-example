import { combineReducers } from 'redux';
import counter from './counter';
import searchMeetingRoom from './searchMeetingRoom';
import { navReducer } from '../navigation';


export default combineReducers({
  nav: navReducer,
  counter,
  searchMeetingRoom,
});
