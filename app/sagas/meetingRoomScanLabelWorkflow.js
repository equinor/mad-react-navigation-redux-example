/* eslint no-use-before-define: 0 */
import {
  call,
} from 'redux-saga/effects';
import {
  showScanLabel,
  showLookupLabel,
  showSearchMeetingRoom,
  showReportMeetingRoom,
  waitForScanLabelActions,
  waitForLookupLabelActions,
  waitForSearchMeetingRoomActions,
  waitForReportMeetingRoomActions,
  askToDoManualLookup,
  askToSearchForMeetingRoom,
  displayToast,
  popToRoute,
} from './workflowHelpers';


export default function* goToMeetingRoomScanLabel() {
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
