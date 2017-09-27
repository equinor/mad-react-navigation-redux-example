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
    cellContentView={
      <View
        style={{ alignItems: 'center', flexDirection: 'row', flex: 1, paddingVertical: 10 }}
      >
        <Text
          allowFontScaling
          numberOfLines={2}
          style={{ fontSize: 17 }}
        >
          {props.title}
        </Text>
      </View>
    }
  />
);


class DefaultPage extends Component {
  static navigationOptions = {
    title: 'PleaseFix',
  };

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <TableView>
          <Section>
            <CellVariant title="Element 1" />
            <CellVariant title="Element 2" />
            <CellVariant title="Element 3" />
            <CellVariant title="Element 4" />
          </Section>
        </TableView>
      </ScrollView>
    );
  }
}

export default DefaultPage;
