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
import * as colors from '../../stylesheets/colors';
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
    const separatorInsetLeft = (15 * 2) + 29; // margin * 2 + iconWidth
    const marginRight = 15;

    return (
      <ScrollView style={styles.scrollView}>
        <TableView>
          <Section
            separatorInsetLeft={separatorInsetLeft}
            header="REPORT MEETING ROOM"
            footer="Quickly report incidents related to IT equipment in meeting rooms."
          >
            <BasicCell
              cellImageView={<RoundedSquareIcon backgroundColor={colors.PINK} icon={<Icon name="ios-pin" size={17} color="white" />} style={{ marginRight }} />}
              title="Search meeting room"
              onPress={() => this.props.dispatch(actions.goToMeetingRoomSearch())}
              accessory="DisclosureIndicator"
            />
            <BasicCell
              cellImageView={<RoundedSquareIcon backgroundColor={colors.PINK} icon={<Icon name="md-camera" size={17} color="white" />} style={{ marginRight }} />}
              title="Scan yellow label"
              onPress={() => this.props.dispatch(actions.goToMeetingRoomScanLabel())}
              accessory="DisclosureIndicator"
            />
            <BasicCell
              cellImageView={<RoundedSquareIcon backgroundColor={colors.PINK} icon={<MIcon name="label-outline" size={17} color="white" />} style={{ marginRight }} />}
              title="Look up yellow label"
              onPress={() => this.props.dispatch(actions.goToMeetingRoomLookupLabel())}
              accessory="DisclosureIndicator"
            />
          </Section>
          <Section
            separatorInsetLeft={separatorInsetLeft}
            header="REPORT IT EQUIPMENT"
            footer="Quickly report incidents related to IT equipment."
          >
            <BasicCell
              cellImageView={<RoundedSquareIcon backgroundColor={colors.PINK} icon={<Icon name="md-camera" size={17} color="white" />} style={{ marginRight }} />}
              title="Scan yellow label"
              onPress={() => this.props.dispatch(actions.goToEquipmentScanLabel())}
              accessory="DisclosureIndicator"
            />
            <BasicCell
              cellImageView={<RoundedSquareIcon backgroundColor={colors.PINK} icon={<MIcon name="label-outline" size={17} color="white" />} style={{ marginRight }} />}
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
