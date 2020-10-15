import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {ObjectPartial} from '../../types';
import ButtonGroup, {ButtonGroupProps} from './ButtonGroup';

const defaultProps: ButtonGroupProps = {
  buttonIds: ['a', 'b', 'c'],
  onSelect: jest.fn(),
  onPress: jest.fn(),
  testID: 'button',
};

function runTest(name: string, props?: ObjectPartial<ButtonGroupProps>) {
  test(name, async () => {
    const {getAllByTestId} = render(
      <ButtonGroup {...defaultProps} {...props} />,
    );
    const buttons = getAllByTestId('button');

    for (const button of buttons) {
      fireEvent.press(button);
    }
  });
}

describe('ButtonGroup', () => {
  runTest('default');
  runTest('selectedId', {selectedId: ['a', 'b']});
  runTest('selectedId non-solid', {selectedId: ['a', 'b'], type: 'outline'});
  runTest('buttonComponent', {buttonComponent: info => info.id});
  runTest('buttonComponent element', {buttonComponent: () => <></>});
  runTest('actionType radio', {
    actionType: 'radio',
  });
});
