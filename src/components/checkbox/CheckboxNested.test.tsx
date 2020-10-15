import {render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import CheckboxNested, {CheckboxNestedProps} from './CheckboxNested';

const defaultProps: CheckboxNestedProps = {
  checkboxIds: [{title: 'alphabet', checkboxIds: ['a', 'b']}],
  status: 'not-selected',
};

function runTest(name: string, props?: ObjectPartial<CheckboxNestedProps>) {
  test(name, async () => {
    render(<CheckboxNested {...defaultProps} {...props} />);
  });
}

describe('CheckboxNested', () => {
  runTest('default');
  runTest('status indeterminate', {status: 'indeterminate'});
  runTest('status selected', {status: 'selected'});
});
