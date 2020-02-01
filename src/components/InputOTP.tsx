import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import {isNumber} from '../utilities/RegexUtil';

export interface InputOTPBaseProps {
  inputContainerStyle?: ViewStyle;
  placeholderComponent?: JSX.Element;
}

export interface InputOTPProps extends TextInputProps, InputOTPBaseProps {
  firstEmptyFocus?: boolean;
  numberOfCode?: number;
  containerStyle?: ViewStyle;
  separatorComponent?: JSX.Element;
  onChangeOTP(otp: string, values: string[], isValid: boolean): void;
}

export interface InputOTPBoxProps extends TextInputProps, InputOTPBaseProps {
  refInput?(instance: any): void;
}

export function InputOTPBox({
  inputContainerStyle,
  placeholderComponent,
  refInput,
  onFocus,
  onBlur,
  ...props
}: InputOTPBoxProps) {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  return (
    <View
      style={StyleSheet.flatten([styles.inputContainer, inputContainerStyle])}>
      {placeholderComponent && showPlaceholder && (
        <View style={styles.sectionPlaceholderComponent}>
          {placeholderComponent}
        </View>
      )}
      <TextInput
        {...props}
        ref={instance => {
          if (refInput !== undefined) {
            refInput(instance);
          }
        }}
        style={StyleSheet.flatten([styles.inputBox, props.style])}
        keyboardType="number-pad"
        maxLength={1}
        onFocus={e => {
          onFocus !== undefined && onFocus(e);

          if (showPlaceholder) {
            setShowPlaceholder(false);
          }
        }}
        onBlur={e => {
          onBlur !== undefined && onBlur(e);

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
    borderColor: '#9a9a9a',
    backgroundColor: '#fafafa',
    marginHorizontal: 12,
  },
  inputBox: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  sectionPlaceholderComponent: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionSeparator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
