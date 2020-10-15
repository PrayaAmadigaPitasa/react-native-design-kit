import {render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import {ChipItem, ChipItemProps} from './ChipItem';

function runTest(name: string, props?: ObjectPartial<ChipItemProps>) {
  test(name, async () => {
    render(<ChipItem {...props} />);
  });
}

describe('ChipItem', () => {
  runTest('default');
});
