import React, {useState, useEffect} from 'react';
import {
  View,
  TextStyle,
  ViewStyle,
  TextInputProps,
  Text,
  StyleSheet,
  TextInput,
  LayoutRectangle,
  Animated,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export type InputIcon = ((status: InputStatus) => JSX.Element) | JSX.Element;
export type InputIconAction = 'delete' | 'toggleVisiblity' | (() => void);
export type InputFillStatus = 'empty' | 'filled';
export type InputVisibilityStatus = 'visibile' | 'hidden';
export type InputStatus = 'normal' | InputFillStatus | InputVisibilityStatus;

export interface InputPositionBoxProps {
  labelBoxStandBySize?: number;
  labelBoxActiveSize?: number;
  labelBoxActiveOffset?: number;
  inputBoxActiveOffset?: number;
}

export interface InputIconProps {
  leftIcon?: InputIcon;
  leftIconAction?: InputIconAction;
  leftIconContainerStyle?: ViewStyle;
  rightIcon?: InputIcon;
  rightIconAction?: InputIconAction;
  rightIconContainerStyle?: ViewStyle;
}

export interface InputProps
  extends TextInputProps,
    InputPositionBoxProps,
    InputIconProps {
  containerStyle?: ViewStyle;
  label?: string;
  labelStyle?: TextStyle;
  labelPosition?: 'container' | 'box' | 'border';
  inputContainerStyle?: ViewStyle;
  inputRef?(instance: TextInput | null): void;
}

export default function Input({
  containerStyle,
  label,
  labelStyle,
  labelPosition = 'container',
  inputContainerStyle,
  inputRef,
  leftIcon,
  leftIconAction,
  leftIconContainerStyle,
  rightIcon,
  rightIconAction,
  rightIconContainerStyle,
  labelBoxStandBySize = 15,
  labelBoxActiveSize = 12,
  labelBoxActiveOffset = -14,
  inputBoxActiveOffset = 5,
  style,
  placeholder,
  multiline,
  onChangeText,
  secureTextEntry,
  ...props
}: InputProps) {
  const [layout, setLayout] = useState<LayoutRectangle>();
  const [visibility, setVisibility] = useState(false);
  const [inputValue, setInputValue] = useState(
    props.value !== undefined ? props.value : props.defaultValue,
  );
  const [fillStatus, setFillStatus] = useState<InputFillStatus>(
    inputValue !== undefined && inputValue.length > 0 ? 'filled' : 'empty',
  );
  const [ref, setRef] = useState<TextInput | null>();
  const themeBorderActive = inputValue !== undefined && inputValue !== '';
  const animation = useState(new Animated.Value(themeBorderActive ? 1 : 0))[0];
  const showLabel = label !== undefined && label !== '';
  const inputLeftIcon = getIcon(leftIcon, leftIconAction);
  const inputRightIcon = getIcon(rightIcon, rightIconAction);

  useEffect(() => {
    setVisibility(!secureTextEntry);
  }, [secureTextEntry]);

  useEffect(() => {
    if (
      inputValue !== undefined &&
      inputValue.length > 0 &&
      fillStatus === 'empty'
    ) {
      setFillStatus('filled');
    } else if (
      (inputValue === undefined || inputValue.length === 0) &&
      fillStatus === 'filled'
    ) {
      setFillStatus('empty');
    }

    Animated.spring(animation, {
      toValue: inputValue !== undefined && inputValue !== '' ? 1 : 0,
      bounciness: 0,
    }).start();
  }, [inputValue]);

  function getIcon(inputIcon?: InputIcon, inputIconAction?: InputIconAction) {
    if (inputIconAction !== undefined) {
      if (inputIconAction === 'delete') {
        const iconDelete =
          typeof inputIcon === 'function' ? inputIcon(fillStatus) : inputIcon;

        if (iconDelete !== undefined) {
          return iconDelete;
        }

        return fillStatus === 'filled' ? (
          <Icon style={styles.icon} name="times-circle" />
        ) : (
          undefined
        );
      } else if (inputIconAction === 'toggleVisiblity') {
        const iconVisibility =
          typeof inputIcon === 'function'
            ? inputIcon(visibility ? 'visibile' : 'hidden')
            : inputIcon;

        if (iconVisibility !== undefined) {
          return iconVisibility;
        }

        return (
          <Icon style={styles.icon} name={visibility ? 'eye' : 'eye-slash'} />
        );
      }
    }

    return typeof inputIcon === 'function' ? inputIcon('normal') : inputIcon;
  }

  function getIconAction(
    inputIconAction?: InputIconAction,
  ): (() => void) | undefined {
    if (inputIconAction !== undefined) {
      if (typeof inputIconAction === 'string') {
        if (inputIconAction === 'delete') {
          if (fillStatus === 'filled') {
            return () => {
              ref?.clear();
              onChangeText && onChangeText('');
              setFillStatus('empty');
            };
          }
        } else if (inputIconAction === 'toggleVisiblity') {
          return () => setVisibility(!visibility);
        }
      } else {
        return () => inputIconAction();
      }
    }

    return undefined;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {showLabel && labelPosition === 'container' ? (
        <Text
          style={StyleSheet.flatten([
            styles.label,
            styles.labelThemeContainer,
            labelStyle,
          ])}>
          {label}
        </Text>
      ) : (
        <></>
      )}
      <View style={[styles.inputContainer, inputContainerStyle]}>
        {inputLeftIcon && (
          <TouchableWithoutFeedback onPress={getIconAction(leftIconAction)}>
            <View style={[styles.iconLeftContainer, leftIconContainerStyle]}>
              {inputLeftIcon}
            </View>
          </TouchableWithoutFeedback>
        )}
        <View style={styles.sectionInputReverse}>
          {inputRightIcon && (
            <TouchableWithoutFeedback onPress={getIconAction(rightIconAction)}>
              <View
                style={[styles.iconRightContainer, rightIconContainerStyle]}>
                {inputRightIcon}
              </View>
            </TouchableWithoutFeedback>
          )}
          <View style={styles.sectionInputBox}>
            {labelPosition === 'box' ? (
              <Animated.View
                style={StyleSheet.flatten([
                  styles.sectionLabelThemeBox,
                  {
                    top: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, labelBoxActiveOffset],
                    }),
                  },
                ])}>
                <Animated.Text
                  style={StyleSheet.flatten([
                    styles.label,
                    styles.labelThemeBox,
                    labelStyle,
                    {
                      fontSize: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [labelBoxStandBySize, labelBoxActiveSize],
                      }),
                    },
                    props.placeholderTextColor !== undefined
                      ? {
                          color: props.placeholderTextColor,
                        }
                      : {},
                  ])}>
                  {label !== undefined ? label : placeholder}
                </Animated.Text>
              </Animated.View>
            ) : (
              <></>
            )}
            <View
              style={StyleSheet.flatten([
                {height: '100%', width: '100%'},
                labelPosition === 'box' && themeBorderActive
                  ? {paddingTop: inputBoxActiveOffset}
                  : {},
              ])}>
              <TextInput
                {...props}
                ref={instance => {
                  setRef(instance);
                  inputRef !== undefined && inputRef(instance);
                }}
                multiline={multiline}
                secureTextEntry={!visibility}
                placeholder={labelPosition === 'box' ? undefined : placeholder}
                style={StyleSheet.flatten([
                  styles.inputBox,
                  multiline && styles.inputBoxMultiline,
                  style,
                ])}
                onChangeText={text => {
                  onChangeText && onChangeText(text);
                  setInputValue(text);
                }}
              />
            </View>
            {showLabel && labelPosition === 'border' ? (
              <View
                style={[
                  styles.sectionLabelThemeBorder,
                  {
                    top: -1 + (layout ? -layout.height / 2 : 0),
                  },
                ]}
                onLayout={e => setLayout(e.nativeEvent.layout)}>
                <Text
                  style={StyleSheet.flatten([
                    styles.label,
                    styles.labelThemeBorder,
                  ])}>
                  {label}
                </Text>
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputBox: {
    flex: 1,
    width: '100%',
    fontSize: 15,
    textAlignVertical: 'center',
  },
  inputBoxMultiline: {
    textAlignVertical: 'top',
  },
  inputContainer: {
    flexDirection: 'row',
    height: 48,
    width: '100%',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 6,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'lightgray',
    backgroundColor: 'whitesmoke',
  },
  iconLeftContainer: {
    marginRight: 6,
  },
  iconRightContainer: {
    marginHorizontal: 6,
  },
  sectionInputReverse: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  sectionInputBox: {
    flex: 1,
    height: '100%',
  },
  sectionLabelThemeBorder: {
    position: 'absolute',
    paddingHorizontal: 2,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'lightgray',
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabelThemeBox: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
  },
  labelThemeContainer: {
    color: 'dimgray',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  labelThemeBorder: {
    fontWeight: '600',
    color: 'dimgray',
  },
  labelThemeBox: {
    marginLeft: Platform.OS === 'android' ? 5 : 0,
    color: 'darkgray',
  },
  icon: {
    fontSize: 20,
    color: 'darkgray',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
