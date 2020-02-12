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

export type CheckboxIdentifier = string | CheckboxIndeterminate;
export type CheckboxIndeterminateStatus =
  | 'selected'
  | 'not-selected'
  | 'part-selected';

export interface CheckboxInfo {
  id: string;
  isSelected: boolean;
}

export interface CheckboxIndeterminate {
  title: string;
  checkboxIds: CheckboxIdentifier[];
}

export interface CheckboxIndeterminateHandler extends CheckboxIndeterminate {
  key: string;
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

export interface CheckboxTitleProps extends CheckboxBaseProps {
  title?: string;
  titleStyle?: TextStyle;
  status?: CheckboxIndeterminateStatus;
  children?: ReactNode;
}

export interface CheckboxProps extends CheckboxBaseProps {
  containerStyle?: ViewStyle;
  checkboxIds: CheckboxIdentifier[];
  checkboxComponent?(info: CheckboxInfo): string | JSX.Element;
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
            <Icon style={styles.defaultSelectedIcon} name="check" />
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

export function CheckboxTitle({
  status = 'not-selected',
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
}: CheckboxTitleProps) {
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
        ])}>
        {status === 'selected' &&
          (selectedCheckboxIcon !== undefined ? (
            selectedCheckboxIcon
          ) : (
            <Icon style={styles.defaultSelectedIcon} name="check" />
          ))}
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
  defaultIds,
  onSelect,
  onPress,
  ...props
}: CheckboxProps) {
  const [selected, setSelected] = useState<string[]>(
    defaultIds !== undefined ? filterId(defaultIds) : [],
  );
  const indeterminate = useState<CheckboxIndeterminateHandler[]>([])[0];

  function getInterminateStatus(
    key: string,
  ): CheckboxIndeterminateStatus | undefined {
    for (let index = 0; index < indeterminate.length; index++) {
      const value = indeterminate[index];

      if (value.key === key) {
        return checkIndeterminateStatus(value.checkboxIds, false);
      }
    }

    return undefined;
  }

  function checkIndeterminateStatus(
    listIdentifier: CheckboxIdentifier[],
    checked: boolean,
  ): CheckboxIndeterminateStatus {
    for (let index = 0; index < listIdentifier.length; index++) {
      const identifier = listIdentifier[index];

      if (typeof identifier === 'string') {
        if (isSelected(identifier)) {
          if (checked) {
            return 'part-selected';
          } else {
            checked = true;
          }
        }
      } else {
        return checkIndeterminateStatus(identifier.checkboxIds, checked);
      }
    }

    return checked ? 'selected' : 'not-selected';
  }

  function checkId(id: string, checkboxIdenfitifer: CheckboxIdentifier[]) {
    for (let index = 0; index < checkboxIdenfitifer.length; index++) {
      const value = checkboxIdenfitifer[index];

      if (typeof value === 'string') {
        if (value === 'id') {
          return true;
        }
      } else {
        checkId(id, value.checkboxIds);
      }
    }

    return false;
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

  function getCheckboxTitleItem(key: string, title: string) {
    const status = getInterminateStatus(key);

    return (
      <CheckboxTitle
        {...props}
        key={key}
        title={`${title} [${status}]`}
        status={status}
        onPress={event => {
          onPress !== undefined && onPress(event);
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
        const key = category !== undefined ? `${category}:${title}` : title;
        const itemTitle = getCheckboxTitleItem(key, title); // CheckBoxTitle

        list.push(itemTitle);
        list.push(getListCheckboxItem(value.checkboxIds, key));
      }
    }

    return category !== undefined ? (
      <View
        key={`category: ${category}`}
        style={styles.checkboxIndeterminateContainer}>
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
  defaultSelectedIcon: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  title: {
    fontSize: 15,
  },
});
