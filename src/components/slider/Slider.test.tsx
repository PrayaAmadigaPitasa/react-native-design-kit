import {render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import Slider, {SliderProps} from './Slider';

const defaultProps: SliderProps = {
  onChangeValue: jest.fn(),
};

function runTest(name: string, props?: ObjectPartial<SliderProps>) {
  test(name, async () => {
    render(<Slider {...defaultProps} {...props} />);
  });
}

describe('Slider', () => {
  runTest('default');
});
