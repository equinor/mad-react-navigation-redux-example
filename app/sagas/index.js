import {
  call,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  Alert,
} from 'react-native';
import * as actions from '../actions';


function* showAlert(action) {
  const { title, message } = action.payload;
  yield call(Alert.alert, title, message);
}

function* watchShowAlert() {
  yield takeEvery(actions.showAlert.toString(), showAlert);
}

export default function* sagas() {
  yield [
    watchShowAlert(),
  ];
}
