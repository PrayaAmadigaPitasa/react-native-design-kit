import {render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import CheckboxNested, {CheckboxNestedProps} from './CheckboxNested';

const defaultProps: CheckboxNestedProps = {
  checkboxIds: [{title: 'alphabet', checkboxIds: ['a', 'b']}],
  status: 'selected',
};

function runTest(name: string, props?: ObjectPartial<CheckboxNestedProps>) {
  test(name, async () => {
    render(<CheckboxNested {...defaultProps} {...props} />);
  });
}

describe('CheckboxNested', () => {
  runTest('default');
});
