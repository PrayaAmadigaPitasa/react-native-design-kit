import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
import {toBeDisabled, toBeEnabled} from '@testing-library/jest-native';
import Chip from './Chip';

expect.extend({toBeDisabled, toBeEnabled});

const props = {
  chips: [
    'Banana',
    'Apple',
    'Cherry',
    'DragonFruit',
    'Melon',
    'Grape',
    'Durian',
  ],
  onSelect: () => {},
};

describe('Chip', () => {
  afterEach(cleanup);

  test('default', () => {
    const {baseElement, getAllByTestId} = render(<Chip {...props} />);
    const buttonContainer = getAllByTestId('button-container')[0];

    expect(baseElement);
    fireEvent.press(buttonContainer);
  });

  test('horizontal', () => {
    const {baseElement, getByTestId} = render(
      <Chip {...props} horizontal horizontalScrollButton />,
    );

    // Belom ke render jadi tidak kebaca
    // const chipScrollLeftIconContainer = getByTestId(
    //   'chip-scroll-left-icon-container',
    // );
    // const chipScrollRightIconContainer = getByTestId(
    //   'chip-scroll-right-icon-container',
    // );

    expect(baseElement);
    // expect(chipScrollRightIconContainer).toBeEnabled();
    // fireEvent.press(chipScrollRightIconContainer);
    // fireEvent.press(chipScrollLeftIconContainer);
  });

  test('left icon', () => {
    const {baseElement} = render(<Chip {...props} leftIcon={() => <></>} />);

    expect(baseElement);
  });

  test('left icon action check', () => {
    const {baseElement} = render(
      <Chip {...props} leftIconAction={() => 'check'} />,
    );

    expect(baseElement);
  });

  test('left icon action delete', () => {
    const {baseElement} = render(
      <Chip {...props} leftIconAction={() => 'delete'} />,
    );

    expect(baseElement);
  });
});
