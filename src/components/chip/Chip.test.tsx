import {render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import Chip, {ChipProps} from './Chip';

const defaultProps: ChipProps = {
  chips: ['a', 'b', 'c'],
  onSelect: jest.fn,
};

function runTest(name: string, props?: ObjectPartial<ChipProps>) {
  test(name, async () => {
    render(<Chip {...defaultProps} {...props} />);
  });
}

describe('Chip', () => {
  runTest('default');
});
