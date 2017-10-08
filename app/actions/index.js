import { createAction } from 'redux-actions';

// Navigation
export const pageNavigationPageWillAppear = createAction('PageNavigation/PAGE_WILL_APPEAR');
export const pageNavigationPageWillDisappear = createAction('PageNavigation/PAGE_WILL_DISAPPEAR');

// Default page
export const defaultPageGoToMeetingRoomSearch = createAction('DefaultPage/GO_TO_MEETING_ROOM_SEARCH');
export const defaultPageGoToMeetingRoomScanLabel = createAction('DefaultPage/GO_TO_MEETING_ROOM_SCAN_LABEL');
export const defaultPageGoToMeetingRoomLookupLabel = createAction('DefaultPage/GO_TO_MEETING_ROOM_LOOKUP_LABEL');
export const defaultPageGoToEquipmentScanLabel = createAction('DefaultPage/GO_TO_EQUIPMENT_SCAN_LABEL');
export const defaultPageGoToEquipmentLookupLabel = createAction('DefaultPage/GO_TO_EQUIPMENT_LOOKUP_LABEL');

// Search meeting room page
export const searchMeetingRoomPageSearchTextChanged = createAction('SearchMeetingRoomPage/SEARCH_TEXT_CHANGED');
export const searchMeetingRoomPageSearchTextClear = createAction('SearchMeetingRoomPage/SEARCH_TEXT_CLEAR');
export const searchMeetingRoomPageSearchResultUpdated = createAction('SearchMeetingRoomPage/SEARCH_RESULT_UPDATED');
export const searchMeetingRoomPageMeetingRoomSelected = createAction('SearchMeetingRoomPage/MEETING_ROOM_SELECTED');

// Scan label page
export const scanLabelPageLabelRecognized = createAction('ScanLagePage/LABEL_RECOGNIZED');

// Lookup label page
export const lookupLabelPageLookupLabel = createAction('LookupLabelPage/LOOKUP_LABEL');

// Report meeting room page
export const reportMeetingRoomPageSendReport = createAction('ReportMeetingRoomPage/SEND_REPORT');

// Report equipment page
export const reportEquipmentPageSendReport = createAction('ReportMeetingRoomPage/SEND_REPORT');
