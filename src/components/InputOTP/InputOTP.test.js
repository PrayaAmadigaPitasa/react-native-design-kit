import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
import {InputOTP} from '.';

const props = {
  onChangeText: () => {},
  onChangeOTP: () => {},
  onFocus: () => {},
  onBlur: () => {},
};

describe('InputOTP', () => {
  afterEach(cleanup);

  test('default', () => {
    const {baseElement, getAllByTestId} = render(<InputOTP {...props} />);
    const textInput = getAllByTestId('text-input')[0];

    expect(baseElement);
    fireEvent.focus(textInput);
    fireEvent.changeText(textInput, 1);
    fireEvent.keyPress(textInput, {nativeEvent: {key: 'Backspace'}});
    // fireEvent.blur(textInput);
  });
  test('keypress backspace', () => {
    const {baseElement, getAllByTestId} = render(<InputOTP {...props} />);
    const textInput = getAllByTestId('text-input')[1];

    expect(baseElement);
    fireEvent.keyPress(textInput, {nativeEvent: {key: 'Backspace'}});
    // fireEvent.blur(textInput);
  });

  test('blur', () => {
    const {baseElement, getAllByTestId} = render(<InputOTP {...props} />);
    const textInput = getAllByTestId('text-input')[0];

    expect(baseElement);
    fireEvent.focus(textInput);
    fireEvent.blur(textInput, {nativeEvent: {text: ''}});
  });

  test('first empty focus', () => {
    const {baseElement, getAllByTestId} = render(
      <InputOTP {...props} firstEmptyFocus />,
    );
    const textInput = getAllByTestId('text-input')[2];

    expect(baseElement);
    fireEvent.focus(textInput);
    fireEvent.changeText(textInput, ' ');
    // fireEvent.blur(textInput);
  });

  test('placeholder component', () => {
    const {baseElement} = render(
      <InputOTP {...props} placeholderComponent={<></>} />,
    );

    expect(baseElement);
  });

  test('separator component', () => {
    const {baseElement} = render(
      <InputOTP {...props} separatorComponent={<></>} />,
    );

    expect(baseElement);
  });
});
