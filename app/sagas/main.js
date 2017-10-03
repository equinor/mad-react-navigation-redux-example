/* eslint func-names: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-use-before-define: 0 */
/* eslint camelcase: 0 */

import {
  call,
  put,
  take,
  takeEvery,
  race,
} from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import * as actions from '../actions';


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

// function* goToMeetingRoomLookupLabel() {
//   try {
//     yield showLookupLabel();
//
//     yield retryOnBack(waitForLookupLabel, function* step1(label) {
//       yield showSearchMeetingRoom();
//
//       yield retryOnBack(waitForSearchMeetingRoom, function* step2(meetingRoom) {
//         yield showReportMeetingRoom(meetingRoom, label);
//
//         yield retryOnBack(waitForReportMeetingRoom, function* step3() {
//           yield call(console.log, 'COMPLETED');
//
//           return true;
//         });
//       });
//     });
//   } finally {
//     yield put(actions.searchMeetingRoomTextClear());
//   }
// }

// function* waitForLookupLabelActions(proceedFn, backFn = () => {}) {
//   const { proceed, back } = yield race({
//     proceed: take(actions.lookupLabel),
//     back: take(NavigationActions.BACK),
//   });
//
//   if (proceed) {
//     yield proceedFn(proceed.payload.label);
//   } else {
//     yield backFn();
//   }
// }
//
// function* waitForSearchMeetingRoomActions(proceedFn, backFn = () => {}) {
//   const { proceed, back } = yield race({
//     proceed: take(actions.searchMeetingRoomSelected),
//     back: take(NavigationActions.BACK),
//   });
//
//   if (proceed) {
//     yield proceedFn(proceed.payload.meetingRoom);
//   } else {
//     yield backFn();
//   }
// }
//
//
// function* goToMeetingRoomLookupLabel() {
//   yield showLookupLabel();
//
//   yield handleLookupLabel();
// }
//
// function* handleLookupLabel() {
//   yield waitForLookupLabelActions(function* (label) {
//     yield showSearchMeetingRoom();
//
//     yield handleReportMeetingRoom(label);
//   }, function* () {
//     // Do nothing
//   });
// }
//
// function* handleReportMeetingRoom(label) { // TODO: Remove label
//   yield waitForSearchMeetingRoomActions(function* (meetingRoom) {
//     yield call(console.log, `MeetingRoom selected ${meetingRoom} for equipment ${label}`);
//   }, function* () {
//     yield handleLookupLabel();
//   });
// }
//
// function* handleReportMeetingRoom(label) { // TODO: Remove label
//   yield waitForSearchMeetingRoomActions(function* (meetingRoom) {
//     yield call(console.log, `MeetingRoom selected ${meetingRoom} for equipment ${label}`);
//   }, function* () {
//     yield handleLookupLabel();
//   });
// }

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

  return { meetingRoomBack: true };
}

function* goToMeetingRoomLookupLabel() {
  yield showLookupLabel();

  yield (function* handleLookupLabel() {
    const { label } = yield waitForLookupLabelActions();
    if (label) {
      yield showSearchMeetingRoom();

      yield (function* handleReportMeetingRoom() {
        const { meetingRoom, reportMeetingRoomBack } = yield waitForSearchMeetingRoomActions();

        if (meetingRoom) {
          yield call(console.log, `MeetingRoom selected ${meetingRoom} for equipment ${label}`);
        } else if (reportMeetingRoomBack) {
          yield handleLookupLabel();
        }
      }());
    }
  }());
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
    watchGoToMeetingRoomSearch(),
    watchGoToMeetingRoomScanLabel(),
    watchGoToMeetingRoomLookupLabel(),
  ];
}
