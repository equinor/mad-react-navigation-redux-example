import {
  call,
  put,
  take,
  takeEvery,
  race,
} from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import * as actions from '../actions';


// Boilerplate

function* showLookupLabel() {
  yield put(NavigationActions.navigate({ routeName: 'LookupLabel' })); // TODO: Use a constant instead
}

function* showSearchMeetingRoom() {
  yield put(NavigationActions.navigate({ routeName: 'SearchMeetingRoom' }));
}

function* showReportMeetingRoom(meetingRoom, label) {
  yield put(NavigationActions.navigate({ routeName: 'ReportMeetingRoom', params: { meetingRoom, label } }));
}


function* waitForLookupLabelActions() {
  const { proceed } = yield race({
    proceed: take(actions.lookupLabel),
    back: take(NavigationActions.BACK),
  });

  if (proceed) {
    return { label: proceed.payload.label };
  }

  return { lookupLabelBack: true };
}

function* waitForSearchMeetingRoomActions() {
  const { proceed } = yield race({
    proceed: take(actions.searchMeetingRoomSelected),
    back: take(NavigationActions.BACK),
  });

  if (proceed) {
    return { meetingRoom: proceed.payload.meetingRoom };
  }

  return { searchMeetingRoomBack: true };
}

function* waitForReportMeetingRoomActions() {
  const { proceed } = yield race({
    proceed: take(actions.report),
    back: take(NavigationActions.BACK),
  });

  if (proceed) {
    return { completed: true }; // TODO: Implement
  }

  return { reportMeetingRoomBack: true };
}


// Scenarios

function* goToMeetingRoomSearch() {
  yield put(NavigationActions.navigate({ routeName: 'SearchMeetingRoom' })); // TODO: Use a constant instead
}

function* goToMeetingRoomScanLabel() {
  yield put(NavigationActions.navigate({ routeName: 'ScanLabel' })); // TODO: Use a constant instead

  const action = yield take(actions.labelRecognized);
  const label = action.payload.label;

  yield put(NavigationActions.navigate({ routeName: 'MeetingRoom', params: { label } })); // TODO: Use a constant instead
}

function* goToMeetingRoomLookupLabel() {
  yield showLookupLabel();

  yield (function* handleLookupLabel() {
    const { label, lookupLabelBack } = yield waitForLookupLabelActions();
    if (lookupLabelBack) { return; }

    yield showSearchMeetingRoom();

    yield (function* handleSearchMeetingRoom() {
      const { meetingRoom, searchMeetingRoomBack } = yield waitForSearchMeetingRoomActions();
      if (searchMeetingRoomBack) { yield handleLookupLabel(); return; }

      yield showReportMeetingRoom(meetingRoom, label);

      yield (function* handleReportMeetingRoom() {
        const { completed, reportMeetingRoomBack } = yield waitForReportMeetingRoomActions();
        if (reportMeetingRoomBack) { yield handleSearchMeetingRoom(); return; }

        yield call(console.log, `MeetingRoom selected ${meetingRoom} for equipment ${label} (Result: ${completed})`);
      }());
    }());
  }());
}


// Watches

function* watchGoToMeetingRoomSearch() {
  yield takeEvery(actions.goToMeetingRoomSearch, goToMeetingRoomSearch);
}

function* watchGoToMeetingRoomScanLabel() {
  yield takeEvery(actions.goToMeetingRoomScanLabel, goToMeetingRoomScanLabel);
}

function* watchGoToMeetingRoomLookupLabel() {
  yield takeEvery(actions.goToMeetingRoomLookupLabel, goToMeetingRoomLookupLabel);
}


export default function* sagas() {
  yield [
    watchGoToMeetingRoomSearch(),
    watchGoToMeetingRoomScanLabel(),
    watchGoToMeetingRoomLookupLabel(),
  ];
}
