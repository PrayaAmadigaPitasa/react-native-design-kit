import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import Slider, {SliderProps} from './Slider';

const defaultProps: SliderProps = {
  onChangeValue: jest.fn(),
};

function runTest(name: string, props?: ObjectPartial<SliderProps>) {
  test(name, async () => {
    const {getByTestId} = render(<Slider {...defaultProps} {...props} />);

    if (props?.button) {
      const buttonStart = getByTestId('button-start');
      const buttonEnd = getByTestId('button-end');

      fireEvent.press(buttonStart);
      fireEvent.press(buttonEnd);
    }
  });
}

describe('Slider', () => {
  runTest('default');
  runTest('button', {button: true});
  runTest('button buttonValue', {button: true, buttonValue: 20});
  runTest('indicator', {indicator: true});
  runTest('initialValue', {initialValue: 50});
});
