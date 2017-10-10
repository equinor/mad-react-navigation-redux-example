import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import {
  scanLabelPageLabelRecognized,
} from '../../actions';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


class ScanLabelPage extends Component {
  static navigationOptions = {
    title: 'Scan',
  };

  static propTypes = {
    labelRecognized: PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Label recognized: 123456" onPress={() => this.props.labelRecognized('123456')} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  labelRecognized: label => dispatch(scanLabelPageLabelRecognized({ label })),
});

export default connect(null, mapDispatchToProps)(ScanLabelPage);
