import { createAction } from 'redux-actions';

export const incrementCounter = createAction('incrementCounter');

export const showAlert = createAction('showAlert');




// Navigation
export const goToMeetingRoomSearch = createAction('goToMeetingRoomSearch');
export const goToMeetingRoomScanLabel = createAction('goToMeetingRoomScanLabel');
export const goToMeetingRoomLookup = createAction('goToMeetingRoomLookup');
export const goToEquipmentScanLabel = createAction('goToEquipmentScanLabel');
export const goToEquipmentLookup = createAction('goToEquipmentLookup');


export const pageNavigationPageWillAppear = createAction('PageNavigation/PAGE_WILL_APPEAR');
export const pageNavigationPageWillDisappear = createAction('PageNavigation/PAGE_WILL_DISAPPEAR');
