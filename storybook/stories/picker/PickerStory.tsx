import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Picker} from '../../../src';

export default function PickerStory() {
  return (
    <View style={styles.container}>
      <Picker
        data={['Apple', 'Melon', 'Banana', 'Pear', 'Grape']}
        keyExtractor={item => item}
        renderItem={({item}) => <Text>{item}</Text>}
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
