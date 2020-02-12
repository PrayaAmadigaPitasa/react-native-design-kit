import React, {useState, ReactNode} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextStyle,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export type CheckboxIdentifier = string | CheckboxIndeterminateInfo;
export type CheckboxIndeterminateStatus =
  | 'selected'
  | 'not-selected'
  | 'part-selected';

export interface CheckboxInfo {
  id: string;
  isSelected: boolean;
}

export interface CheckboxIndeterminateInfo {
  title: string;
  checkboxIds: CheckboxIdentifier[];
}

export interface CheckboxPartialProps {
  selectedPartialCheckboxIcon?: JSX.Element;
  selectedPartialCheckboxIconContainerStyle?: ViewStyle;
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

export interface CheckboxItemProps extends CheckboxBaseProps {
  title?: string;
  titleStyle?: TextStyle;
  isSelected?: boolean;
  children?: ReactNode;
}

export interface CheckboxIndeterminateProps
  extends CheckboxBaseProps,
    CheckboxPartialProps {
  title?: string;
  titleStyle?: TextStyle;
  checkboxIds: CheckboxIdentifier[];
  status?: CheckboxIndeterminateStatus;
  children?: ReactNode;
}

export interface CheckboxProps extends CheckboxBaseProps, CheckboxPartialProps {
  containerStyle?: ViewStyle;
  checkboxIds: CheckboxIdentifier[];
  checkboxComponent?(info: CheckboxInfo): string | JSX.Element;
  checkboxIndeterminateContainerStyle?: ViewStyle;
  defaultIds?: string[];
  onSelect(id: string, toggle: boolean, selected: string[]): void;
}

export function CheckboxItem({
  isSelected = false,
  style,
  title,
  titleStyle,
  selectedCheckboxStyle,
  selectedCheckboxIcon,
  selectedCheckboxIconContainerStyle,
  selectedCheckboxComponentContainerStyle,
  selectedCheckboxTitleStyle,
  checkboxIconContainerStyle,
  checkboxComponentContainerStyle,
  children,
  ...props
}: CheckboxItemProps) {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.checkboxContainer,
        style,
        isSelected && selectedCheckboxStyle,
      ]}
      activeOpacity={0.75}>
      <View
        style={StyleSheet.flatten([
          styles.checkboxIconContainer,
          checkboxIconContainerStyle,
          isSelected &&
            StyleSheet.flatten([
              styles.selectedCheckboxIconContainer,
              selectedCheckboxIconContainerStyle,
            ]),
        ])}>
        {isSelected &&
          (selectedCheckboxIcon !== undefined ? (
            selectedCheckboxIcon
          ) : (
            <Icon style={styles.defaultIcon} name="check" />
          ))}
      </View>
      <View
        style={StyleSheet.flatten([
          styles.checkboxComponentContainer,
          checkboxComponentContainerStyle,
          isSelected && selectedCheckboxComponentContainerStyle,
        ])}>
        {typeof children === 'object' ? (
          children
        ) : (
          <Text
            style={StyleSheet.flatten([
              styles.title,
              titleStyle,
              isSelected && selectedCheckboxTitleStyle,
            ])}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export function CheckboxIndeterminate({
  status = 'not-selected',
  style,
  title,
  titleStyle,
  selectedCheckboxStyle,
  selectedCheckboxIcon,
  selectedCheckboxIconContainerStyle,
  selectedCheckboxComponentContainerStyle,
  selectedCheckboxTitleStyle,
  selectedPartialCheckboxIcon,
  selectedPartialCheckboxIconContainerStyle,
  checkboxIconContainerStyle,
  checkboxComponentContainerStyle,
  children,
  ...props
}: CheckboxIndeterminateProps) {
  function getIcon() {
    switch (status) {
      case 'selected':
        return (
          selectedCheckboxIcon || (
            <Icon style={styles.defaultIcon} name="check" />
          )
        );
      case 'part-selected':
        return (
          selectedPartialCheckboxIcon || (
            <Icon style={styles.defaultIcon} name="minus" />
          )
        );
      default:
        return undefined;
    }
  }

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.checkboxContainer,
        style,
        status === 'selected' && selectedCheckboxStyle,
      ]}
      activeOpacity={0.75}>
      <View
        style={StyleSheet.flatten([
          styles.checkboxIconContainer,
          checkboxIconContainerStyle,
          status === 'selected' &&
            StyleSheet.flatten([
              styles.selectedCheckboxIconContainer,
              selectedCheckboxIconContainerStyle,
            ]),
          status === 'part-selected' &&
            StyleSheet.flatten([
              styles.selectedPartialCheckboxIconContainer,
              selectedPartialCheckboxIconContainerStyle,
            ]),
        ])}>
        {getIcon()}
      </View>
      <View
        style={StyleSheet.flatten([
          styles.checkboxComponentContainer,
          checkboxComponentContainerStyle,
          status === 'selected' && selectedCheckboxComponentContainerStyle,
        ])}>
        {typeof children === 'object' ? (
          children
        ) : (
          <Text
            style={StyleSheet.flatten([
              styles.title,
              titleStyle,
              status === 'selected' && selectedCheckboxTitleStyle,
            ])}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
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

  function checkIndeterminateStatus(
    checkboxIdenfitifer: CheckboxIdentifier[],
    checked: boolean,
    hasEmpty?: boolean,
  ): CheckboxIndeterminateStatus {
    for (let index = 0; index < checkboxIdenfitifer.length; index++) {
      const indeterminate = checkboxIdenfitifer[index];

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

    return checked ? (hasEmpty ? 'part-selected' : 'selected') : 'not-selected';
  }

  function checkId(id: string, checkboxIdenfitifer: CheckboxIdentifier[]) {
    for (let index = 0; index < checkboxIdenfitifer.length; index++) {
      const value = checkboxIdenfitifer[index];

      if (typeof value === 'string') {
        if (value === id) {
          return true;
        }
      } else {
        checkId(id, value.checkboxIds);
      }
    }

    return false;
  }

  function filterSelection(
    base: string[],
    checkboxIdentifier: CheckboxIdentifier[],
    toggle: boolean,
  ): string[] {
    const selection = [...base];

    for (let index = 0; index < checkboxIdentifier.length; index++) {
      const identifier = checkboxIdentifier[index];

      if (typeof identifier === 'string') {
        const select = selection.indexOf(identifier) >= 0;

        if (select && !toggle) {
          selection.splice(selection.indexOf(identifier), 1);
        } else if (!select && toggle) {
          selection.push(identifier);
        }
      } else {
        return filterSelection(selection, identifier.checkboxIds, toggle);
      }
    }

    return selection;
  }

  function isSelected(id: string) {
    return selected.indexOf(id) >= 0;
  }

  function filterId(id: string | string[]) {
    const selection: string[] = [];

    if (Array.isArray(id)) {
      for (let indexId = 0; indexId < id.length; indexId++) {
        const check = id[indexId];

        if (checkId(check, checkboxIds)) {
          selection.push(check);
        }
      }
    } else {
      selection.push(id);
    }

    return selection;
  }

  function getCheckboxItem(id: string) {
    const component =
      checkboxComponent &&
      checkboxComponent({id: id, isSelected: isSelected(id)});
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
        isSelected={isSelected(id)}
        onPress={event => {
          onPress !== undefined && onPress(event);
          const selection = [...selected];

          if (isSelected(id)) {
            selection.splice(selection.indexOf(id), 1);
            onSelect(id, false, selection);
          } else {
            selection.push(id);
            onSelect(id, true, selection);
          }

          setSelected(selection);
        }}>
        {component !== undefined && typeof component !== 'string' && component}
      </CheckboxItem>
    );
  }

  function getCheckboxIndeterminate(
    key: string,
    title: string,
    identifier: CheckboxIdentifier[],
  ) {
    const status = checkIndeterminateStatus(identifier, false);

    return (
      <CheckboxIndeterminate
        {...props}
        key={key}
        title={title}
        checkboxIds={identifier}
        status={status}
        onPress={event => {
          onPress !== undefined && onPress(event);
          const selection = filterSelection(
            selected,
            identifier,
            status === 'not-selected' || status === 'part-selected',
          );

          setSelected(selection);
        }}
      />
    );
  }

  function getListCheckboxItem(
    checkboxIdenfitifer: CheckboxIdentifier[],
    category?: string,
  ) {
    const list: ReactNode[] = [];

    for (let index = 0; index < checkboxIdenfitifer.length; index++) {
      const value = checkboxIdenfitifer[index];

      if (typeof value === 'string') {
        const item = getCheckboxItem(value);

        list.push(item);
      } else {
        const title = value.title;
        const identifier = value.checkboxIds;
        const key = category !== undefined ? `${category}:${title}` : title;
        const checkboxIndeterminate = getCheckboxIndeterminate(
          key,
          title,
          identifier,
        );

        list.push(checkboxIndeterminate);
        list.push(getListCheckboxItem(value.checkboxIds, key));
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
  }

  return <View style={containerStyle}>{getListCheckboxItem(checkboxIds)}</View>;
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkboxIndeterminateContainer: {
    marginLeft: 12,
  },
  checkboxIconContainer: {
    height: 18,
    width: 18,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxComponentContainer: {
    marginLeft: 12,
  },
  selectedCheckboxIconContainer: {
    borderColor: 'dodgerblue',
    backgroundColor: 'dodgerblue',
  },
  selectedPartialCheckboxIconContainer: {
    borderColor: 'dodgerblue',
    backgroundColor: 'dodgerblue',
  },
  defaultIcon: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  title: {
    fontSize: 15,
  },
});
