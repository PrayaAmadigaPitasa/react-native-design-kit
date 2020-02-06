import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Radio} from '../../../src';

export default function RadioStory() {
  return (
    <View style={styles.container}>
      <Radio
        radioIds={['Male', 'Female', 'Prefer Not to Say']}
        onSelect={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
