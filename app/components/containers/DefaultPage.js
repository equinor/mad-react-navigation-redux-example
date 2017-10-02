import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import {
  TableView,
  Section,
} from 'react-native-tableview-simple';
import BasicCell from '../atoms/BasicCell';
import * as actions from '../../actions';


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Section.defaultProps.sectionTintColor,
    paddingVertical: 10,
  },
});


class DefaultPage extends Component {
  static navigationOptions = {
    title: 'PleaseFix',
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <TableView>
          <Section header="MEETING ROOM">
            <BasicCell title="Search meeting room" onPress={() => this.props.dispatch(actions.goToMeetingRoomSearch())} accessory="DisclosureIndicator" />
            <BasicCell title="Scan yellow label" onPress={() => this.props.dispatch(actions.goToMeetingRoomScanLabel())} accessory="DisclosureIndicator" />
            <BasicCell title="Look up yellow label" onPress={() => this.props.dispatch(actions.goToMeetingRoomLookupLabel())} accessory="DisclosureIndicator" />
          </Section>
          <Section header="EQUIPMENT">
            <BasicCell title="Scan yellow label" onPress={() => this.props.dispatch(actions.goToEquipmentScanLabel())} accessory="DisclosureIndicator" />
            <BasicCell title="Look up yellow label" onPress={() => this.props.dispatch(actions.goToEquipmentLookupLabel())} accessory="DisclosureIndicator" />
          </Section>
        </TableView>
      </ScrollView>
    );
  }
}

export default connect()(DefaultPage);
