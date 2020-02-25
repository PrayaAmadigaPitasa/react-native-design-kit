import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import Button, {ButtonBaseProps, ButtonTypeProps} from '../Button/Button';

export interface ButtonGroupInfo {
  id: string;
  isSelected: boolean;
}

export interface ButtonGroupProps
  extends TouchableOpacityProps,
    ButtonBaseProps,
    ButtonTypeProps {
  actionType?: 'button' | 'radio' | 'checkbox';
  buttonIds: string[];
  buttonComponent?(info: ButtonGroupInfo): string | JSX.Element;
  buttonContainerStyle?: ViewStyle;
  buttonTitleStyle?: TextStyle;
  containerBorderRadius?: number;
  standbyButtonRaised?: boolean;
  selectedButtonRaised?: boolean;
  selectedButtonContainerStyle?: ViewStyle;
  selectedButtonTitleStyle?: TextStyle;
  selectedId?: string | string[];
  onSelect(id: string, selected: string[]): void;
}

export default function ButtonGroup({
  type = 'solid',
  actionType = 'button',
  buttonIds,
  buttonComponent,
  buttonContainerStyle,
  buttonTitleStyle,
  containerStyle,
  containerBorderRadius,
  standbyButtonRaised,
  selectedButtonRaised,
  selectedButtonContainerStyle,
  selectedButtonTitleStyle,
  selectedId,
  onPress,
  onSelect,
  ...props
}: ButtonGroupProps) {
  const [selected, setSelected] = useState<string[]>(
    selectedId !== undefined ? filterId(selectedId, true) : [],
  );

  useEffect(() => {
    setSelected(selectedId !== undefined ? filterId(selectedId, true) : []);
  }, [selectedId]);

  function checkId(id: string) {
    return buttonIds.indexOf(id) >= 0;
  }

  function isSelected(id: string) {
    return selected.indexOf(id) >= 0;
  }

  function filterId(id: string | string[], checkType?: boolean) {
    const selection: string[] = [];

    if (Array.isArray(id)) {
      for (let indexId = 0; indexId < id.length; indexId++) {
        const check = id[indexId];

        if (checkId(check)) {
          selection.push(check);

          if (checkType && actionType === 'radio') {
            return selection;
          }
        }
      }
    } else {
      selection.push(id);
    }

    return selection;
  }

  function getButtonGroupItem(id: string, index: number) {
    const component =
      buttonComponent && buttonComponent({id: id, isSelected: isSelected(id)});
    const title =
      typeof component === 'string'
        ? component
        : component === undefined
        ? id
        : undefined;
    return (
      <Button
        {...props}
        testID="button"
        key={id}
        type={type}
        raised={isSelected(id) ? selectedButtonRaised : standbyButtonRaised}
        containerStyle={StyleSheet.flatten([
          styles.buttonContainer,
          buttonContainerStyle,
          isSelected(id)
            ? StyleSheet.flatten([
                styles.selectedButtonContainer,
                selectedButtonContainerStyle,
              ])
            : {},
          index === 0
            ? {
                borderTopLeftRadius: containerBorderRadius,
                borderBottomLeftRadius: containerBorderRadius,
              }
            : {},
          index === buttonIds.length - 1
            ? {
                borderTopRightRadius: containerBorderRadius,
                borderBottomRightRadius: containerBorderRadius,
              }
            : {},
        ])}
        title={title}
        titleStyle={StyleSheet.flatten([
          buttonTitleStyle,
          isSelected(id) &&
            StyleSheet.flatten([
              type !== 'solid' && styles.selectedTitle,
              selectedButtonTitleStyle,
            ]),
        ])}
        onPress={event => {
          onPress !== undefined && onPress(event);

          if (actionType !== 'button') {
            if (actionType === 'checkbox') {
              const selection = [...selected];

              if (isSelected(id)) {
                selection.splice(selection.indexOf(id), 1);
              } else {
                selection.push(id);
              }

              setSelected(selection);
              onSelect(id, selection);
            } else {
              const selection = [id];

              setSelected(selection);
              onSelect(id, selection);
            }
          } else {
            onSelect(id, selected);
          }
        }}>
        {component !== undefined && typeof component !== 'string' && component}
      </Button>
    );
  }

  function getListButton() {
    const list: JSX.Element[] = [];

    for (let index = 0; index < buttonIds.length; index++) {
      const id = buttonIds[index];
      const button = getButtonGroupItem(id, index);

      list.push(button);
    }

    return list;
  }

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {getListButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  buttonContainer: {
    borderRadius: 0,
    borderWidth: 0.5,
    borderColor: 'mediumblue',
  },
  selectedButtonContainer: {
    backgroundColor: 'royalblue',
  },
  selectedTitle: {
    color: 'darkblue',
  },
});
