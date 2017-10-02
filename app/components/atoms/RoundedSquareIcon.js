import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  defaultStyles: {
    width: 29,
    height: 29,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const RoundedSquareIcon = ({ style, icon, backgroundColor }) => (
  <View style={[styles.defaultStyles, style, { backgroundColor }]}>
    {icon}
  </View>
);

RoundedSquareIcon.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  style: View.propTypes.style,
  icon: PropTypes.object.isRequired,
};

RoundedSquareIcon.defaultProps = {
  style: {},
};

export default RoundedSquareIcon;
