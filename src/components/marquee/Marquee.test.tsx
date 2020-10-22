import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import Marquee, {MarqueeProps} from './Marquee';

const defaultProps: MarqueeProps = {
  children: null,
  containerStyle: {width: 1000},
};

function runTest(name: string, props?: ObjectPartial<MarqueeProps>) {
  test(name, async () => {
    const {getByTestId} = render(<Marquee {...defaultProps} {...props} />);
    const container = getByTestId('container');
    const width =
      props?.containerStyle?.width || defaultProps.containerStyle?.width || 0;

    fireEvent(container, 'layout', {
      nativeEvent: {
        layout: {
          width,
        },
      },
    });

    if (width) {
      const marquee = getByTestId('marquee');

      fireEvent(marquee, 'contentSizeChange');
    }
  });
}

describe('Marquee', () => {
  runTest('default');
  runTest('containerStyle invalid', {containerStyle: {width: 0}});
  runTest('byPassAnimationCallback', {byPassAnimationCallback: true});
});
