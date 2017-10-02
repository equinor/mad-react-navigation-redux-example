import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


class SearchMeetingRoomPage extends Component {
  static navigationOptions = {
    title: 'Search',
  };

  static propTypes = {
    searchMeetingRoom: PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Search meeting room: L123" onPress={() => this.props.searchMeetingRoom('L123')} />
        <Button title="Search meeting room: L567" onPress={() => this.props.searchMeetingRoom('L567')} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  searchMeetingRoom: meetingRoom => dispatch(actions.searchMeetingRoom({ meetingRoom })),
});

export default connect(null, mapDispatchToProps)(SearchMeetingRoomPage);
