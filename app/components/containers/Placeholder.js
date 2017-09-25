import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { getCount } from '../../reducers/counter';


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


class Placeholder extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Text>Counter: {this.props.count}</Text>
        <Button title="Increment" onPress={() => this.props.increment()} />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  increment: () => dispatch(actions.incrementCounter()),
});

const mapStateToProps = (state, ownProps) => ({
  count: getCount(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Placeholder);
