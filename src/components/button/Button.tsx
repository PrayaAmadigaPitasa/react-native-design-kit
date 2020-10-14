import React, {ReactElement, ReactNode, useMemo} from 'react';
import {
  View,
  ViewStyle,
  Text,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import {ButtonType} from '../../types';
import {getStyleShadow} from '../../utilities';
import {Touchable} from '../touchable';

export interface ButtonIconProps {
  topIcon?: ReactElement;
  topIconContainerStyle?: ViewStyle;
  topIconAction?(): void;
  leftIcon?: ReactElement;
  leftIconContainerStyle?: ViewStyle;
  leftIconAction?(): void;
  rightIcon?: ReactElement;
  rightIconContainerStyle?: ViewStyle;
  rightIconAction?(): void;
  bottomIcon?: ReactElement;
  bottomIconContainerStyle?: ViewStyle;
  bottomIconAction?(): void;
}

export interface ButtonTypeProps {
  type?: ButtonType;
}

export interface ButtonTitleProps {
  title?: string;
  titleStyle?: TextStyle;
  titleContainerStyle?: ViewStyle;
}

export interface ButtonBaseProps {
  containerStyle?: ViewStyle;
  disabledContainerStyle?: ViewStyle;
  disabledTitleStyle?: ViewStyle;
}

export interface ButtonProps
  extends TouchableOpacityProps,
    ButtonIconProps,
    ButtonTypeProps,
    ButtonTitleProps,
    ButtonBaseProps {
  raised?: boolean;
  raisedStyle?: ViewStyle;
  children?: ReactNode;
}

export default function Button({
  type = 'solid',
  raised,
  raisedStyle,
  containerStyle,
  title,
  titleStyle,
  titleContainerStyle,
  disabled,
  disabledContainerStyle,
  disabledTitleStyle,
  topIcon,
  topIconContainerStyle,
  topIconAction,
  leftIcon,
  leftIconContainerStyle,
  leftIconAction,
  rightIcon,
  rightIconContainerStyle,
  rightIconAction,
  bottomIcon,
  bottomIconContainerStyle,
  bottomIconAction,
  children,
  ...props
}: ButtonProps) {
  const handleRenderTopIcon = useMemo(
    () =>
      topIcon && (
        <View
          style={StyleSheet.flatten([
            styles.topIconContainer,
            topIconContainerStyle,
          ])}>
          <Touchable type="normal" onPress={topIconAction}>
            {topIcon}
          </Touchable>
        </View>
      ),
    [topIcon, topIconContainerStyle, topIconAction],
  );

  const handleRenderLeftIcon = useMemo(
    () =>
      leftIcon && (
        <View
          style={StyleSheet.flatten([
            styles.leftIconContainer,
            leftIconContainerStyle,
          ])}>
          <Touchable type="normal" onPress={leftIconAction}>
            {leftIcon}
          </Touchable>
        </View>
      ),
    [leftIcon, leftIconContainerStyle, leftIconAction],
  );

  const handleRenderTitle = useMemo(
    () => (
      <View style={titleContainerStyle}>
        <Text
          style={StyleSheet.flatten([
            styles.title,
            type !== 'solid' && styles.titleNoBackground,
            titleStyle,
            disabled && disabledTitleStyle,
          ])}>
          {title}
        </Text>
      </View>
    ),
    [
      type,
      title,
      titleStyle,
      titleContainerStyle,
      disabled,
      disabledTitleStyle,
    ],
  );

  const handleRenderRightIcon = useMemo(
    () =>
      rightIcon && (
        <View
          style={StyleSheet.flatten([
            styles.rightIconContainer,
            rightIconContainerStyle,
          ])}>
          <Touchable type="normal" onPress={rightIconAction}>
            {rightIcon}
          </Touchable>
        </View>
      ),
    [rightIcon, rightIconContainerStyle, rightIconAction],
  );

  const handleRenderBottomIcon = useMemo(
    () =>
      bottomIcon && (
        <View
          style={StyleSheet.flatten([
            styles.bottomIconContainer,
            bottomIconContainerStyle,
          ])}>
          <Touchable type="normal" onPress={bottomIconAction}>
            {bottomIcon}
          </Touchable>
        </View>
      ),
    [bottomIcon, bottomIconContainerStyle, bottomIconAction],
  );

  return (
    <Touchable
      {...props}
      disabled={disabled}
      style={StyleSheet.flatten([
        styles.container,
        type === 'outline' && styles.containerOutlined,
        containerStyle,
        disabled &&
          StyleSheet.flatten([styles.disabled, disabledContainerStyle]),
        raised && [styles.containerRaised, raisedStyle],
        type !== 'solid' && styles.containerNoBackground,
        type === 'text' && styles.containerNoOutline,
      ])}>
      {handleRenderTopIcon}
      <View style={styles.sectionMain}>
        {handleRenderLeftIcon}
        {handleRenderTitle}
        {children}
        {handleRenderRightIcon}
      </View>
      {handleRenderBottomIcon}
    </Touchable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    width: 'auto',
    backgroundColor: 'dodgerblue',
    borderRadius: 4,
    overflow: 'hidden',
  },
  containerRaised: {
    ...getStyleShadow(),
  },
  containerNoBackground: {
    backgroundColor: 'transparent',
  },
  containerNoOutline: {
    borderWidth: 0,
  },
  containerOutlined: {
    borderWidth: 1,
    borderColor: 'dodgerblue',
  },
  topIconContainer: {
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIconContainer: {
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIconContainer: {
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomIconContainer: {
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  titleNoBackground: {
    color: 'dodgerblue',
  },
  disabled: {
    opacity: 0.6,
  },
});
