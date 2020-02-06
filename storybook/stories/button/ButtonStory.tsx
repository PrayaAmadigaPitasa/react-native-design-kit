import React from 'react';
import {Button, ButtonProps} from '../../../src';
import {StyleSheet, View, Alert} from 'react-native';

export interface ButtonStoryProps extends ButtonProps {}

export default function ButtonStory({
  title = 'Button',
  ...props
}: ButtonStoryProps) {
  return (
    <View style={styles.container}>
      <Button
        {...props}
        title={title}
        onPress={() => Alert.alert('type: solid')}
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
