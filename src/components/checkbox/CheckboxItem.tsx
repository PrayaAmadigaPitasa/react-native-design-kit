import React, {ReactNode, useMemo} from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import {Icon} from '../icon';
import {Touchable} from '../touchable';
import {CheckboxBaseProps} from './Checkbox';

export interface CheckboxItemProps extends CheckboxBaseProps {
  title?: string;
  titleStyle?: TextStyle;
  isSelected: boolean;
  children?: ReactNode;
}

export default function CheckboxItem({
  isSelected,
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
  const handleRenderCheckboxIcon = useMemo(
    () => (
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
          (selectedCheckboxIcon || (
            <Icon style={styles.defaultIcon} name="check" />
          ))}
      </View>
    ),
    [
      isSelected,
      selectedCheckboxIcon,
      checkboxIconContainerStyle,
      selectedCheckboxIconContainerStyle,
    ],
  );

  const handleRenderComponent = useMemo(
    () => (
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
    ),
    [
      title,
      titleStyle,
      children,
      isSelected,
      selectedCheckboxTitleStyle,
      selectedCheckboxComponentContainerStyle,
      checkboxComponentContainerStyle,
    ],
  );

  return (
    <Touchable
      {...props}
      style={[
        styles.checkboxContainer,
        style,
        isSelected && selectedCheckboxStyle,
      ]}>
      {handleRenderCheckboxIcon}
      {handleRenderComponent}
    </Touchable>
  );
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
  defaultIcon: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  title: {
    fontSize: 15,
  },
});
