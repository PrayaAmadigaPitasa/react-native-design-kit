import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
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
}) {
  return React.createElement(
    TouchableOpacity,
    Object.assign({}, props, {
      style: StyleSheet.flatten([
        styles.container,
        type === 'outline' && styles.containerOutlined,
        containerStyle,
        disabled && {...styles.disabled, ...disabledContainerStyle},
        raised && [styles.containerRaised, raisedStyle],
        type !== 'solid' && styles.containerNoBackground,
        type === 'text' && styles.containerNoOutline,
      ]),
      activeOpacity: activeOpacity,
    }),
    topIcon &&
      React.createElement(
        View,
        {
          style: StyleSheet.flatten([
            styles.topIconContainer,
            topIconContainerStyle,
          ]),
        },
        React.createElement(
          TouchableWithoutFeedback,
          {onPress: topIconAction},
          topIcon,
        ),
      ),
    React.createElement(
      View,
      {style: styles.sectionMain},
      leftIcon &&
        React.createElement(
          View,
          {
            style: StyleSheet.flatten([
              styles.leftIconContainer,
              leftIconContainerStyle,
            ]),
          },
          React.createElement(
            TouchableWithoutFeedback,
            {onPress: leftIconAction},
            leftIcon,
          ),
        ),
      React.createElement(
        View,
        {style: titleContainerStyle},
        React.createElement(
          Text,
          {
            style: [
              styles.title,
              type !== 'solid' && styles.titleNoBackground,
              titleStyle,
              disabled && {...disabledTitleStyle},
            ],
          },
          title,
        ),
      ),
      children,
      rightIcon &&
        React.createElement(
          View,
          {
            style: StyleSheet.flatten([
              styles.rightIconContainer,
              rightIconContainerStyle,
            ]),
          },
          React.createElement(
            TouchableWithoutFeedback,
            {onPress: rightIconAction},
            rightIcon,
          ),
        ),
    ),
    bottomIcon &&
      React.createElement(
        View,
        {
          style: StyleSheet.flatten([
            styles.bottomIconContainer,
            bottomIconContainerStyle,
          ]),
        },
        React.createElement(
          TouchableWithoutFeedback,
          {onPress: bottomIconAction},
          bottomIcon,
        ),
      ),
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 12,
    width: 'auto',
    backgroundColor: '#598bff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  containerRaised: {
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#9a9a9a',
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
    borderColor: '#598bff',
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
  },
  titleNoBackground: {
    color: '#598bff',
  },
  disabled: {
    opacity: 0.6,
  },
});
