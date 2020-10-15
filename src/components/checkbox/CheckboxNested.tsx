import React from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import {CheckboxCategoryStatus, CheckboxIdentifier} from '../../types';
import {Icon} from '../icon';
import {Touchable} from '../touchable';
import {CheckboxBaseProps, CheckboxIndeterminateProps} from './Checkbox';

export interface CheckboxNestedProps
  extends CheckboxBaseProps,
    CheckboxIndeterminateProps {
  title?: string;
  titleStyle?: TextStyle;
  checkboxIds: CheckboxIdentifier[];
  status: CheckboxCategoryStatus;
}

export default function CheckboxNested({
  status,
  style,
  title,
  titleStyle,
  selectedCheckboxStyle,
  selectedCheckboxIcon,
  selectedCheckboxIconContainerStyle,
  selectedCheckboxComponentContainerStyle,
  selectedCheckboxTitleStyle,
  indeterminateCheckboxIcon,
  indeterminateCheckboxIconContainerStyle,
  checkboxIconContainerStyle,
  checkboxComponentContainerStyle,
  ...props
}: CheckboxNestedProps) {
  function getIcon() {
    switch (status) {
      case 'selected':
        return (
          selectedCheckboxIcon || (
            <Icon style={styles.defaultIcon} name="check" />
          )
        );
      case 'indeterminate':
        return (
          indeterminateCheckboxIcon || (
            <Icon style={styles.defaultIcon} name="minus" />
          )
        );
      default:
        return undefined;
    }
  }

  return (
    <Touchable
      {...props}
      testID="checkbox-nested-container"
      style={[
        styles.checkboxContainer,
        style,
        status === 'selected' && selectedCheckboxStyle,
      ]}>
      <View
        style={StyleSheet.flatten([
          styles.checkboxIconContainer,
          checkboxIconContainerStyle,
          status === 'selected' &&
            StyleSheet.flatten([
              styles.selectedCheckboxIconContainer,
              selectedCheckboxIconContainerStyle,
            ]),
          status === 'indeterminate' &&
            StyleSheet.flatten([
              styles.indeterminateCheckboxIconContainer,
              indeterminateCheckboxIconContainerStyle,
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
        <Text
          style={StyleSheet.flatten([
            styles.title,
            titleStyle,
            status === 'selected' && selectedCheckboxTitleStyle,
          ])}>
          {title}
        </Text>
      </View>
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
  indeterminateCheckboxIconContainer: {
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
