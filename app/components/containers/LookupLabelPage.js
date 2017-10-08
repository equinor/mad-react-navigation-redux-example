import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import {
  lookupLabelPageLookupLabel,
} from '../../actions';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


class LookupPage extends Component {
  static navigationOptions = {
    title: 'Lookup',
  };

  static propTypes = {
    lookupLabel: PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Lookup label: 234567" onPress={() => this.props.lookupLabel('234567')} />
        <Button title="Lookup label: 765432" onPress={() => this.props.lookupLabel('765432')} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  lookupLabel: label => dispatch(lookupLabelPageLookupLabel({ label })),
});

export default connect(null, mapDispatchToProps)(LookupPage);
