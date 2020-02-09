import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

export interface HeaderProps {
  containerStyle?: ViewStyle;
  leftComponent?: JSX.Element;
  leftContainerStyle?: ViewStyle;
  centerComponent?: JSX.Element;
  centerContainerStyle?: ViewStyle;
  rightComponent?: JSX.Element;
  rightContainerStyle?: ViewStyle;
  sectionContainerStyle?: ViewStyle;
}

export default function Header({
  containerStyle,
  leftComponent,
  leftContainerStyle,
  centerComponent,
  centerContainerStyle,
  rightComponent,
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
        ])}>
        {leftComponent}
      </View>
      <View
        style={StyleSheet.flatten([
          styles.sectionContainer,
          styles.centerContainer,
          sectionContainerStyle,
          centerContainerStyle,
        ])}>
        {centerComponent}
      </View>
      <View
        style={StyleSheet.flatten([
          styles.sectionContainer,
          styles.rightContainer,
          sectionContainerStyle,
          rightContainerStyle,
        ])}>
        {rightComponent}
      </View>
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
    paddingLeft: 16,
    justifyContent: 'flex-start',
  },
  centerContainer: {
    flex: 6,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    paddingRight: 16,
    justifyContent: 'flex-end',
  },
});
