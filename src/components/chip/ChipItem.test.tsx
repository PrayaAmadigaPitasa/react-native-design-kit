import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import {ChipItem, ChipItemProps} from './ChipItem';

const defaultProps: ChipItemProps = {
  testID: 'chip',
};

function runTest(name: string, props?: ObjectPartial<ChipItemProps>) {
  test(name, async () => {
    const {getByTestId} = render(<ChipItem {...defaultProps} {...props} />);
    const chip = getByTestId('chip');

    fireEvent(chip, 'layout', {nativeEvent: {layout: {}}});
  });
}

describe('ChipItem', () => {
  runTest('default');
  runTest('rounded false', {rounded: false});
});
