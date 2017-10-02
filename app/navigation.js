import PropTypes from 'prop-types';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultPage from './components/containers/DefaultPage';
import SearchMeetingRoomPage from './components/containers/SearchMeetingRoomPage';
import ScanLabelPage from './components/containers/ScanLabelPage';
import LookupLabelPage from './components/containers/LookupLabelPage';
import ReportMeetingRoomPage from './components/containers/ReportMeetingRoomPage';


const AppNavigator = StackNavigator({
  Default: { screen: DefaultPage },
  SearchMeetingRoom: { screen: SearchMeetingRoomPage },
  ScanLabel: { screen: ScanLabelPage },
  LookupLabel: { screen: LookupLabelPage },
  ReportMeetingRoom: { screen: ReportMeetingRoomPage },
});

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Default'));

export const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

class App extends Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })}
      />
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(App);
