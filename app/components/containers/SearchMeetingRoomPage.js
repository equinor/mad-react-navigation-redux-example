import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import {
  TableView,
  Section,
} from 'react-native-tableview-simple';
import BasicCell from '../atoms/BasicCell';
import { connect } from 'react-redux';
import * as actions from '../../actions';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Section.defaultProps.sectionTintColor,
  },
  searchBarContainer: {
    padding: 6,
    backgroundColor: 'gray',
  },
  searchBar: { // TODO: Temp
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});


class SearchMeetingRoomPage extends Component {
  static navigationOptions = {
    title: 'Search',
  };

  static propTypes = {
    searchMeetingRoom: PropTypes.func.isRequired,
  };

  render() {
    const titlebarHeight = 64;

    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <TextInput autoFocus placeholder="Search for meeting room" onChangeText={(text) => {}} style={styles.searchBar} />
        </View>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={titlebarHeight} style={styles.keyboardAvoidingView}>
          <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>
            <TableView>
              <Section sectionPaddingTop={0} sectionPaddingBottom={0}>
                <BasicCell title="Search meeting room" onPress={() => this.props.searchMeetingRoom('SEARCHED')} accessory="DisclosureIndicator" />
                <BasicCell title="Last" onPress={() => console.log('test')} accessory="DisclosureIndicator" />
              </Section>
            </TableView>
            <Button title="Search meeting room: L123" onPress={() => this.props.searchMeetingRoom('L123')} />
            <Button title="Search meeting room: L567" onPress={() => this.props.searchMeetingRoom('L567')} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  searchMeetingRoom: meetingRoom => dispatch(actions.searchMeetingRoom({ meetingRoom })),
});

export default connect(null, mapDispatchToProps)(SearchMeetingRoomPage);
