import { createAction } from 'redux-actions';

// Navigation
export const pageNavigationPageWillAppear = createAction('PageNavigation/PAGE_WILL_APPEAR');
export const pageNavigationPageWillDisappear = createAction('PageNavigation/PAGE_WILL_DISAPPEAR');

// Default
export const goToMeetingRoomSearch = createAction('goToMeetingRoomSearch');
export const goToMeetingRoomScanLabel = createAction('goToMeetingRoomScanLabel');
export const goToMeetingRoomLookupLabel = createAction('goToMeetingRoomLookupLabel');
export const goToEquipmentScanLabel = createAction('goToEquipmentScanLabel');
export const goToEquipmentLookupLabel = createAction('goToEquipmentLookupLabel');

// Search
export const searchMeetingRoomTextChanged = createAction('searchMeetingRoomTextChanged');
export const searchMeetingRoomTextClear = createAction('searchMeetingRoomTextClear');
export const searchMeetingRoomListUpdated = createAction('searchMeetingRoomListUpdated');
export const searchMeetingRoomSelected = createAction('searchMeetingRoomSelected');

// Scan
export const labelRecognized = createAction('labelRecognized');

// Lookup
export const lookupLabel = createAction('lookupLabel');

// Report
export const report = createAction('report');


// Behaviours
export const incrementCounter = createAction('incrementCounter');

export const showAlert = createAction('showAlert');
