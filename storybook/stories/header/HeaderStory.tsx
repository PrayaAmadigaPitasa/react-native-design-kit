import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {HeaderProps, Header} from '../../../src';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface HeaderStoryProps extends HeaderProps {}

export default function HeaderStory({...props}: HeaderStoryProps) {
  return (
    <View style={styles.container}>
      <Header
        {...props}
        leftComponent={<Icon style={styles.icon} name="th-list" />}
        centerComponent={<Text style={styles.title}>TITLE</Text>}
        rightComponent={<Icon style={styles.icon} name="home" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    fontSize: 20,
    color: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
