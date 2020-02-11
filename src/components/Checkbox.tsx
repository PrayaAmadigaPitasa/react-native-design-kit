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

export interface CheckboxInfo {
  id: string;
  isSelected: boolean;
}

export interface CheckboxBaseProps extends TouchableOpacityProps {
  checkboxIconContainerStyle?: ViewStyle;
  checkboxComponentContainerStyle?: ViewStyle;
  selectedCheckbox?: JSX.Element;
  selectedCheckboxStyle?: ViewStyle;
  selectedCheckboxIconContainerStyle?: ViewStyle;
  selectedCheckboxComponentContainerStyle?: ViewStyle;
  selectedCheckboxTitleStyle?: ViewStyle;
  disabledCheckbox?: JSX.Element;
}

export interface CheckboxItemProps extends CheckboxBaseProps {
  title?: string;
  titleStyle?: TextStyle;
  isSelected?: boolean;
  children?: ReactNode;
}

export interface CheckboxProps extends CheckboxBaseProps {
  containerStyle?: ViewStyle;
  checkboxIds: string[];
  checkboxComponent?(info: CheckboxInfo): string | JSX.Element;
  defaultIds?: string[];
  onSelect(id: string, selected: string[]): void;
}

export function CheckboxItem({
  isSelected = false,
  style,
  title,
  titleStyle,
  selectedCheckbox = <Icon style={styles.defaultSelectedIcon} name="check" />,
  selectedCheckboxStyle,
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
        {isSelected && selectedCheckbox}
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

  function checkId(id: string) {
    return checkboxIds.indexOf(id) >= 0;
  }

  function isSelected(id: string) {
    return selected.indexOf(id) >= 0;
  }

  function filterId(id: string | string[]) {
    const selection: string[] = [];

    if (Array.isArray(id)) {
      for (let indexId = 0; indexId < id.length; indexId++) {
        const check = id[indexId];

        if (checkId(check)) {
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
          } else {
            selection.push(id);
          }

          setSelected(selection);
          onSelect(id, selection);
        }}>
        {component !== undefined && typeof component !== 'string' && component}
      </CheckboxItem>
    );
  }

  function getListCheckboxItem() {
    const list: ReactNode[] = [];

    for (let index = 0; index < checkboxIds.length; index++) {
      const id = checkboxIds[index];
      const item = getCheckboxItem(id);

      list.push(item);
    }

    return list;
  }

  return <View style={containerStyle}>{getListCheckboxItem()}</View>;
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
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
