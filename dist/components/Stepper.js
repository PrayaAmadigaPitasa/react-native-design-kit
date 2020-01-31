import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Button from './Button';
export default function Stepper({ containerStyle, buttonContainerStyle, buttonTitleStyle, buttonDisabledContainerStyle, buttonDisabledTitleStyle, inputStyle, value, minValue, maxValue, defaultValue = 0, multiplier = 1, onChangeValue, }) {
    const [inputValue, setInputValue] = useState(defaultValue);
    useEffect(() => {
        value && setInputValue(value);
    }, [value]);
    useEffect(() => {
        onChangeValue && onChangeValue(inputValue);
    }, [inputValue]);
    return (React.createElement(View, { style: StyleSheet.flatten([styles.container, containerStyle]) },
        React.createElement(Button, { containerStyle: StyleSheet.flatten([
                styles.buttonContainer,
                buttonContainerStyle,
            ]), title: "-", titleStyle: StyleSheet.flatten([styles.buttonTitle, buttonTitleStyle]), disabled: minValue !== undefined ? inputValue <= minValue : false, disabledContainerStyle: buttonDisabledContainerStyle, disabledTitleStyle: buttonDisabledTitleStyle, onPress: () => {
                const val = inputValue - Math.max(1, multiplier);
                setInputValue(minValue !== undefined ? Math.max(minValue, val) : val);
            } }),
        React.createElement(TextInput, { style: StyleSheet.flatten([styles.input, inputStyle]), value: inputValue.toString() }),
        React.createElement(Button, { containerStyle: StyleSheet.flatten([
                styles.buttonContainer,
                buttonContainerStyle,
            ]), title: "+", titleStyle: StyleSheet.flatten([styles.buttonTitle, buttonTitleStyle]), disabled: maxValue !== undefined ? inputValue >= maxValue : false, disabledContainerStyle: buttonDisabledContainerStyle, disabledTitleStyle: buttonDisabledTitleStyle, onPress: () => {
                const val = inputValue + Math.max(1, multiplier);
                setInputValue(maxValue !== undefined ? Math.min(maxValue, val) : val);
            } })));
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
    buttonTitle: {
        fontSize: 16,
    },
    input: {
        height: 24,
        width: 36,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingVertical: 0,
    },
});
