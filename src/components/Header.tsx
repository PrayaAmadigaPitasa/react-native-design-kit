import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

export interface HeaderProps {
  containerStyle?: ViewStyle;
  leftContainerStyle?: ViewStyle;
  centerContainerStyle?: ViewStyle;
  rightContainerStyle?: ViewStyle;
}

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer} />
      <View style={styles.centerContainer} />
      <View style={styles.rightContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 12,
    backgroundColor: 'dodgerblue',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'whitesmoke',
  },
  leftContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 3,
  },
  rightContainer: {
    flex: 1,
  },
});
