import {render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import Marquee, {MarqueeProps} from './Marquee';

const defaultProps: MarqueeProps = {
  children: null,
};

function runTest(name: string, props?: ObjectPartial<MarqueeProps>) {
  test(name, async () => {
    render(<Marquee {...defaultProps} {...props} />);
  });
}

describe('Marquee', () => {
  runTest('default');
});
