import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import Radio, {RadioProps} from './Radio';

const defaultProps: RadioProps = {
  onSelect: jest.fn(),
  onPress: jest.fn(),
  radioIds: ['a', 'b', 'c', 'd'],
};

function runTest(name: string, props?: ObjectPartial<RadioProps>) {
  test(name, async () => {
    const {getAllByTestId} = render(<Radio {...defaultProps} {...props} />);
    const radioItems = getAllByTestId('radio-item');

    for (const radioItem of radioItems) {
      fireEvent.press(radioItem);
    }
  });
}

describe('Radio', () => {
  runTest('default');
  runTest('radioComponent', {radioComponent: () => null});
  runTest('radioComponent text', {radioComponent: () => 'text'});
});
