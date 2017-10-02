import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  Cell,
} from 'react-native-tableview-simple';


const BasicCell = props => (
  <Cell
    {...props}
    cellContentView={
      <View
        style={{ alignItems: 'center', flexDirection: 'row', flex: 1, paddingVertical: 10 }}
      >
        <Text
          allowFontScaling
          numberOfLines={1}
          style={{ fontSize: 17 }}
        >
          {props.title}
        </Text>
      </View>
    }
  />
);

BasicCell.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BasicCell;
