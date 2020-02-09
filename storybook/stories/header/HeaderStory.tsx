import React from 'react';
import {HeaderProps, Header} from '../../../src';
import {StyleSheet, View, Text} from 'react-native';

export interface HeaderStoryProps extends HeaderProps {}

export default function HeaderStory({...props}: HeaderStoryProps) {
  return (
    <View style={styles.container}>
      <Header
        {...props}
        centerComponent={<Text style={styles.title}>TITLE</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
});
