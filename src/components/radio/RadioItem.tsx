import React, {ReactNode, useEffect, useRef} from 'react';
import {Animated, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Text} from '../text';
import {Touchable, TouchableProps} from '../touchable';

export interface RadioBaseProps extends TouchableProps {
  radioIconContainerStyle?: ViewStyle;
  radioComponentContainerStyle?: ViewStyle;
  selectedRadio?: JSX.Element;
  selectedRadioStyle?: ViewStyle;
  selectedRadioIconContainerStyle?: ViewStyle;
  selectedRadioComponentContainerStyle?: ViewStyle;
  selectedRadioTitleStyle?: ViewStyle;
  disabledRadio?: JSX.Element;
}

export interface RadioItemProps extends RadioBaseProps {
  title?: string;
  titleStyle?: TextStyle;
  isSelected?: boolean;
  children?: ReactNode;
}

export default function RadioItem({
  isSelected = false,
  style,
  title,
  titleStyle,
  selectedRadio = <DefaultSelectedRadio />,
  selectedRadioStyle,
  selectedRadioIconContainerStyle,
  selectedRadioComponentContainerStyle,
  selectedRadioTitleStyle,
  disabledRadio = <DefaultDisabledRadio />,
  radioIconContainerStyle,
  radioComponentContainerStyle,
  children,
  ...props
}: RadioItemProps) {
  return (
    <Touchable
      {...props}
      touchableType="opacity"
      style={StyleSheet.flatten([
        styles.radioContainer,
        style,
        isSelected && selectedRadioStyle,
      ])}>
      <View
        style={StyleSheet.flatten([
          radioIconContainerStyle,
          isSelected && selectedRadioIconContainerStyle,
        ])}>
        {isSelected ? selectedRadio : disabledRadio}
      </View>
      <View
        style={StyleSheet.flatten([
          styles.radioComponentContainer,
          radioComponentContainerStyle,
          isSelected && selectedRadioComponentContainerStyle,
        ])}>
        {typeof children === 'object' ? (
          children
        ) : (
          <Text
            style={StyleSheet.flatten([
              styles.title,
              titleStyle,
              isSelected && selectedRadioTitleStyle,
            ])}>
            {title}
          </Text>
        )}
      </View>
    </Touchable>
  );
}

function DefaultSelectedRadio() {
  const animation = useRef(new Animated.Value(0)).current;
  const sizeOuter = useRef(18).current;
  const sizeInner = useRef(sizeOuter - 6).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View
      style={StyleSheet.flatten([
        {
          height: sizeOuter,
          width: sizeOuter,
          borderRadius: sizeOuter / 2,
        },
        styles.defaultSelectedRadioContainer,
      ])}>
      <Animated.View
        style={StyleSheet.flatten([
          styles.defaultSelectedRadioInnerContainer,
          {
            height: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, sizeInner],
            }),
            width: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, sizeInner],
            }),
            borderRadius: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, sizeInner / 2],
            }),
          },
        ])}
      />
    </View>
  );
}

function DefaultDisabledRadio() {
  const size = useRef(18).current;

  return (
    <View
      style={StyleSheet.flatten([
        {
          height: size,
          width: size,
          borderRadius: size / 2,
        },
        styles.defaultDisabledRadioContainer,
      ])}
    />
  );
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  radioComponentContainer: {
    marginLeft: 12,
  },
  defaultDisabledRadioContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'whitesmoke',
  },
  defaultSelectedRadioContainer: {
    borderWidth: 1,
    borderColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultSelectedRadioInnerContainer: {
    backgroundColor: 'dodgerblue',
  },
  title: {
    fontSize: 15,
  },
});
