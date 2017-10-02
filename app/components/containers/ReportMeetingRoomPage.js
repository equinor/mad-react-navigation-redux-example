import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
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
});


class MeetingRoomPage extends Component {
  static navigationOptions = {
    title: 'Meeting room',
  };

  static propTypes = {
    label: PropTypes.string.isRequired,
    meetingRoom: PropTypes.string.isRequired,
    report: PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Label: {this.props.label}</Text>
        <Text>Meeting room: {this.props.meetingRoom}</Text>
        <Button title="Submit" onPress={() => this.props.report()} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  report: () => dispatch(actions.report()),
});

const mapStateToProps = (state, ownProps) => {
  const {
    label,
    meetingRoom,
  } = ownProps.navigation.state.params;

  return {
    label,
    meetingRoom,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingRoomPage);
