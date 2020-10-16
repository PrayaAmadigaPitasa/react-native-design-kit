import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import Chip, {ChipProps} from './Chip';

const defaultProps: ChipProps = {
  chips: ['a', 'b', 'c', 'd', 'e'],
  selectedId: ['a', 'b'],
  onSelect: jest.fn(),
  onPress: jest.fn(),
  testID: 'chip',
};

function runTest(name: string, props?: ObjectPartial<ChipProps>) {
  test(name, async () => {
    const {getAllByTestId, getByTestId} = render(
      <Chip {...defaultProps} {...props} />,
    );
    const chips = getAllByTestId('chip');

    if (props?.horizontal) {
      const list = getByTestId('list');

      fireEvent(list, 'layout', {
        nativeEvent: {layout: {x: 0, y: 0, width: 1000, height: 48}},
      });
      fireEvent(list, 'scroll', {
        nativeEvent: {
          contentOffset: {
            x: 250,
            y: 0,
          },
          contentSize: {
            height: 48,
            width: 1000,
          },
          layoutMeasurement: {
            height: 1000,
            width: 500,
          },
        },
      });
    }

    for (const chip of chips) {
      fireEvent.press(chip);
    }
  });
}

describe('Chip', () => {
  runTest('default');
  runTest('horizontal', {horizontal: true});
  runTest('horizontal horizontalScrollButton', {
    horizontal: true,
    horizontalScrollButton: true,
  });
  runTest('leftIcon', {leftIcon: () => <></>});
  runTest('leftIconAction check', {leftIconAction: () => 'check'});
  runTest('leftIconAction delete', {leftIconAction: () => 'delete'});
  runTest('rightIcon', {rightIcon: () => <></>});
  runTest('rightIconAction check', {rightIconAction: () => 'check'});
  runTest('rightIconAction delete', {rightIconAction: () => 'delete'});
  runTest('actionType checkbox', {actionType: 'checkbox'});
  runTest('actionType radio', {actionType: 'radio'});
  runTest('chipComponent id', {chipComponent: info => info.id});
  runTest('chipComponent element', {chipComponent: () => <></>});
  runTest('chipContainerStyle function', {chipContainerStyle: () => ({})});
  runTest('chipTitleStyle function', {chipTitleStyle: () => ({})});
  runTest('selectedChipContainerStyle function', {
    selectedChipContainerStyle: () => ({}),
  });
  runTest('selectedChipTitleStyle function', {
    selectedChipTitleStyle: () => ({}),
  });
});
