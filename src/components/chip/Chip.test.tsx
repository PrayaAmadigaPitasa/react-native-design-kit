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
    const {getAllByTestId, getByTestId, rerender} = render(
      <Chip {...defaultProps} {...props} />,
    );
    const chips = getAllByTestId('chip');

    if (props?.horizontal) {
      const list = getByTestId('list');

      fireEvent(list, 'contentSizeChange', 2000, 48);
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

      if (props?.horizontalScrollButton) {
        const buttonLeft = getByTestId('button-left');
        const buttonRight = getByTestId('button-right');

        fireEvent.press(buttonLeft);
        fireEvent.press(buttonRight);
      }
    }

    for (const chip of chips) {
      fireEvent.press(chip);
    }

    if (props?.leftIconAction && props.leftIconAction('', false) === 'delete') {
      const icons = getAllByTestId('icon-delete');

      for (const icon of icons) {
        fireEvent.press(icon);
      }
    }

    rerender(<Chip {...defaultProps} {...props} selectedId={undefined} />);
  });
}

describe('Chip', () => {
  runTest('default');
  runTest('selectedId empty', {selectedId: []});
  runTest('horizontal', {horizontal: true});
  runTest('horizontal horizontalScrollButton', {
    horizontal: true,
    horizontalScrollButton: true,
  });
  runTest('leftIcon', {leftIcon: () => <></>});
  runTest('leftIconAction check', {leftIconAction: () => 'check'});
  runTest('leftIconAction delete', {leftIconAction: () => 'delete'});
  runTest('leftIconAction function', {leftIconAction: () => jest.fn()});
  runTest('rightIcon', {rightIcon: () => <></>});
  runTest('rightIconAction check', {rightIconAction: () => 'check'});
  runTest('rightIconAction delete', {rightIconAction: () => 'delete'});
  runTest('rightIconAction function', {rightIconAction: () => jest.fn()});
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
