import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
  onChangeText,
  secureTextEntry,
  ...props
}) {
  const [layout, setLayout] = useState();
  const [visibility, setVisibility] = useState(false);
  const [inputValue, setInputValue] = useState(
    props.value !== undefined ? props.value : props.defaultValue,
  );
  const [fillStatus, setFillStatus] = useState(
    inputValue !== undefined && inputValue.length > 0 ? 'filled' : 'empty',
  );
  const [ref, setRef] = useState();
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
  function getIcon(inputIcon, inputIconAction) {
    if (inputIconAction !== undefined) {
      if (inputIconAction === 'delete') {
        const iconDelete =
          typeof inputIcon === 'function' ? inputIcon(fillStatus) : inputIcon;
        if (iconDelete !== undefined) {
          return iconDelete;
        }
        return fillStatus === 'filled'
          ? React.createElement(Icon, {
              style: styles.icon,
              name: 'times-circle',
            })
          : undefined;
      } else if (inputIconAction === 'toggleVisiblity') {
        const iconVisibility =
          typeof inputIcon === 'function'
            ? inputIcon(visibility ? 'visibile' : 'hidden')
            : inputIcon;
        if (iconVisibility !== undefined) {
          return iconVisibility;
        }
        return React.createElement(Icon, {
          style: styles.icon,
          name: visibility ? 'eye' : 'eye-slash',
        });
      }
    }
    return typeof inputIcon === 'function' ? inputIcon('normal') : inputIcon;
  }
  function getIconAction(inputIconAction) {
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
  return React.createElement(
    View,
    {style: [styles.container, containerStyle]},
    showLabel && labelPosition === 'container'
      ? React.createElement(
          Text,
          {
            style: StyleSheet.flatten([
              styles.label,
              styles.labelThemeContainer,
              labelStyle,
            ]),
          },
          label,
        )
      : React.createElement(React.Fragment, null),
    React.createElement(
      View,
      {style: [styles.inputContainer, inputContainerStyle]},
      inputLeftIcon &&
        React.createElement(
          TouchableWithoutFeedback,
          {onPress: getIconAction(leftIconAction)},
          React.createElement(
            View,
            {style: [styles.iconLeftContainer, leftIconContainerStyle]},
            inputLeftIcon,
          ),
        ),
      React.createElement(
        View,
        {style: styles.sectionInputReverse},
        inputRightIcon &&
          React.createElement(
            TouchableWithoutFeedback,
            {onPress: getIconAction(rightIconAction)},
            React.createElement(
              View,
              {style: [styles.iconRightContainer, rightIconContainerStyle]},
              inputRightIcon,
            ),
          ),
        React.createElement(
          View,
          {style: styles.sectionInputBox},
          labelPosition === 'box'
            ? React.createElement(
                Animated.View,
                {
                  style: StyleSheet.flatten([
                    styles.sectionLabelThemeBox,
                    {
                      top: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, labelBoxActiveOffset],
                      }),
                    },
                  ]),
                },
                React.createElement(
                  Animated.Text,
                  {
                    style: StyleSheet.flatten([
                      styles.label,
                      styles.labelThemeBox,
                      labelStyle,
                      {
                        fontSize: animation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                            labelBoxStandBySize,
                            labelBoxActiveSize,
                          ],
                        }),
                      },
                      props.placeholderTextColor !== undefined
                        ? {
                            color: props.placeholderTextColor,
                          }
                        : {},
                    ]),
                  },
                  label !== undefined ? label : props.placeholder,
                ),
              )
            : React.createElement(React.Fragment, null),
          React.createElement(
            View,
            {
              style: StyleSheet.flatten([
                {height: '100%', width: '100%'},
                labelPosition === 'box' && themeBorderActive
                  ? {paddingTop: inputBoxActiveOffset}
                  : {},
              ]),
            },
            React.createElement(
              TextInput,
              Object.assign({}, props, {
                ref: instance => {
                  setRef(instance);
                  inputRef !== undefined && inputRef(instance);
                },
                secureTextEntry: !visibility,
                placeholder:
                  labelPosition === 'box' ? undefined : props.placeholder,
                style: StyleSheet.flatten([styles.inputBox, props.style]),
                onChangeText: text => {
                  onChangeText && onChangeText(text);
                  setInputValue(text);
                },
              }),
            ),
          ),
          showLabel && labelPosition === 'border'
            ? React.createElement(
                View,
                {
                  style: [
                    styles.sectionLabelThemeBorder,
                    {
                      top: -1 + (layout ? -layout.height / 2 : 0),
                    },
                  ],
                  onLayout: e => setLayout(e.nativeEvent.layout),
                },
                React.createElement(
                  Text,
                  {
                    style: StyleSheet.flatten([
                      styles.label,
                      styles.labelThemeBorder,
                    ]),
                  },
                  label,
                ),
              )
            : React.createElement(React.Fragment, null),
        ),
      ),
    ),
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
    borderColor: '#e4e9f2',
    backgroundColor: '#f7f9fc',
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
    borderColor: '#e4e9f2',
    backgroundColor: '#fafcff',
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
    color: '#4a4a4a',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  labelThemeBorder: {
    fontWeight: '600',
    color: '#7f7f7f',
  },
  labelThemeBox: {
    marginLeft: Platform.OS === 'android' ? 5 : 0,
    color: '#9a9a9a',
  },
  icon: {
    fontSize: 20,
    color: '#696969',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
