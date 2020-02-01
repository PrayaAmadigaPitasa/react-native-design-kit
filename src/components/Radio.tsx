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

export interface RadioBaseProps {
  radioContainerStyle?: ViewStyle;
  radioSelectContainerStyle?: ViewStyle;
  radioComponentContainerStyle?: ViewStyle;
  selectedRadio?: JSX.Element;
  disabledRadio?: JSX.Element;
  title?: string;
  titleStyle?: TextStyle;
}

export interface RadioItemProps extends TouchableOpacityProps, RadioBaseProps {
  isSelected?: boolean;
  children?: ReactNode;
}

export interface RadioProps extends TouchableOpacityProps, RadioBaseProps {
  containerStyle?: ViewStyle;
  radioIds: string[];
  radioComponent?(info: RadioInfo): string | JSX.Element;
  defaultId?: string;
  onSelect(id: string): void;
}

export function RadioItem({
  isSelected = false,
  selectedRadio = <DefaultSelectedRadio />,
  disabledRadio = <DefaultDisabledRadio />,
  title,
  titleStyle,
  radioContainerStyle,
  radioSelectContainerStyle,
  radioComponentContainerStyle,
  children,
  ...props
}: RadioItemProps) {
  return (
    <TouchableOpacity {...props} activeOpacity={0.75}>
      <View style={[styles.sectionRadio, radioContainerStyle]}>
        <View style={radioSelectContainerStyle}>
          {isSelected ? selectedRadio : disabledRadio}
        </View>
        <View
          style={StyleSheet.flatten([
            styles.radioComponentContainer,
            radioComponentContainerStyle,
          ])}>
          {typeof children === 'object' ? (
            children
          ) : (
            <Text style={[styles.title, titleStyle]}>{title}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function Radio({
  containerStyle,
  radioIds,
  radioComponent,
  defaultId,
  selectedRadio = <DefaultSelectedRadio />,
  disabledRadio = <DefaultDisabledRadio />,
  titleStyle,
  onSelect,
  radioContainerStyle,
  radioSelectContainerStyle,
  radioComponentContainerStyle,
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
        selectedRadio={selectedRadio}
        disabledRadio={disabledRadio}
        titleStyle={titleStyle}
        radioContainerStyle={radioContainerStyle}
        radioSelectContainerStyle={radioSelectContainerStyle}
        radioComponentContainerStyle={radioComponentContainerStyle}
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
    const listComponent: ReactNode[] = [];

    for (let index = 0; index < radioIds.length; index++) {
      const id = radioIds[index];
      const item = getRadioItem(id);

      listComponent.push(item);
    }

    return listComponent;
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
        styles.selectedRadioOuter,
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
          styles.selectedRadioInner,
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
        styles.disabledRadio,
      ]}
    />
  );
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
    borderColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioInner: {
    backgroundColor: 'dodgerblue',
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
