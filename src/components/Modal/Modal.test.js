import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
import {Modal} from '.';

describe('Modal', () => {
  afterEach(cleanup);

  test('default', () => {
    const {baseElement, getByTestId} = render(<Modal />);
    const buttonContainer = getByTestId('button-container');

    expect(baseElement);
    fireEvent.press(buttonContainer);
  });
});
