import React, {useState, ReactNode, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextStyle,
  ViewStyle,
  Animated,
  TouchableOpacityProps,
} from 'react-native';

export interface RadioInfo {
  id: string;
  isSelected: boolean;
}

export interface RadioBaseProps extends TouchableOpacityProps {
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

export interface RadioProps extends RadioBaseProps {
  containerStyle?: ViewStyle;
  radioIds: string[];
  radioComponent?(info: RadioInfo): string | JSX.Element;
  defaultId?: string;
  onSelect(id: string): void;
}

export function RadioItem({
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
    <TouchableOpacity
      {...props}
      style={[styles.radioContainer, style, isSelected && selectedRadioStyle]}
      activeOpacity={0.75}>
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
    </TouchableOpacity>
  );
}

export default function Radio({
  containerStyle,
  radioIds,
  radioComponent,
  defaultId,
  onSelect,
  onPress,
  ...props
}: RadioProps) {
  const [selected, setSelected] = useState(defaultId);

  function isSelected(id: string) {
    return selected === id;
  }

  function getRadioItem(id: string) {
    const component =
      radioComponent && radioComponent({id: id, isSelected: isSelected(id)});
    const title =
      typeof component === 'string'
        ? component
        : component === undefined
        ? id
        : undefined;

    return (
      <RadioItem
        {...props}
        key={id}
        title={title}
        isSelected={selected === id}
        onPress={event => {
          onPress !== undefined && onPress(event);
          onSelect(id);
          setSelected(id);
        }}>
        {component !== undefined && typeof component !== 'string' && component}
      </RadioItem>
    );
  }

  function getListRadioItem() {
    const list: ReactNode[] = [];

    for (let index = 0; index < radioIds.length; index++) {
      const id = radioIds[index];
      const item = getRadioItem(id);

      list.push(item);
    }

    return list;
  }

  return <View style={containerStyle}>{getListRadioItem()}</View>;
}

function DefaultSelectedRadio() {
  const animation = useState(new Animated.Value(0))[0];
  const sizeOuter = 18;
  const sizeInner = sizeOuter - 6;

  useEffect(() => {
    Animated.timing(animation, {toValue: 1, duration: 100}).start();
  }, []);

  return (
    <View
      style={[
        {
          height: sizeOuter,
          width: sizeOuter,
          borderRadius: sizeOuter / 2,
        },
        styles.defaultSelectedRadioContainer,
      ]}>
      <Animated.View
        style={[
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
          styles.defaultSelectedRadioInnerContainer,
        ]}
      />
    </View>
  );
}

function DefaultDisabledRadio() {
  const size = 18;

  return (
    <View
      style={[
        {
          height: size,
          width: size,
          borderRadius: size / 2,
        },
        styles.defaultDisabledRadioContainer,
      ]}
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
