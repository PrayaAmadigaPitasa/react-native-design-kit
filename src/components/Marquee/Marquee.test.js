import React from 'react';
import {render, cleanup} from '@testing-library/react-native';
import {Marquee} from '.';

describe('Marquee', () => {
  afterEach(cleanup);

  test('default', () => {
    const {baseElement} = render(<Marquee />);

    expect(baseElement);
  });
});
