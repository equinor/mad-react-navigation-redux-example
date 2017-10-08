import { handleActions } from 'redux-actions';
import {
  searchMeetingRoomPageSearchTextChanged,
  searchMeetingRoomPageSearchTextClear,
  searchMeetingRoomPageSearchResultUpdated,
} from '../actions';


const initialState = {
  searchTerm: '',
  meetingRooms: [],
};


export default handleActions({
  [searchMeetingRoomPageSearchTextChanged]: (state, action) => ({
    ...state,
    searchTerm: action.payload.searchTerm,
  }),
  [searchMeetingRoomPageSearchTextClear]: state => ({
    ...state,
    ...initialState,
  }),
  [searchMeetingRoomPageSearchResultUpdated]: (state, action) => ({
    ...state,
    meetingRooms: action.payload.meetingRooms,
  }),
}, initialState);


const reducerKey = 'searchMeetingRoom'; // NOTE: This should equal the key in ./index.js

export const getMeetingRooms = state => state[reducerKey].meetingRooms;
