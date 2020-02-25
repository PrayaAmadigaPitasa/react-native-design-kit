import React from 'react';
import {render, cleanup} from '@testing-library/react-native';
import {toBeDisabled, toBeEnabled} from '@testing-library/jest-native';
import {Button} from '.';

expect.extend({toBeDisabled, toBeEnabled});

describe('Button', () => {
  afterEach(cleanup);

  test('default', () => {
    const {baseElement, getByTestId} = render(<Button />);
    const buttonContainer = getByTestId('button-container');

    expect(baseElement);
    expect(buttonContainer).toBeEnabled();
  });

  test('disabled', () => {
    const {baseElement, getByTestId} = render(<Button disabled />);
    const buttonContainer = getByTestId('button-container');

    expect(baseElement);
    expect(buttonContainer).toBeDisabled();
  });

  test('raised', () => {
    const {baseElement} = render(<Button raised />);

    expect(baseElement);
  });

  test('type outline', () => {
    const {baseElement} = render(<Button type="outline" />);

    expect(baseElement);
  });

  test('type text', () => {
    const {baseElement} = render(<Button type="text" />);

    expect(baseElement);
  });

  test('top icon', () => {
    const {baseElement} = render(<Button topIcon={<></>} />);

    expect(baseElement);
  });

  test('left icon', () => {
    const {baseElement} = render(<Button leftIcon={<></>} />);

    expect(baseElement);
  });

  test('right icon', () => {
    const {baseElement} = render(<Button rightIcon={<></>} />);

    expect(baseElement);
  });

  test('bottom icon', () => {
    const {baseElement} = render(<Button bottomIcon={<></>} />);

    expect(baseElement);
  });
});
