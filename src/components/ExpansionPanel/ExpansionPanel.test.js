import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
import {ExpansionPanel} from '.';

describe('Expansion Panel', () => {
  afterEach(cleanup);

  test('default', () => {
    const {baseElement, getByTestId} = render(<ExpansionPanel subtitle />);
    const buttonContainer = getByTestId('press-here');

    expect(baseElement);
    fireEvent.press(buttonContainer);
  });
});
