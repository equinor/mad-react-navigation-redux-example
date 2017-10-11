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
  try {
    yield showScanLabel();

    yield handleScanLabel({});
  } catch (err) {
    // TODO: Add proper error handling
    yield popToRoute('Default');

    yield displayToast('An error occurred');
  }
}

function* handleScanLabel(state) {
  const { label, showHelp, back } = yield waitForScanLabelActions(state.hasShownHelp);

  if (label) {
    yield performMeetingRoomLookup({ ...state, label }, handleScanLabel);
  } else if (showHelp) {
    const { goToLookup, continueScanning } = yield askToDoManualLookup();

    const newState = { ...state, hasShownHelp: true };

    if (goToLookup) {
      yield showLookupLabel();

      yield handleLookupLabel(newState);
    } else if (continueScanning) {
      yield handleScanLabel(newState);
    }
  } else if (back) {
    // Just return to default page
  }
}

function* handleLookupLabel(state) {
  const { label, back } = yield waitForLookupLabelActions();

  if (label) {
    yield performMeetingRoomLookup({ ...state, label }, handleLookupLabel);
  } else if (back) {
    yield handleScanLabel(state);
  }
}

function* performMeetingRoomLookup(state, handlePreviousPage) {
  // TODO: Call real API
  const isConnectedToMeetingRoom = yield call(() => state.label === '765432');

  if (isConnectedToMeetingRoom) {
    const meetingRoom = 'MEETING ROOM FROM API'; // TODO: Need to get from real API
    yield showReportMeetingRoom(state.label, meetingRoom);

    yield handleReportMeetingRoom({ ...state, meetingRoom }, handlePreviousPage);
  } else {
    const shouldSearchForMeetingRooom = yield askToSearchForMeetingRoom();

    if (shouldSearchForMeetingRooom) {
      yield showSearchMeetingRoom();

      yield handleSearchMeetingRoom(state, handlePreviousPage);
    } else {
      yield handlePreviousPage(state);
    }
  }
}

function* handleSearchMeetingRoom(state, handlePreviousPage) {
  const { meetingRoom, back } = yield waitForSearchMeetingRoomActions();

  if (meetingRoom) {
    yield showReportMeetingRoom(state.label, meetingRoom);

    yield handleReportMeetingRoom({ ...state, meetingRoom }, function* backHandler(backState) {
      yield handleSearchMeetingRoom(backState, handlePreviousPage);
    });
  } else if (back) {
    yield handlePreviousPage(state);
  }
}

function* handleReportMeetingRoom(state, handlePreviousPage) {
  const { completed, back } = yield waitForReportMeetingRoomActions();

  if (completed) {
    yield popToRoute('Default');

    yield call(displayToast, `MeetingRoom selected ${state.meetingRoom} for equipment ${state.label} (Result: ${completed})`);
  } else if (back) {
    yield handlePreviousPage(state);
  }
}
