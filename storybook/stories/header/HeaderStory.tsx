import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header, HeaderProps} from '../../../src/components';

export interface HeaderStoryProps extends HeaderProps {}

export default function HeaderStory({
  title = 'TITLE',
  leftComponent,
  rightComponent,
  ...props
}: HeaderStoryProps) {
  return (
    <View style={styles.container}>
      <Header
        {...props}
        title={title}
        leftComponent={
          leftComponent || <Icon style={styles.icon} name="th-list" />
        }
        rightComponent={
          rightComponent || <Icon style={styles.icon} name="home" />
        }
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
});
