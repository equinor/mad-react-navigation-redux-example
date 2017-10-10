/* eslint no-use-before-define: 0 */

import {
  select,
  call,
  put,
  take,
  takeEvery,
  race,
} from 'redux-saga/effects';
import {
  delay,
} from 'redux-saga';
import {
  Alert,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
  defaultPageGoToMeetingRoomSearch,
  defaultPageGoToMeetingRoomScanLabel,
  defaultPageGoToMeetingRoomLookupLabel,
  searchMeetingRoomPageMeetingRoomSelected,
  scanLabelPageLabelRecognized,
  lookupLabelPageLookupLabel,
  reportMeetingRoomPageSendReport,
} from '../actions';


// Boilerplate

function* showSearchMeetingRoom() {
  yield put(NavigationActions.navigate({ routeName: 'SearchMeetingRoom' }));
}

function* showScanLabel() {
  yield put(NavigationActions.navigate({ routeName: 'ScanLabel' }));
}

function* showLookupLabel() {
  yield put(NavigationActions.navigate({ routeName: 'LookupLabel' }));
}

function* showReportMeetingRoom(label, meetingRoom) {
  yield put(NavigationActions.navigate({ routeName: 'ReportMeetingRoom', params: { label, meetingRoom } }));
}

function* waitForScanLabelActions() {
  const { labelRecognized, showHelp } = yield race({
    labelRecognized: take(scanLabelPageLabelRecognized),
    showHelp: call(delay, 2000),
    back: take(NavigationActions.BACK),
  });

  if (labelRecognized) {
    return { label: labelRecognized.payload.label };
  } else if (showHelp) {
    return { showHelp: true };
  }

  return { back: true };
}

function* waitForLookupLabelActions() {
  const { proceed } = yield race({
    proceed: take(lookupLabelPageLookupLabel),
    back: take(NavigationActions.BACK),
  });

  if (proceed) {
    return { label: proceed.payload.label };
  }

  return { back: true };
}

function* waitForSearchMeetingRoomActions() {
  const { proceed } = yield race({
    proceed: take(searchMeetingRoomPageMeetingRoomSelected),
    back: take(NavigationActions.BACK),
  });

  if (proceed) {
    return { meetingRoom: proceed.payload.meetingRoom };
  }

  return { back: true };
}

function* waitForReportMeetingRoomActions() {
  const { proceed } = yield race({
    proceed: take(reportMeetingRoomPageSendReport),
    back: take(NavigationActions.BACK),
  });

  if (proceed) {
    return { completed: true }; // TODO: Implement
  }

  return { back: true };
}

function* askToDoManualLookup() {
  const result = yield new Promise((resolve) => {
    Alert.alert(
      'Scanning trouble?',
      'Want to try the manual lookup instead?',
      [
        { text: 'Continue scanning', onPress: () => resolve(false), style: 'cancel' },
        { text: 'Go to lookup', onPress: () => resolve(true) },
      ],
      { cancelable: false },
    );
  });

  if (result) {
    return { goToLookup: true };
  }

  return { continueScanning: true };
}

function* askToSearchForMeetingRoom() {
  const result = yield new Promise((resolve) => {
    Alert.alert(
      'Equipment is not connected to a meeting room',
      'Do you want to search for a meeting room?',
      [
        { text: 'No', onPress: () => resolve(false), style: 'cancel' },
        { text: 'Yes', onPress: () => resolve(true) },
      ],
      { cancelable: false },
    );
  });

  return result;
}

function displayToast(message) {
  Alert.alert(
    message,
    '',
    { cancelable: false },
  );
}

function* popToRoute(route) {
  const nav = yield select(state => state.nav);
  const screenIndex = nav.routes.findIndex(screen => screen.routeName === route);

  if (screenIndex !== -1) {
    const nextScreenIndex = screenIndex + 1;
    if (nextScreenIndex < nav.routes.length) {
      const fromScreenKey = nav.routes[nextScreenIndex].key;

      yield put(NavigationActions.back({ key: fromScreenKey }));
    }
  }
}


// Workflows

function* goToMeetingRoomSearch() {
  yield put(NavigationActions.navigate({ routeName: 'SearchMeetingRoom' }));
}

function* goToMeetingRoomScanLabel() {
  yield showScanLabel();

  yield handleScanLabel();
}

function* handleScanLabel() {
  const { label, showHelp, back } = yield waitForScanLabelActions();

  if (label) {
    yield performMeetingRoomLookup(label, handleScanLabel);
  } else if (showHelp) {
    const { goToLookup, continueScanning } = yield askToDoManualLookup();

    if (goToLookup) {
      yield showLookupLabel();

      yield handleLookupLabel();
    } else if (continueScanning) {
      yield handleScanLabel();
    }
  } else if (back) {
    // Just return to default page
  }
}

function* handleLookupLabel() {
  const { label, back } = yield waitForLookupLabelActions();

  if (label) {
    yield performMeetingRoomLookup(label, handleLookupLabel);
  } else if (back) {
    yield handleScanLabel();
  }
}

function* performMeetingRoomLookup(label, previousPageHandler) {
  // TODO: Call real API
  const isConnectedToMeetingRoom = yield call(() => label === '765432');

  if (isConnectedToMeetingRoom) {
    const meetingRoom = 'MEETING ROOM FROM API';
    yield showReportMeetingRoom(label, meetingRoom);

    yield handleReportMeetingRoom(label, meetingRoom, previousPageHandler);
  } else {
    const shouldSearchForMeetingRooom = yield askToSearchForMeetingRoom();

    if (shouldSearchForMeetingRooom) {
      yield showSearchMeetingRoom();

      yield handleSearchMeetingRoom(label, previousPageHandler);
    } else {
      yield previousPageHandler();
    }
  }
}

function* handleSearchMeetingRoom(label, previousPageHandler) {
  const { meetingRoom, back } = yield waitForSearchMeetingRoomActions();

  if (meetingRoom) {
    yield showReportMeetingRoom(label, meetingRoom);

    yield handleReportMeetingRoom(label, meetingRoom, function* backHandler() {
      yield handleSearchMeetingRoom(previousPageHandler);
    });
  } else if (back) {
    yield previousPageHandler();
  }
}

function* handleReportMeetingRoom(label, meetingRoom, previousPageHandler) {
  const { completed, back } = yield waitForReportMeetingRoomActions();

  if (completed) {
    yield call(console.log, `MeetingRoom selected ${meetingRoom} for equipment ${label} (Result: ${completed})`);

    yield popToRoute('Default');

    yield displayToast('Congratulations, you have just completed your first saga!');
  } else if (back) {
    yield previousPageHandler();
  }
}


// Watches

function* watchGoToMeetingRoomSearch() {
  yield takeEvery(defaultPageGoToMeetingRoomSearch, goToMeetingRoomSearch);
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
