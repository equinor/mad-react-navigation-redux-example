import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import * as actions from '../actions';
import * as Api from '../services/api';


function* searchMeetingRoomTextChanged(action) {
  const { searchTerm } = action.payload;
  const meetingRooms = yield call(Api.getMeetingRooms, searchTerm);
  yield put(actions.searchMeetingRoomListUpdated({ meetingRooms }));
}

function* watchSearchMeetingRoomTextChanged() {
  yield takeLatest(actions.searchMeetingRoomTextChanged.toString(), searchMeetingRoomTextChanged);
}

export default function* sagas() {
  yield [
    watchSearchMeetingRoomTextChanged(),
  ];
}
