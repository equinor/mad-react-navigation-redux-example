import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import {
  TableView,
  Section,
  Cell,
} from 'react-native-tableview-simple';
import * as actions from '../../actions';


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Section.defaultProps.sectionTintColor,
    paddingVertical: 10,
  },
});


const CellVariant = props => (
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

CellVariant.propTypes = {
  title: PropTypes.string.isRequired,
};


class DefaultPage extends Component {
  static navigationOptions = {
    title: 'PleaseFix',
  };

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <TableView>
          <Section header="MEETING ROOM">
            <CellVariant title="Search" onPress={() => this.props.dispatch(actions.goToMeetingRoomSearch())} accessory="DisclosureIndicator" />
            <CellVariant title="Scan label" onPress={() => this.props.dispatch(actions.goToMeetingRoomScanLabel())} accessory="DisclosureIndicator" />
            <CellVariant title="Lookup" onPress={() => this.props.dispatch(actions.goToMeetingRoomLookup())} accessory="DisclosureIndicator" />
          </Section>
          <Section header="EQUIPMENT">
            <CellVariant title="Scan label" onPress={() => this.props.dispatch(actions.goToEquipmentScanLabel())} accessory="DisclosureIndicator" />
            <CellVariant title="Lookup" onPress={() => this.props.dispatch(actions.goToEquipmentLookup())} accessory="DisclosureIndicator" />
          </Section>
        </TableView>
      </ScrollView>
    );
  }
}

DefaultPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(DefaultPage);
