import {
  select,
  call,
  put,
  take,
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
  searchMeetingRoomPageMeetingRoomSelected,
  scanLabelPageLabelRecognized,
  lookupLabelPageLookupLabel,
  reportMeetingRoomPageSendReport,
} from '../actions';


// Navigating

export function* showSearchMeetingRoom() {
  yield put(NavigationActions.navigate({ routeName: 'SearchMeetingRoom' }));
}

export function* showScanLabel() {
  yield put(NavigationActions.navigate({ routeName: 'ScanLabel' }));
}

export function* showLookupLabel() {
  yield put(NavigationActions.navigate({ routeName: 'LookupLabel' }));
}

export function* showReportMeetingRoom(label, meetingRoom) {
  yield put(NavigationActions.navigate({ routeName: 'ReportMeetingRoom', params: { label, meetingRoom } }));
}


// Waiting for actions

export function* waitForScanLabelActions(hasShownHelp) {
  const { labelRecognized, showHelp } = yield race({
    labelRecognized: take(scanLabelPageLabelRecognized),
    ...(!hasShownHelp ? { showHelp: call(delay, 2000) } : {}),
    back: take(NavigationActions.BACK),
  });

  if (labelRecognized) {
    return { label: labelRecognized.payload.label };
  } else if (showHelp) {
    return { showHelp: true };
  }

  return { back: true };
}

export function* waitForLookupLabelActions() {
  const { lookupLabel } = yield race({
    lookupLabel: take(lookupLabelPageLookupLabel),
    back: take(NavigationActions.BACK),
  });

  if (lookupLabel) {
    return { label: lookupLabel.payload.label };
  }

  return { back: true };
}

export function* waitForSearchMeetingRoomActions() {
  const { meetingRoomSelected } = yield race({
    meetingRoomSelected: take(searchMeetingRoomPageMeetingRoomSelected),
    back: take(NavigationActions.BACK),
  });

  if (meetingRoomSelected) {
    return { meetingRoom: meetingRoomSelected.payload.meetingRoom };
  }

  return { back: true };
}

export function* waitForReportMeetingRoomActions() {
  const { sendReport } = yield race({
    sendReport: take(reportMeetingRoomPageSendReport),
    back: take(NavigationActions.BACK),
  });

  if (sendReport) {
    return { completed: true }; // TODO: Implement
  }

  return { back: true };
}


// Dialogs

export function* askToDoManualLookup() {
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

export function* askToSearchForMeetingRoom() {
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

export function displayToast(message) {
  Alert.alert(
    message,
    '',
    { cancelable: false },
  );
}

export function* popToRoute(route) {
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
