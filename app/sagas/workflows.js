import {
  takeEvery,
} from 'redux-saga/effects';
import {
  defaultPageGoToMeetingRoomSearch,
  defaultPageGoToMeetingRoomScanLabel,
  defaultPageGoToMeetingRoomLookupLabel,
} from '../actions';
import goToMeetingRoomScanLabel from './meetingRoomScanLabelWorkflow';


// Watches

function* watchGoToMeetingRoomSearch() {
  // yield takeEvery(defaultPageGoToMeetingRoomSearch, goToMeetingRoomSearch);
}

function* watchGoToMeetingRoomScanLabel() {
  yield takeEvery(defaultPageGoToMeetingRoomScanLabel, goToMeetingRoomScanLabel);
}

function* watchGoToMeetingRoomLookupLabel() {
  // yield takeEvery(defaultPageGoToMeetingRoomLookupLabel, goToMeetingRoomLookupLabel);
}


export default function* sagas() {
  yield [
    watchGoToMeetingRoomSearch(),
    watchGoToMeetingRoomScanLabel(),
    watchGoToMeetingRoomLookupLabel(),
  ];
}
