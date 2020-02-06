import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {ButtonGroup, ButtonGroupProps} from '../../../src';

export interface ButtonGroupStoryProps extends ButtonGroupProps {}

export default function ButtonGroupStory({...props}: ButtonGroupStoryProps) {
  return (
    <View style={styles.container}>
      <ButtonGroup
        {...props}
        buttonIds={['Apple', 'Melon', 'Banana', 'Pear', 'Grape']}
        onSelect={id => Alert.alert(`id: ${id}`)}
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
