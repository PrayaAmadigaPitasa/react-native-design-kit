import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
import {Picker} from '.';

describe('Picker', () => {
  afterEach(cleanup);

  test('default', () => {
    const {baseElement, getByTestId} = render(<Picker />);
    const buttonContainer = getByTestId('button-container');

    expect(baseElement);
    fireEvent.press(buttonContainer);
  });
});
