import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Animated} from 'react-native';
export function RadioItem({
  isSelected = false,
  selectedRadio = React.createElement(DefaultSelectedRadio, null),
  disabledRadio = React.createElement(DefaultDisabledRadio, null),
  title,
  titleStyle,
  radioContainerStyle,
  radioSelectContainerStyle,
  radioComponentContainerStyle,
  children,
  ...props
}) {
  return React.createElement(
    TouchableOpacity,
    Object.assign({}, props, {activeOpacity: 0.75}),
    React.createElement(
      View,
      {style: [styles.sectionRadio, radioContainerStyle]},
      React.createElement(
        View,
        {style: radioSelectContainerStyle},
        isSelected ? selectedRadio : disabledRadio,
      ),
      React.createElement(
        View,
        {
          style: StyleSheet.flatten([
            styles.radioComponentContainer,
            radioComponentContainerStyle,
          ]),
        },
        typeof children === 'object'
          ? children
          : React.createElement(
              Text,
              {style: [styles.title, titleStyle]},
              title,
            ),
      ),
    ),
  );
}
export default function Radio({
  containerStyle,
  radioIds,
  radioComponent,
  defaultId,
  selectedRadio = React.createElement(DefaultSelectedRadio, null),
  disabledRadio = React.createElement(DefaultDisabledRadio, null),
  titleStyle,
  onSelect,
  radioContainerStyle,
  radioSelectContainerStyle,
  radioComponentContainerStyle,
  onPress,
  ...props
}) {
  const [selected, setSelected] = useState(defaultId);
  function isSelected(id) {
    return selected === id;
  }
  function getRadioItem(id) {
    const component =
      radioComponent && radioComponent({id: id, isSelected: isSelected(id)});
    const title =
      typeof component === 'string'
        ? component
        : component === undefined
        ? id
        : undefined;
    return React.createElement(
      RadioItem,
      Object.assign({}, props, {
        key: id,
        title: title,
        isSelected: selected === id,
        selectedRadio: selectedRadio,
        disabledRadio: disabledRadio,
        titleStyle: titleStyle,
        radioContainerStyle: radioContainerStyle,
        radioSelectContainerStyle: radioSelectContainerStyle,
        radioComponentContainerStyle: radioComponentContainerStyle,
        onPress: event => {
          onPress !== undefined && onPress(event);
          onSelect(id);
          setSelected(id);
        },
      }),
      component !== undefined && typeof component !== 'string' && component,
    );
  }
  function getListRadioItem() {
    const listComponent = [];
    for (let index = 0; index < radioIds.length; index++) {
      const id = radioIds[index];
      const item = getRadioItem(id);
      listComponent.push(item);
    }
    return listComponent;
  }
  return React.createElement(View, {style: containerStyle}, getListRadioItem());
}
function DefaultSelectedRadio() {
  const animation = useState(new Animated.Value(0))[0];
  const sizeOuter = 18;
  const sizeInner = sizeOuter - 6;
  useEffect(() => {
    Animated.timing(animation, {toValue: 1, duration: 100}).start();
  }, []);
  return React.createElement(
    View,
    {
      style: [
        {
          height: sizeOuter,
          width: sizeOuter,
          borderRadius: sizeOuter / 2,
        },
        styles.selectedRadioOuter,
      ],
    },
    React.createElement(Animated.View, {
      style: [
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
        styles.selectedRadioInner,
      ],
    }),
  );
}
function DefaultDisabledRadio() {
  const size = 18;
  return React.createElement(View, {
    style: [
      {
        height: size,
        width: size,
        borderRadius: size / 2,
      },
      styles.disabledRadio,
    ],
  });
}
const styles = StyleSheet.create({
  radioComponentContainer: {
    marginLeft: 12,
  },
  sectionRadio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  selectedRadioOuter: {
    borderWidth: 1,
    borderColor: '#598bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioInner: {
    backgroundColor: '#598bff',
  },
  disabledRadio: {
    borderWidth: 1,
    borderColor: 'rgb(197, 206, 224)',
    backgroundColor: 'rgba(197, 206, 224, 0.4)',
  },
  title: {
    fontSize: 15,
  },
});
