import { combineReducers } from 'redux';
import { navReducer } from '../navigation';
import searchMeetingRoom from './searchMeetingRoom';


export default combineReducers({
  nav: navReducer,
  searchMeetingRoom,
});
