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

function runTest(
  name: string,
  props?: ObjectPartial<ButtonGroupProps>,
  rerenderProps?: ObjectPartial<ButtonGroupProps>,
) {
  test(name, async () => {
    const {getAllByTestId, rerender} = render(
      <ButtonGroup {...defaultProps} {...props} />,
    );
    const buttons = getAllByTestId('button');

    for (const button of buttons) {
      fireEvent.press(button);
    }

    if (rerenderProps) {
      rerender(<ButtonGroup {...defaultProps} {...props} {...rerenderProps} />);
    }
  });
}

describe('ButtonGroup', () => {
  runTest('default');
  runTest('selectedId', {selectedId: ['a', 'b']});
  runTest('selectedId non-solid', {selectedId: ['a', 'b'], type: 'outline'});
  runTest(
    'rerender selectedId',
    {selectedId: ['a', 'b']},
    {selectedId: ['b', 'c']},
  );
  runTest(
    'rerender selectedId undefined',
    {selectedId: ['a', 'b']},
    {selectedId: undefined},
  );
  runTest('buttonComponent', {buttonComponent: info => info.id});
  runTest('buttonComponent element', {buttonComponent: () => <></>});
  runTest('actionType radio', {
    actionType: 'radio',
  });
  runTest('actionType checkbox', {
    actionType: 'checkbox',
    selectedId: ['a', 'b'],
  });
});
