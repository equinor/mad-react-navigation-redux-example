import {
  put,
  take,
  select,
} from 'redux-saga/effects';
import {
  pageNavigationPageWillAppear,
  pageNavigationPageWillDisappear,
} from '../actions';


// TODO: Move previousRoute to store (by listening for PageNavigation/PAGE_WILL_APPEAR actions)
// NOTE: This code assumes that an PageNavigation/PAGE_WILL_APPEAR action is sent when loading
// the initial page
let previousRoute = null;

function* watchPageNavigation() {
  while (true) {
    yield take(action => action.type.startsWith('Navigation/'));

    const navigation = yield select(state => state.nav);
    const currentRoute = navigation.routes[navigation.index].routeName;

    if (previousRoute !== currentRoute) {
      yield put(pageNavigationPageWillDisappear(previousRoute));
      yield put(pageNavigationPageWillAppear(currentRoute));

      previousRoute = currentRoute;
    }
  }
}

export default function* sagas() {
  yield [
    watchPageNavigation(),
  ];
}
