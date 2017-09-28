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

// TODO: Move previousRoute to store (by listening for PageNavigation/PAGE_WILL_APPEAR actions)
// NOTE: This code assumes that an PageNavigation/PAGE_WILL_APPEAR action is sent when loading the initial page
let previousRoute = null;

function* watchPageNavigation() {
  while (true) {
    yield take(action => action.type.startsWith('Navigation/'));

    const navigation = yield select(state => state.nav);
    const currentRoute = navigation.routes[navigation.index].routeName;

    if (previousRoute !== currentRoute) {
      yield put(actions.pageNavigationPageWillDisappear(previousRoute));
      yield put(actions.pageNavigationPageWillAppear(currentRoute));

      previousRoute = currentRoute;
    }
  }
}

export default function* sagas() {
  yield [
    watchShowAlert(),
    watchGoToEquipmentScanLabel(),
    watchPageNavigation(),
  ];
}
