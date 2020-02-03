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

export interface InputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  label?: string;
  labelStyle?: TextStyle;
  labelContainerStyle?: ViewStyle;
  labelPosition?: 'container' | 'box' | 'border';
  labelBoxStandBySize?: number;
  labelBoxStandByOffset?: number;
  labelBoxActiveSize?: number;
  labelBoxActiveOffset?: number;
  inputBoxActiveOffset?: number;
  inputContainerStyle?: ViewStyle;
  inputRef?(instance: TextInput | null): void;
  leftIcon?: InputIcon;
  leftIconAction?: InputIconAction;
  leftIconContainerStyle?: ViewStyle;
  rightIcon?: InputIcon;
  rightIconAction?: InputIconAction;
  rightIconContainerStyle?: ViewStyle;
  focusStyle?: TextStyle;
  focusLabelStyle?: TextStyle;
  focusLabelContainerStyle?: ViewStyle;
  focusContainerStyle?: ViewStyle;
  focusInputContainerStyle?: ViewStyle;
  focusLeftIconContainerStyle?: ViewStyle;
  focusRightIconContainerStyle?: ViewStyle;
  error?: string;
}

export default function Input({
  containerStyle,
  label,
  labelStyle,
  labelContainerStyle,
  labelPosition = 'container',
  inputContainerStyle,
  inputRef,
  leftIcon,
  leftIconAction,
  leftIconContainerStyle,
  rightIcon,
  rightIconAction,
  rightIconContainerStyle,
  focusStyle,
  focusLabelStyle,
  focusContainerStyle,
  focusLabelContainerStyle,
  focusInputContainerStyle,
  focusLeftIconContainerStyle,
  focusRightIconContainerStyle,
  error,
  labelBoxStandBySize = 15,
  labelBoxStandByOffset = 14,
  labelBoxActiveSize = 12,
  labelBoxActiveOffset = 1,
  inputBoxActiveOffset = 6,
  style,
  placeholder,
  multiline,
  secureTextEntry,
  onChangeText,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [layout, setLayout] = useState<LayoutRectangle>();
  const [visibility, setVisibility] = useState(false);
  const [focus, setFocus] = useState(false);
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
    <View
      style={[styles.container, containerStyle, focus && focusContainerStyle]}>
      {showLabel && labelPosition === 'container' ? (
        <View
          style={StyleSheet.flatten([
            styles.labelContainerThemeContainer,
            labelContainerStyle,
            focus && focusLabelContainerStyle,
          ])}>
          <Text
            style={StyleSheet.flatten([
              styles.label,
              styles.labelThemeContainer,
              labelStyle,
              focus && focusLabelStyle,
            ])}>
            {label}
          </Text>
        </View>
      ) : (
        <></>
      )}
      <View
        style={[
          styles.inputContainer,
          inputContainerStyle,
          focus &&
            StyleSheet.flatten([
              styles.focusInputContainer,
              focusInputContainerStyle,
            ]),
        ]}>
        {inputLeftIcon && (
          <View
            style={[
              styles.iconContainer,
              styles.iconLeftContainer,
              leftIconContainerStyle,
              focus && focusLeftIconContainerStyle,
            ]}>
            <TouchableWithoutFeedback onPress={getIconAction(leftIconAction)}>
              {inputLeftIcon}
            </TouchableWithoutFeedback>
          </View>
        )}
        <View style={styles.sectionInputReverse}>
          {inputRightIcon && (
            <View
              style={[
                styles.iconContainer,
                styles.iconRightContainer,
                rightIconContainerStyle,
                focus && focusRightIconContainerStyle,
              ]}>
              <TouchableWithoutFeedback
                onPress={getIconAction(rightIconAction)}>
                {inputRightIcon}
              </TouchableWithoutFeedback>
            </View>
          )}
          <View style={styles.sectionInputBox}>
            {labelPosition === 'box' ? (
              <Animated.View
                style={StyleSheet.flatten([
                  styles.sectionLabelThemeBox,
                  focus && focusLabelContainerStyle,
                  {
                    top: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                        labelBoxStandByOffset,
                        labelBoxActiveOffset,
                      ],
                    }),
                  },
                ])}>
                <Animated.Text
                  style={StyleSheet.flatten([
                    styles.label,
                    styles.labelThemeBox,
                    labelStyle,
                    focus && focusLabelStyle,
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
                labelPosition === 'box' &&
                  themeBorderActive && {paddingTop: inputBoxActiveOffset},
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
                  focus && focusStyle,
                ])}
                onChangeText={text => {
                  onChangeText && onChangeText(text);
                  setInputValue(text);
                }}
                onFocus={event => {
                  onFocus && onFocus(event);
                  setFocus(true);
                }}
                onBlur={event => {
                  onBlur && onBlur(event);
                  setFocus(false);
                }}
              />
            </View>
            {showLabel && labelPosition === 'border' ? (
              <View
                style={[
                  styles.labelContainerThemeBorder,
                  labelContainerStyle,
                  focus &&
                    StyleSheet.flatten([
                      styles.focusLabelContainerThemeBorder,
                      focusLabelContainerStyle,
                    ]),
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
                    labelStyle,
                    focus && focusLabelStyle,
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
      {error !== undefined && (
        <View>
          <Text>{error}</Text>
        </View>
      )}
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
  labelContainerThemeContainer: {
    marginBottom: 5,
  },
  labelContainerThemeBorder: {
    paddingHorizontal: 2,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'lightgray',
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeftContainer: {
    marginRight: 6,
  },
  iconRightContainer: {
    marginLeft: 6,
  },
  focusInputContainer: {
    borderColor: 'dodgerblue',
  },
  focusLabelContainerThemeBorder: {
    borderColor: 'dodgerblue',
  },
  sectionInputReverse: {
    flex: 1,
    height: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  sectionInputBox: {
    flex: 1,
    height: '100%',
  },
  sectionLabelThemeBorder: {
    position: 'absolute',
  },
  sectionLabelThemeBox: {
    position: 'absolute',
  },
  label: {
    fontSize: 16,
  },
  labelThemeContainer: {
    color: 'dimgray',
    fontWeight: 'bold',
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
