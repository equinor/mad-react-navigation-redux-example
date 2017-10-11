import {
  takeEvery,
} from 'redux-saga/effects';
import {
  defaultPageGoToMeetingRoomSearch,
  defaultPageGoToMeetingRoomScanLabel,
  defaultPageGoToMeetingRoomLookupLabel,
} from '../actions';
import startMeetingRoomScanLabelWorkflow from './meetingRoomScanLabelWorkflow';


// Watches

function* watchGoToMeetingRoomSearch() {
  // yield takeEvery(defaultPageGoToMeetingRoomSearch, startMeetingRoomSearchWorkflow);
}

function* watchGoToMeetingRoomScanLabel() {
  yield takeEvery(defaultPageGoToMeetingRoomScanLabel, startMeetingRoomScanLabelWorkflow);
}

function* watchGoToMeetingRoomLookupLabel() {
  // yield takeEvery(defaultPageGoToMeetingRoomLookupLabel, startMeetingRoomLookupLabelWorkflow);
}


export default function* sagas() {
  yield [
    watchGoToMeetingRoomSearch(),
    watchGoToMeetingRoomScanLabel(),
    watchGoToMeetingRoomLookupLabel(),
  ];
}
