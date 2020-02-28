import React from 'react';
import {render, cleanup} from '@testing-library/react-native';
import {toHaveStyle} from '@testing-library/jest-native';
import Badge from './Badge';

expect.extend({toHaveStyle});

describe('Badge', () => {
  afterEach(cleanup);

  test('default', () => {
    const {baseElement, getByTestId} = render(<Badge />);
    const badgeContainer = getByTestId('badge-container');

    expect(baseElement);
    expect(badgeContainer).toHaveStyle({
      borderRadius: 9,
      height: 18,
      minWidth: 18,
    });
  });

  test('value', () => {
    const {baseElement} = render(<Badge value={12} />);

    expect(baseElement);
  });
});
