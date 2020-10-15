import React, {useState, ReactNode, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacityProps,
  GestureResponderEvent,
} from 'react-native';
import {
  CheckboxCategoryStatus,
  CheckboxIdentifier,
  CheckboxInfo,
} from '../../types';
import CheckboxItem from './CheckboxItem';
import CheckboxNested from './CheckboxNested';

export interface CheckboxIndeterminateProps {
  indeterminateCheckboxIcon?: JSX.Element;
  indeterminateCheckboxIconContainerStyle?: ViewStyle;
}

export interface CheckboxBaseProps extends TouchableOpacityProps {
  checkboxIconContainerStyle?: ViewStyle;
  checkboxComponentContainerStyle?: ViewStyle;
  selectedCheckboxStyle?: ViewStyle;
  selectedCheckboxIcon?: JSX.Element;
  selectedCheckboxIconContainerStyle?: ViewStyle;
  selectedCheckboxComponentContainerStyle?: ViewStyle;
  selectedCheckboxTitleStyle?: ViewStyle;
}

export interface CheckboxProps
  extends CheckboxBaseProps,
    CheckboxIndeterminateProps {
  containerStyle?: ViewStyle;
  checkboxIds: CheckboxIdentifier[];
  checkboxComponent?(info: CheckboxInfo): string | JSX.Element;
  checkboxIndeterminateContainerStyle?: ViewStyle;
  defaultIds?: string[];
  onSelect(id: string, toggle: boolean, selected: string[]): void;
}

export default function Checkbox({
  containerStyle,
  checkboxIds,
  checkboxComponent,
  checkboxIndeterminateContainerStyle,
  defaultIds,
  onSelect,
  onPress,
  ...props
}: CheckboxProps) {
  const [selected, setSelected] = useState<string[]>(
    defaultIds !== undefined ? filterId(defaultIds) : [],
  );

  function checkId(
    id: string,
    checkboxIdenfitifer: CheckboxIdentifier[],
  ): boolean {
    for (const value of checkboxIdenfitifer) {
      if (typeof value === 'string') {
        if (value === id) {
          return true;
        }
      } else {
        return checkId(id, value.checkboxIds);
      }
    }

    return false;
  }

  function filterId(id: string | string[]) {
    const selection: string[] = [];

    if (Array.isArray(id)) {
      for (const check of id) {
        if (checkId(check, checkboxIds)) {
          selection.push(check);
        }
      }
    } else if (checkId(id, checkboxIds)) {
      selection.push(id);
    }

    return selection;
  }

  const isSelected = useCallback((id: string) => selected.indexOf(id) >= 0, [
    selected,
  ]);

  const checkIndeterminateStatus = useCallback(
    (
      checkboxIdenfitifer: CheckboxIdentifier[],
      checked: boolean,
      hasEmpty?: boolean,
    ): CheckboxCategoryStatus => {
      for (const indeterminate of checkboxIdenfitifer) {
        if (typeof indeterminate === 'string') {
          if (!hasEmpty && !isSelected(indeterminate)) {
            hasEmpty = true;
          } else if (!checked && isSelected(indeterminate)) {
            checked = true;
          }
        } else {
          return checkIndeterminateStatus(
            indeterminate.checkboxIds,
            checked,
            hasEmpty,
          );
        }
      }

      return checked
        ? hasEmpty
          ? 'indeterminate'
          : 'selected'
        : 'not-selected';
    },
    [isSelected],
  );

  const filterSelection = useCallback(
    (
      base: string[],
      checkboxIdentifier: CheckboxIdentifier[],
      toggle: boolean,
    ): string[] => {
      const selection = [...base];

      for (const identifier of checkboxIdentifier) {
        if (typeof identifier === 'string') {
          const select = selection.indexOf(identifier) >= 0;

          if (select && !toggle) {
            selection.splice(selection.indexOf(identifier), 1);
          }

          if (!select && toggle) {
            selection.push(identifier);
          }
        } else {
          return filterSelection(selection, identifier.checkboxIds, toggle);
        }
      }

      return selection;
    },
    [],
  );

  const handlePressCheckboxNested = useCallback(
    (
      status: CheckboxCategoryStatus,
      identifier: CheckboxIdentifier[],
      event: GestureResponderEvent,
    ) => {
      onPress && onPress(event);

      const selection = filterSelection(
        selected,
        identifier,
        status === 'not-selected' || status === 'indeterminate',
      );

      setSelected(selection);
    },
    [selected, filterSelection, onPress],
  );

  const handleRenderCheckboxNested = useCallback(
    (key: string, title: string, identifier: CheckboxIdentifier[]) => {
      const status = checkIndeterminateStatus(identifier, false);

      return (
        <CheckboxNested
          {...props}
          key={key}
          title={title}
          checkboxIds={identifier}
          status={status}
          onPress={event =>
            handlePressCheckboxNested(status, identifier, event)
          }
        />
      );
    },
    [props, checkIndeterminateStatus, handlePressCheckboxNested],
  );

  const handlePressCheckboxItem = useCallback(
    (id: string, event: GestureResponderEvent) => {
      onPress && onPress(event);
      const selection = [...selected];

      if (isSelected(id)) {
        selection.splice(selection.indexOf(id), 1);
        onSelect(id, false, selection);
      } else {
        selection.push(id);
        onSelect(id, true, selection);
      }

      setSelected(selection);
    },
    [selected, isSelected, onPress, onSelect],
  );

  const handleRenderCheckboxItem = useCallback(
    (id: string) => {
      const isIdSelected = isSelected(id);
      const component =
        checkboxComponent && checkboxComponent({id, isSelected: isIdSelected});
      const title =
        typeof component === 'string'
          ? component
          : component === undefined
          ? id
          : undefined;

      return (
        <CheckboxItem
          {...props}
          key={id}
          title={title}
          isSelected={isIdSelected}
          onPress={event => handlePressCheckboxItem(id, event)}>
          {component && typeof component !== 'string' && component}
        </CheckboxItem>
      );
    },
    [props, checkboxComponent, isSelected, handlePressCheckboxItem],
  );

  const handleRenderListCheckboxItem = useCallback(
    (checkboxIdenfitifer: CheckboxIdentifier[], category?: string) => {
      const list: ReactNode[] = [];

      for (const value of checkboxIdenfitifer) {
        if (typeof value === 'string') {
          const item = handleRenderCheckboxItem(value);

          list.push(item);
        } else {
          const title = value.title;
          const identifier = value.checkboxIds;
          const key = category !== undefined ? `${category}:${title}` : title;
          const checkboxNested = handleRenderCheckboxNested(
            key,
            title,
            identifier,
          );

          list.push(checkboxNested);
          list.push(handleRenderListCheckboxItem(value.checkboxIds, key));
        }
      }

      return category !== undefined ? (
        <View
          key={`category: ${category}`}
          style={StyleSheet.flatten([
            styles.checkboxIndeterminateContainer,
            checkboxIndeterminateContainerStyle,
          ])}>
          {list}
        </View>
      ) : (
        list
      );
    },
    [
      checkboxIndeterminateContainerStyle,
      handleRenderCheckboxItem,
      handleRenderCheckboxNested,
    ],
  );

  return (
    <View style={containerStyle}>
      {handleRenderListCheckboxItem(checkboxIds)}
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxIndeterminateContainer: {
    marginLeft: 12,
  },
});
