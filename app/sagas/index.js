import {
  call,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  Alert,
} from 'react';
import * as actions from '../actions';


function* showAlert(action) {
  yield call(Alert.alert, action.title, action.message);
}

function* watchShowAlert() {
  yield takeEvery(actions.showAlert.toString(), showAlert);
}

export default function* sagas() {
  yield [
    watchShowAlert,
  ];
}
