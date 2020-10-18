import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ExpansionPanel} from '../../../src/components';

export default function ExpansionPanelStory() {
  return (
    <View style={styles.container}>
      <ExpansionPanel title="General Settings" subtitle="Nisi id ex dolor">
        <Text>
          Et pariatur ut labore culpa nisi fugiat Lorem cupidatat nulla. Aliquip
          voluptate ut laboris ex dolore laborum excepteur ullamco in velit
          velit. Non enim enim sit proident duis voluptate officia labore sunt
          anim excepteur aliqua adipisicing. Aliquip ipsum quis quis consequat
          tempor adipisicing cupidatat nulla officia.
        </Text>
      </ExpansionPanel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
