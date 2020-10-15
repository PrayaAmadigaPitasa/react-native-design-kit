import React from 'react';
import {render} from '@testing-library/react-native';
import {ObjectPartial} from '../../types';
import CheckboxItem, {CheckboxItemProps} from './CheckboxItem';

const defaultProps: CheckboxItemProps = {
  isSelected: false,
};

function runTest(name: string, props?: ObjectPartial<CheckboxItemProps>) {
  test(name, async () => {
    render(<CheckboxItem {...defaultProps} {...props} />);
  });
}

describe('CheckboxItem', () => {
  runTest('default');
  runTest('isSelected', {isSelected: true});
  runTest('children', {children: <></>});
});
