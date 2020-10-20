import React from 'react';
import {View, StyleSheet, ViewStyle, TextStyle, Text} from 'react-native';

export type HeaderPlacement = 'left' | 'center' | 'right';

export interface HeaderProps {
  placement?: HeaderPlacement;
  title?: string;
  titleStyle?: TextStyle;
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
  placement,
  title,
  titleStyle,
  containerStyle,
  leftComponent,
  leftContainerStyle,
  centerComponent,
  centerContainerStyle,
  rightComponent,
  rightContainerStyle,
  sectionContainerStyle,
}: HeaderProps) {
  function getPlacement() {
    switch (placement) {
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      default:
        return 'center';
    }
  }

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
          placement !== undefined && {justifyContent: getPlacement()},
        ])}>
        {centerComponent !== undefined ? (
          centerComponent
        ) : (
          <Text style={StyleSheet.flatten([styles.title, titleStyle])}>
            {title}
          </Text>
        )}
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
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    paddingRight: 16,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
