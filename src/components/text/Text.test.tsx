import {render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import Text, {TextProps} from './Text';

const defaultProps: TextProps = {
  children: '',
};

function runTest(name: string, props?: ObjectPartial<TextProps>) {
  test(name, async () => {
    render(<Text {...defaultProps} {...props} />);
  });
}

describe('Text', () => {
  runTest('default');
});
