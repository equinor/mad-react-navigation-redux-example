import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import {
  TableView,
  Section,
  Cell,
} from 'react-native-tableview-simple';


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
            <CellVariant title="Search" onPress={() => this.props.navigation.navigate('Search')} accessory="DisclosureIndicator" />
            <CellVariant title="Scan label" onPress={() => this.props.navigation.navigate('ScanLabel')} accessory="DisclosureIndicator" />
            <CellVariant title="Lookup" onPress={() => this.props.navigation.navigate('Lookup')} accessory="DisclosureIndicator" />
          </Section>
          <Section header="EQUIPMENT">
            <CellVariant title="Scan label" onPress={() => this.props.navigation.navigate('ScanLabel')} accessory="DisclosureIndicator" />
            <CellVariant title="Lookup" onPress={() => this.props.navigation.navigate('Lookup')} accessory="DisclosureIndicator" />
          </Section>
        </TableView>
      </ScrollView>
    );
  }
}

export default DefaultPage;
