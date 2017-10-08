import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  searchMeetingRoomPageSearchTextChanged,
  searchMeetingRoomPageSearchResultUpdated,
} from '../actions';
import { getMeetingRooms } from '../services/api';


function* updateSearchResult(action) {
  const { searchTerm } = action.payload;
  const meetingRooms = yield call(getMeetingRooms, searchTerm);
  yield put(searchMeetingRoomPageSearchResultUpdated({ meetingRooms }));
}

function* watchSearchTextChanged() {
  yield takeLatest(searchMeetingRoomPageSearchTextChanged.toString(), updateSearchResult);
}

export default function* sagas() {
  yield [
    watchSearchTextChanged(),
  ];
}
