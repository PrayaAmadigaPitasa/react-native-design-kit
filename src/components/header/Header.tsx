import React, {ReactElement, useMemo} from 'react';
import {View, StyleSheet, ViewStyle, TextStyle, Text} from 'react-native';
import {HeaderPlacement} from '../../types';

export interface HeaderProps {
  placement?: HeaderPlacement;
  title?: string;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  leftComponent?: ReactElement;
  leftContainerStyle?: ViewStyle;
  centerComponent?: ReactElement;
  centerContainerStyle?: ViewStyle;
  rightComponent?: ReactElement;
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
  const justifyContent = useMemo(() => {
    switch (placement) {
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      default:
        return 'center';
    }
  }, [placement]);

  const handleRenderLeftComponent = useMemo(
    () => (
      <View
        style={StyleSheet.flatten([
          styles.sectionContainer,
          styles.leftContainer,
          sectionContainerStyle,
          leftContainerStyle,
        ])}>
        {leftComponent}
      </View>
    ),
    [sectionContainerStyle, leftContainerStyle, leftComponent],
  );

  const handleRenderCenterComponent = useMemo(
    () => (
      <View
        style={StyleSheet.flatten([
          styles.sectionContainer,
          styles.centerContainer,
          sectionContainerStyle,
          centerContainerStyle,
          placement && {justifyContent},
        ])}>
        {centerComponent ? (
          centerComponent
        ) : (
          <Text style={StyleSheet.flatten([styles.title, titleStyle])}>
            {title}
          </Text>
        )}
      </View>
    ),
    [
      sectionContainerStyle,
      centerContainerStyle,
      placement,
      centerComponent,
      title,
      titleStyle,
      justifyContent,
    ],
  );

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {handleRenderLeftComponent}
      {handleRenderCenterComponent}
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
