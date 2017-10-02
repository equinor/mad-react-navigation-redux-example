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
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import RoundedSquareIcon from '../atoms/RoundedSquareIcon';
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
    const separatorInsetLeft = 54;

    return (
      <ScrollView style={styles.scrollView}>
        <TableView>
          <Section header="MEETING ROOM" separatorInsetLeft={separatorInsetLeft}>
            <BasicCell
              cellImageView={<RoundedSquareIcon backgroundColor="gray" icon={<Icon name="ios-pin" size={17} color="white" />} style={{ marginRight: 10 }} />}
              title="Search meeting room"
              onPress={() => this.props.dispatch(actions.goToMeetingRoomSearch())}
              accessory="DisclosureIndicator"
            />
            <BasicCell
              cellImageView={<RoundedSquareIcon backgroundColor="gray" icon={<Icon name="md-camera" size={17} color="white" />} style={{ marginRight: 10 }} />}
              title="Scan yellow label"
              onPress={() => this.props.dispatch(actions.goToMeetingRoomScanLabel())}
              accessory="DisclosureIndicator"
            />
            <BasicCell
              cellImageView={<RoundedSquareIcon backgroundColor="gray" icon={<MIcon name="label-outline" size={17} color="white" />} style={{ marginRight: 10 }} />}
              title="Look up yellow label"
              onPress={() => this.props.dispatch(actions.goToMeetingRoomLookupLabel())}
              accessory="DisclosureIndicator"
            />
          </Section>
          <Section header="EQUIPMENT" separatorInsetLeft={separatorInsetLeft}>
            <BasicCell
              cellImageView={<RoundedSquareIcon backgroundColor="gray" icon={<Icon name="md-camera" size={17} color="white" />} style={{ marginRight: 10 }} />}
              title="Scan yellow label"
              onPress={() => this.props.dispatch(actions.goToEquipmentScanLabel())}
              accessory="DisclosureIndicator"
            />
            <BasicCell
              cellImageView={<RoundedSquareIcon backgroundColor="gray" icon={<MIcon name="label-outline" size={17} color="white" />} style={{ marginRight: 10 }} />}
              title="Look up yellow label"
              onPress={() => this.props.dispatch(actions.goToEquipmentLookupLabel())}
              accessory="DisclosureIndicator"
            />
          </Section>
        </TableView>
      </ScrollView>
    );
  }
}

export default connect()(DefaultPage);
