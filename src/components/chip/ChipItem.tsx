import React, {ReactNode} from 'react';
import {StyleSheet, TouchableOpacityProps} from 'react-native';
import {
  Button,
  ButtonBaseProps,
  ButtonIconProps,
  ButtonTitleProps,
} from '../button';

export interface ChipItemBaseProps
  extends TouchableOpacityProps,
    ButtonBaseProps {
  children?: ReactNode;
}

export interface ChipItemProps
  extends ButtonIconProps,
    ButtonTitleProps,
    ChipItemBaseProps {}

export function ChipItem({
  titleStyle,
  containerStyle,
  children,
  ...props
}: ChipItemProps) {
  return (
    <Button
      {...props}
      containerStyle={StyleSheet.flatten([
        styles.chipContainer,
        containerStyle,
      ])}
      titleStyle={StyleSheet.flatten([styles.chipTitle, titleStyle])}
      titleContainerStyle={styles.chipTitleContainer}
      leftIconContainerStyle={styles.chipLeftIconContainer}
      rightIconContainerStyle={styles.chipRightIconContainer}>
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    padding: 7.5,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipTitle: {
    fontWeight: 'normal',
    color: 'black',
  },
  chipTitleContainer: {
    marginHorizontal: 5,
  },
  chipLeftIconContainer: {
    marginRight: 0,
  },
  chipRightIconContainer: {
    marginLeft: 0,
  },
  scrollLeftIconContainer: {
    marginRight: 5,
  },
  scrollRightIconContainer: {
    marginLeft: 5,
  },
});
