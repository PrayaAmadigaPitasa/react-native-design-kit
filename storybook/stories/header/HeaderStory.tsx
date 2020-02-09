import React from 'react';
import {HeaderProps, Header} from '../../../src';
import {StyleSheet, View} from 'react-native';

export interface HeaderStoryProps extends HeaderProps {}

export default function HeaderStory({...props}: HeaderStoryProps) {
  return (
    <View style={styles.container}>
      <Header {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
