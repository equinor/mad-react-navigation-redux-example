import { handleActions } from 'redux-actions';
import {
  searchMeetingRoomTextChanged,
  searchMeetingRoomTextClear,
  searchMeetingRoomListUpdated,
} from '../actions';


const initialState = {
  searchTerm: '',
  meetingRooms: [],
};


export default handleActions({
  [searchMeetingRoomTextChanged]: (state, action) => ({
    ...state,
    searchTerm: action.payload.searchTerm,
  }),
  [searchMeetingRoomTextClear]: state => ({
    ...state,
    ...initialState,
  }),
  [searchMeetingRoomListUpdated]: (state, action) => ({
    ...state,
    meetingRooms: action.payload.meetingRooms,
  }),
}, initialState);


const reducerKey = 'searchMeetingRoom'; // NOTE: This should equal the key in ./index.js

export const getMeetingRooms = state => state[reducerKey].meetingRooms;
