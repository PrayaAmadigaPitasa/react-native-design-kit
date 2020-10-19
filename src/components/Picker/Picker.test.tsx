import {render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import Picker, {PickerProps} from './Picker';

const defaultProps: PickerProps<string> = {
  data: ['a', 'b', 'c', 'd'],
  keyExtractor: item => item,
  onSelect: jest.fn(),
  renderItem: () => null,
};

function runtest(name: string, props?: ObjectPartial<PickerProps<string>>) {
  test(name, async () => {
    render(<Picker {...defaultProps} {...props} />);
  });
}

describe('Picker', () => {
  runtest('default');
});
