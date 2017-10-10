import {
  select,
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

function* showLookupLabel() {
  yield put(NavigationActions.navigate({ routeName: 'LookupLabel' }));
}

function* showSearchMeetingRoom() {
  yield put(NavigationActions.navigate({ routeName: 'SearchMeetingRoom' }));
}

function* showReportMeetingRoom(meetingRoom, label) {
  yield put(NavigationActions.navigate({ routeName: 'ReportMeetingRoom', params: { meetingRoom, label } }));
}


function* waitForLookupLabelActions() {
  const { proceed } = yield race({
    proceed: take(lookupLabelPageLookupLabel),
    back: take(NavigationActions.BACK),
  });

  if (proceed) {
    return { label: proceed.payload.label };
  }

  return { lookupLabelBack: true };
}

function* waitForSearchMeetingRoomActions() {
  const { proceed } = yield race({
    proceed: take(searchMeetingRoomPageMeetingRoomSelected),
    back: take(NavigationActions.BACK),
  });

  if (proceed) {
    return { meetingRoom: proceed.payload.meetingRoom };
  }

  return { searchMeetingRoomBack: true };
}

function* waitForReportMeetingRoomActions() {
  const { proceed } = yield race({
    proceed: take(reportMeetingRoomPageSendReport),
    back: take(NavigationActions.BACK),
  });

  if (proceed) {
    return { completed: true }; // TODO: Implement
  }

  return { reportMeetingRoomBack: true };
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

  if (result) {
    return { acceptedSearchMeetingRoom: true };
  }

  return { deniedSearchMeetingRoom: true };
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


// Scenarios

function* goToMeetingRoomSearch() {
  yield put(NavigationActions.navigate({ routeName: 'SearchMeetingRoom' }));
}

function* goToMeetingRoomScanLabel() {
  yield put(NavigationActions.navigate({ routeName: 'ScanLabel' }));

  const action = yield take(scanLabelPageLabelRecognized);
  const label = action.payload.label;

  yield put(NavigationActions.navigate({ routeName: 'MeetingRoom', params: { label } }));
}

function* goToMeetingRoomLookupLabel() {
  yield showLookupLabel();

  yield (function* handleLookupLabel() {
    const { label, lookupLabelBack } = yield waitForLookupLabelActions();
    if (lookupLabelBack) { return; }

    const { deniedSearchMeetingRoom } = yield askToSearchForMeetingRoom();
    if (deniedSearchMeetingRoom) { yield handleLookupLabel(); return; }

    yield showSearchMeetingRoom();

    yield (function* handleSearchMeetingRoom() {
      const { meetingRoom, searchMeetingRoomBack } = yield waitForSearchMeetingRoomActions();
      if (searchMeetingRoomBack) { yield handleLookupLabel(); return; }

      yield showReportMeetingRoom(meetingRoom, label);

      yield (function* handleReportMeetingRoom() {
        const { completed, reportMeetingRoomBack } = yield waitForReportMeetingRoomActions();
        if (reportMeetingRoomBack) { yield handleSearchMeetingRoom(); return; }

        yield call(console.log, `MeetingRoom selected ${meetingRoom} for equipment ${label} (Result: ${completed})`);

        yield popToRoute('Default');

        yield displayToast('Congratulations, you have just completed your first saga!');
      }());
    }());
  }());
}


// Watches

function* watchGoToMeetingRoomSearch() {
  yield takeEvery(defaultPageGoToMeetingRoomSearch, goToMeetingRoomSearch);
}

function* watchGoToMeetingRoomScanLabel() {
  yield takeEvery(defaultPageGoToMeetingRoomScanLabel, goToMeetingRoomScanLabel);
}

function* watchGoToMeetingRoomLookupLabel() {
  yield takeEvery(defaultPageGoToMeetingRoomLookupLabel, goToMeetingRoomLookupLabel);
}


export default function* sagas() {
  yield [
    watchGoToMeetingRoomSearch(),
    watchGoToMeetingRoomScanLabel(),
    watchGoToMeetingRoomLookupLabel(),
  ];
}
