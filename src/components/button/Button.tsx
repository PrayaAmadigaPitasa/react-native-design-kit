import React, {ReactElement, ReactNode, useMemo} from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  Text,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

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
  type?: 'solid' | 'outline' | 'text';
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
  activeOpacity = 0.5,
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
          <TouchableWithoutFeedback onPress={topIconAction}>
            {topIcon}
          </TouchableWithoutFeedback>
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
          <TouchableWithoutFeedback onPress={leftIconAction}>
            {leftIcon}
          </TouchableWithoutFeedback>
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
    [title, titleStyle, titleContainerStyle, disabled],
  );

  return (
    <TouchableOpacity
      {...props}
      testID="button-container"
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
      ])}
      activeOpacity={activeOpacity}>
      {handleRenderTopIcon}
      <View style={styles.sectionMain}>
        {handleRenderLeftIcon}
        {handleRenderTitle}
        {children}
        {rightIcon && (
          <View
            style={StyleSheet.flatten([
              styles.rightIconContainer,
              rightIconContainerStyle,
            ])}>
            <TouchableWithoutFeedback onPress={rightIconAction}>
              {rightIcon}
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
      {bottomIcon && (
        <View
          style={StyleSheet.flatten([
            styles.bottomIconContainer,
            bottomIconContainerStyle,
          ])}>
          <TouchableWithoutFeedback onPress={bottomIconAction}>
            {bottomIcon}
          </TouchableWithoutFeedback>
        </View>
      )}
    </TouchableOpacity>
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
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: 'darkgray',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
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
