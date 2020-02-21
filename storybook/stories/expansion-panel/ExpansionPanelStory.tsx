import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ExpansionPanel} from '../../../src';

export default function ExpansionPanelStory() {
  return (
    <View style={styles.container}>
      <ExpansionPanel
        title="General Settings"
        subtitle="Nisi id ex dolor"
        content="Deserunt ipsum id magna ut culpa ipsum deserunt non irure ut. Laboris fugiat commodo quis ea velit aliquip Lorem nulla adipisicing adipisicing culpa occaecat proident. Consequat fugiat sint nulla elit aliquip labore ullamco dolor. Commodo consectetur ullamco eiusmod eiusmod proident id. Nulla sit nisi ex ex anim esse est incididunt duis nulla nisi esse deserunt."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
