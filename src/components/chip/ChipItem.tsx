import React, {ReactNode, useState} from 'react';
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
  rounded?: boolean;
  children?: ReactNode;
}

export interface ChipItemProps
  extends ButtonIconProps,
    ButtonTitleProps,
    ChipItemBaseProps {}

export function ChipItem({
  rounded = true,
  titleStyle,
  containerStyle,
  children,
  ...props
}: ChipItemProps) {
  const [borderRadius, setBorderRadius] = useState<number>(0);

  return (
    <Button
      {...props}
      onLayout={event => {
        const {height, width} = event.nativeEvent.layout;

        setBorderRadius(Math.min(height, width) / 2);
      }}
      containerStyle={StyleSheet.flatten([
        styles.chipContainer,
        containerStyle,
        rounded ? {borderRadius: borderRadius} : {},
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
