import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  ViewStyle,
  TextInputProps,
  TextStyle,
} from 'react-native';
import {isNumber} from '../../utilities';

export interface InputOTPBaseProps extends TextInputProps {
  inputContainerStyle?: ViewStyle;
  placeholderComponent?: JSX.Element;
  placeholderComponentContainerStyle?: ViewStyle;
  focusStyle?: TextStyle;
  focusInputContainerStyle?: ViewStyle;
}

export interface InputOTPProps extends InputOTPBaseProps {
  firstEmptyFocus?: boolean;
  numberOfCode?: number;
  containerStyle?: ViewStyle;
  separatorComponent?: JSX.Element;
  onChangeOTP(otp: string, values: string[], isValid: boolean): void;
}

export interface InputOTPBoxProps extends InputOTPBaseProps {
  refInput?(instance: any): void;
}

export function InputOTPBox({
  inputContainerStyle,
  placeholderComponent,
  placeholderComponentContainerStyle,
  focusStyle,
  focusInputContainerStyle,
  refInput,
  style,
  keyboardType = 'number-pad',
  onFocus,
  onBlur,
  ...props
}: InputOTPBoxProps) {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [focus, setFocus] = useState(false);

  return (
    <View
      style={StyleSheet.flatten([
        styles.inputContainer,
        inputContainerStyle,
        focus && focusInputContainerStyle,
      ])}>
      {placeholderComponent && showPlaceholder && (
        <View style={styles.sectionPlaceholderComponent}>
          <View
            style={StyleSheet.flatten([
              styles.placeholderComponentContainer,
              placeholderComponentContainerStyle,
            ])}>
            {placeholderComponent}
          </View>
        </View>
      )}
      <TextInput
        {...props}
        testID="text-input"
        ref={instance => {
          if (refInput !== undefined) {
            refInput(instance);
          }
        }}
        style={StyleSheet.flatten([
          styles.inputBox,
          style,
          focus && focusStyle,
        ])}
        keyboardType={keyboardType}
        maxLength={1}
        onFocus={e => {
          onFocus !== undefined && onFocus(e);
          setFocus(true);

          if (showPlaceholder) {
            setShowPlaceholder(false);
          }
        }}
        onBlur={e => {
          onBlur !== undefined && onBlur(e);
          setFocus(false);

          if (e.nativeEvent.text === '' && !showPlaceholder) {
            setShowPlaceholder(true);
          }
        }}
      />
    </View>
  );
}

export default function InputOTP({
  firstEmptyFocus = false,
  numberOfCode = 4,
  containerStyle,
  separatorComponent,
  onChangeOTP,
  onFocus,
  onChangeText,
  onKeyPress,
  ...props
}: InputOTPProps) {
  const [values, setValues] = useState(getInitialValues);
  const inputReferences: any[] = [];
  let toBack = false;

  function isValid() {
    for (let index = 0; index < numberOfCode; index++) {
      if (!isNumber(values[index])) {
        return false;
      }
    }

    return true;
  }

  function getInitialValues() {
    const initialValues = [];

    for (let index = 0; index < numberOfCode; index++) {
      initialValues[index] = '';
    }

    return initialValues;
  }

  function getFirstEmptyIndex() {
    for (let index = 0; index < numberOfCode; index++) {
      if (values[index] === '') {
        return index;
      }
    }

    return undefined;
  }

  function getListInputOTP() {
    const listInput: JSX.Element[] = [];

    for (let index = 0; index < numberOfCode; index++) {
      const separator = separatorComponent ? (
        <View key={`separator[${index}]`} style={styles.sectionSeparator}>
          {separatorComponent}
        </View>
      ) : (
        undefined
      );
      const input = (
        <InputOTPBox
          key={`input[${index}]`}
          {...props}
          refInput={instance => inputReferences.push(instance)}
          onFocus={e => {
            onFocus !== undefined && onFocus(e);

            if (firstEmptyFocus && !toBack) {
              const firstEmptyIndex = getFirstEmptyIndex();

              if (firstEmptyIndex !== undefined && firstEmptyIndex !== index) {
                inputReferences[firstEmptyIndex].focus();
              }
            }

            toBack = false;
          }}
          onChangeText={text => {
            values[index] = text;
            setValues(values);
            onChangeText !== undefined && onChangeText(text);
            onChangeOTP !== undefined &&
              onChangeOTP(values.join(''), values, isValid());

            if (text === ' ') {
              inputReferences[index].clear();
            }

            if (text !== '' && text !== ' ' && index < numberOfCode - 1) {
              inputReferences[index + 1].focus();
            }
          }}
          onKeyPress={e => {
            onKeyPress !== undefined && onKeyPress(e);

            if (
              e.nativeEvent.key === 'Backspace' &&
              index > 0 &&
              (values[index - 1] === '' || values[index] === '')
            ) {
              toBack = true;
              inputReferences[index - 1].focus();
            }
          }}
        />
      );

      if (separator && index > 0 && index < numberOfCode) {
        listInput.push(separator);
      }

      listInput.push(input);
    }

    return listInput;
  }

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {getListInputOTP()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  inputContainer: {
    width: 36,
    height: 48,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'darkgray',
    backgroundColor: 'whitesmoke',
    marginHorizontal: 12,
  },
  placeholderComponentContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  sectionPlaceholderComponent: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  sectionSeparator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
