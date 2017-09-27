import {
  call,
  put,
  take,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects';
import {
  Alert,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as actions from '../actions';


function* showAlert(action) {
  const { title, message } = action.payload;
  yield call(Alert.alert, title, message);
}

function* watchShowAlert() {
  yield takeEvery(actions.showAlert.toString(), showAlert);
}

function* goToEquipmentScanLabel() {
  yield put(NavigationActions.navigate({ routeName: 'Home' })); // TODO: Use a constant instead
}

function* watchGoToEquipmentScanLabel() {
  yield takeEvery(actions.goToEquipmentScanLabel, goToEquipmentScanLabel);
}

function* scanLabelPageWillAppear() {
  const navigation = yield select(state => state.nav);
  const isScanLabelPageFocused = navigation.routes[navigation.index].routeName === 'Home'; // TODO: Use a constant instead

  if (isScanLabelPageFocused) {
    yield put(actions.scanLabelPageWillAppear());
  }
}

function* watchScanLabelPageWillAppear() {
  yield takeEvery(action => action.type.startsWith('Navigation/'), scanLabelPageWillAppear);
}

function* scanLabelPageWillDisappear() {
  yield take(action => action.type.startsWith('Navigation/'));
  yield put(actions.scanLabelPageWillDisappear());
}

function* watchScanLabelPageWillDisappear() {
  yield takeEvery(actions.scanLabelPageWillAppear.toString(), scanLabelPageWillDisappear);
}

export default function* sagas() {
  yield [
    watchShowAlert(),
    watchGoToEquipmentScanLabel(),
    watchScanLabelPageWillAppear(),
    watchScanLabelPageWillDisappear(),
  ];
}
