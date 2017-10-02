import {
  call,
  put,
  take,
  takeEvery,
  race,
} from 'redux-saga/effects';
import {
  Alert,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as actions from '../actions';
import * as Api from '../services/api';


function* showAlert(action) {
  const { title, message } = action.payload;
  yield call(Alert.alert, title, message);
}

function* watchShowAlert() {
  yield takeEvery(actions.showAlert.toString(), showAlert);
}

// DefaultPage

function* goToMeetingRoomSearch() {
  yield put(NavigationActions.navigate({ routeName: 'SearchMeetingRoom' })); // TODO: Use a constant instead
}

function* goToMeetingRoomScanLabel() {
  yield put(NavigationActions.navigate({ routeName: 'ScanLabel' })); // TODO: Use a constant instead

  const action = yield take(actions.labelRecognized);
  const label = action.payload.label;

  yield put(NavigationActions.navigate({ routeName: 'MeetingRoom', params: { label } })); // TODO: Use a constant instead
}


function* showLookupLabel() {
  yield put(NavigationActions.navigate({ routeName: 'LookupLabel' })); // TODO: Use a constant instead
}

function* waitForLookupLabel() {
  const { proceed } = yield race({
    proceed: take(actions.lookupLabel),
    back: take(NavigationActions.BACK),
  });

  if (proceed) {
    return { result: proceed.payload.label };
  }

  return { back: true };
}

function* showSearchMeetingRoom() {
  yield put(NavigationActions.navigate({ routeName: 'SearchMeetingRoom' }));
}

function* waitForSearchMeetingRoom() {
  const { proceed } = yield race({
    proceed: take(actions.searchMeetingRoomSelected),
    back: take(NavigationActions.BACK),
  });

  if (proceed) {
    return { result: proceed.payload.meetingRoom };
  }

  return { back: true };
}

function* showReportMeetingRoom(meetingRoom, label) {
  yield put(NavigationActions.navigate({ routeName: 'ReportMeetingRoom', params: { meetingRoom, label } }));
}

function* waitForReportMeetingRoom() {
  const { proceed } = yield race({
    proceed: take(actions.report),
    back: take(NavigationActions.BACK),
  });

  if (proceed) {
    return { result: 'REPORTED' }; // TODO: Implement
  }

  return { back: true };
}

function* retryOnBack(actionGenerator, callback) {
  while (true) {
    const { result, back } = yield actionGenerator();

    if (back) { break; }

    const shouldBreak = yield callback(result);

    if (shouldBreak) { break; }
  }
}

function* goToMeetingRoomLookupLabel() {
  try {
    yield showLookupLabel();

    yield retryOnBack(waitForLookupLabel, function* step1(label) {
      yield showSearchMeetingRoom();

      yield retryOnBack(waitForSearchMeetingRoom, function* step2(meetingRoom) {
        yield showReportMeetingRoom(meetingRoom, label);

        yield retryOnBack(waitForReportMeetingRoom, function* step3() {
          yield call(console.log, 'COMPLETED');

          return true;
        });
      });
    });
  } finally {
    yield put(actions.searchMeetingRoomTextClear());
  }
}


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
    watchShowAlert(),
    watchGoToMeetingRoomSearch(),
    watchGoToMeetingRoomScanLabel(),
    watchGoToMeetingRoomLookupLabel(),
  ];
}
