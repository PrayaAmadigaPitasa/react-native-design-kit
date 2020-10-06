import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ViewStyle, TextStyle, Text} from 'react-native';
import {Button} from './button';

export interface StepperProps {
  containerStyle?: ViewStyle;
  buttonContainerStyle?: ViewStyle;
  buttonTitleStyle?: TextStyle;
  buttonDisabledContainerStyle?: ViewStyle;
  buttonDisabledTitleStyle?: TextStyle;
  inputStyle?: TextStyle;
  inputContainerStyle?: ViewStyle;
  directEdit?: boolean;
  value?: number;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  multiplier?: number;
  onChangeValue?(value: number): void;
}

export default function Stepper({
  containerStyle,
  buttonContainerStyle,
  buttonTitleStyle,
  buttonDisabledContainerStyle,
  buttonDisabledTitleStyle,
  inputStyle,
  inputContainerStyle,
  value,
  minValue,
  maxValue,
  defaultValue = 0,
  multiplier = 1,
  onChangeValue,
}: StepperProps) {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    value && setInputValue(value);
  }, [value]);

  useEffect(() => {
    onChangeValue && onChangeValue(inputValue);
  }, [inputValue]);

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <Button
        containerStyle={StyleSheet.flatten([
          styles.buttonContainer,
          buttonContainerStyle,
        ])}
        title="-"
        titleStyle={StyleSheet.flatten([styles.buttonTitle, buttonTitleStyle])}
        disabled={minValue !== undefined ? inputValue <= minValue : false}
        disabledContainerStyle={buttonDisabledContainerStyle}
        disabledTitleStyle={buttonDisabledTitleStyle}
        onPress={() => {
          const val = inputValue - Math.max(1, multiplier);
          setInputValue(minValue !== undefined ? Math.max(minValue, val) : val);
        }}
      />
      <View
        style={StyleSheet.flatten([
          styles.inputContainer,
          inputContainerStyle,
        ])}>
        <Text style={StyleSheet.flatten([styles.input, inputStyle])}>
          {inputValue}
        </Text>
      </View>
      <Button
        containerStyle={StyleSheet.flatten([
          styles.buttonContainer,
          buttonContainerStyle,
        ])}
        title="+"
        titleStyle={StyleSheet.flatten([styles.buttonTitle, buttonTitleStyle])}
        disabled={maxValue !== undefined ? inputValue >= maxValue : false}
        disabledContainerStyle={buttonDisabledContainerStyle}
        disabledTitleStyle={buttonDisabledTitleStyle}
        onPress={() => {
          const val = inputValue + Math.max(1, multiplier);
          setInputValue(maxValue !== undefined ? Math.min(maxValue, val) : val);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 24,
    width: 24,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    height: 24,
    width: 36,
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    fontSize: 16,
  },
  input: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
