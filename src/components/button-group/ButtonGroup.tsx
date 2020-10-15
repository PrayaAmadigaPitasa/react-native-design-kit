import React, {
  useState,
  useEffect,
  ReactElement,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  GestureResponderEvent,
} from 'react-native';
import {ButtonGroupActionType, ButtonGroupInfo} from '../../types';
import {filterSelectList} from '../../utilities';
import {Button, ButtonBaseProps, ButtonTypeProps} from '../button';

export interface ButtonGroupProps
  extends TouchableOpacityProps,
    ButtonBaseProps,
    ButtonTypeProps {
  actionType?: ButtonGroupActionType;
  buttonIds: string[];
  buttonComponent?(info: ButtonGroupInfo): string | ReactElement;
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
  const singleValue = useMemo(() => actionType === 'radio', [actionType]);
  const [selected, setSelected] = useState<string[]>(
    filterSelectList(buttonIds, selectedId || [], singleValue),
  );
  const initialize = useRef(false);

  const isSelected = useCallback((id: string) => selected.indexOf(id) >= 0, [
    selected,
  ]);

  const handlePressButtonItem = useCallback(
    (id: string, event: GestureResponderEvent) => {
      onPress && onPress(event);

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
    },
    [actionType, selected, isSelected, onSelect, onPress],
  );

  const handleRenderButtonItem = useCallback(
    (id: string, index: number) => {
      const component =
        buttonComponent && buttonComponent({id, isSelected: isSelected(id)});
      const title =
        typeof component === 'string'
          ? component
          : component === undefined
          ? id
          : undefined;

      return (
        <Button
          {...props}
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
          onPress={event => handlePressButtonItem(id, event)}>
          {component && typeof component !== 'string' && component}
        </Button>
      );
    },
    [
      props,
      type,
      buttonIds,
      buttonTitleStyle,
      selectedButtonTitleStyle,
      selectedButtonRaised,
      standbyButtonRaised,
      buttonContainerStyle,
      selectedButtonContainerStyle,
      containerBorderRadius,
      isSelected,
      buttonComponent,
      handlePressButtonItem,
    ],
  );

  const handleRenderListButton = useMemo(() => {
    const list: ReactElement[] = [];

    for (let index = 0; index < buttonIds.length; index++) {
      const id = buttonIds[index];
      const button = handleRenderButtonItem(id, index);

      list.push(button);
    }

    return list;
  }, [buttonIds, handleRenderButtonItem]);

  useEffect(() => {
    if (initialize.current) {
      setSelected(filterSelectList(buttonIds, selectedId || [], singleValue));
    } else {
      initialize.current = true;
    }
  }, [singleValue, buttonIds, selectedId]);

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {handleRenderListButton}
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
