import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
import Checkbox from './Checkbox';

const props = {
  checkboxIds: ['Banana', 'Apple', 'Grape'],
  onSelect: () => {},
  onPress: () => {},
};

describe('Checkbox', () => {
  afterEach(cleanup);

  test('default', () => {
    const {baseElement, getAllByTestId} = render(<Checkbox {...props} />);
    const checkboxItemContainer = getAllByTestId('checkbox-item-container')[0];

    expect(baseElement);
    fireEvent.press(checkboxItemContainer);
  });

  test('selected id', () => {
    const {baseElement, getAllByTestId} = render(
      <Checkbox {...props} defaultIds="Banana" />,
    );
    const checkboxItemContainer = getAllByTestId('checkbox-item-container')[0];

    expect(baseElement);
    fireEvent.press(checkboxItemContainer);
  });

  test('selected id array of string', () => {
    const {baseElement, getAllByTestId} = render(
      <Checkbox {...props} defaultIds={['Apple', 'Bear']} />,
    );
    const checkboxItemContainer = getAllByTestId('checkbox-item-container')[0];

    expect(baseElement);
    fireEvent.press(checkboxItemContainer);
  });

  test('nested', () => {
    const {baseElement, getAllByTestId} = render(
      <Checkbox
        {...props}
        checkboxIds={[
          {
            title: 'Fruit',
            checkboxIds: [
              'Banana',
              'Apple',
              'Grape',
              {title: 'rare', checkboxIds: ['Durian']},
            ],
          },
          {
            title: 'Animal',
            checkboxIds: [
              'Cat',
              'Dog',
              {title: 'Rare', checkboxIds: ['Lion', 'Bear']},
            ],
          },
        ]}
        defaultIds={['Banana', 'Cat', 'Dog', 'Lion', 'Bear']}
      />,
    );
    const checkboxItemContainer = getAllByTestId('checkbox-item-container')[0];
    const checkboxNestedContainer = getAllByTestId('checkbox-nested-container');
    const checkboxNestedFruitContainer = checkboxNestedContainer[0];
    const checkboxNestedAnimalContainer = checkboxNestedContainer[1];

    expect(baseElement);
    fireEvent.press(checkboxItemContainer);
    fireEvent.press(checkboxNestedFruitContainer);
    fireEvent.press(checkboxNestedAnimalContainer);
  });

  test('checkbox component', () => {
    const {baseElement} = render(
      <Checkbox {...props} checkboxComponent={info => info.id} />,
    );

    expect(baseElement);
  });

  test('checkbox component element', () => {
    const {baseElement} = render(
      <Checkbox {...props} checkboxComponent={() => <></>} />,
    );

    expect(baseElement);
  });
});
