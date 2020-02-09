import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

export interface HeaderProps {
  containerStyle?: ViewStyle;
  leftContainerStyle?: ViewStyle;
  centerContainerStyle?: ViewStyle;
  rightContainerStyle?: ViewStyle;
  sectionContainerStyle?: ViewStyle;
}

export default function Header({
  containerStyle,
  leftContainerStyle,
  centerContainerStyle,
  rightContainerStyle,
  sectionContainerStyle,
}: HeaderProps) {
  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <View
        style={StyleSheet.flatten([
          styles.sectionContainer,
          styles.leftContainer,
          sectionContainerStyle,
          leftContainerStyle,
        ])}
      />
      <View
        style={StyleSheet.flatten([
          styles.sectionContainer,
          styles.centerContainer,
          sectionContainerStyle,
          centerContainerStyle,
        ])}
      />
      <View
        style={StyleSheet.flatten([
          styles.sectionContainer,
          styles.rightContainer,
          sectionContainerStyle,
          rightContainerStyle,
        ])}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'whitesmoke',
  },
  sectionContainer: {
    flexDirection: 'row',
    height: '100%',
    paddingVertical: 16,
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 6,
  },
  rightContainer: {
    flex: 1,
  },
});
