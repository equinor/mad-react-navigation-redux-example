import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {
  TableView,
  Section,
} from 'react-native-tableview-simple';
import { connect } from 'react-redux';
import BasicCell from '../atoms/BasicCell';
import {
  searchMeetingRoomPageSearchTextChanged,
  searchMeetingRoomPageMeetingRoomSelected,
} from '../../actions';
import { getMeetingRooms } from '../../reducers/searchMeetingRoom';


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
    meetingRooms: PropTypes.array.isRequired,
    searchTextChanged: PropTypes.func.isRequired,
    meetingRoomSelected: PropTypes.func.isRequired,
  };

  render() {
    const titlebarHeight = 64;

    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <TextInput
            autoFocus
            placeholder="Search for meeting room"
            onChangeText={text => this.props.searchTextChanged(text)}
            style={styles.searchBar}
          />
        </View>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={titlebarHeight} style={styles.keyboardAvoidingView}>
          <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>
            <TableView>
              <Section sectionPaddingTop={0} sectionPaddingBottom={0}>
                {this.props.meetingRooms.map(meetingRoom => (
                  <BasicCell
                    key={meetingRoom.id}
                    title={meetingRoom.title}
                    onPress={() => this.props.meetingRoomSelected(meetingRoom.id)}
                    accessory="DisclosureIndicator"
                  />
                ))}
              </Section>
            </TableView>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  meetingRooms: getMeetingRooms(state),
});

const mapDispatchToProps = dispatch => ({
  searchTextChanged: searchTerm => dispatch(searchMeetingRoomPageSearchTextChanged({ searchTerm })),
  meetingRoomSelected: meetingRoom => dispatch(searchMeetingRoomPageMeetingRoomSelected({ meetingRoom })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchMeetingRoomPage);
