import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
import {toBeEnabled} from '@testing-library/jest-native';
import {ButtonGroup} from '.';

expect.extend({toBeEnabled});

const props = {
  buttonIds: ['Male', 'Female', 'Other'],
  onSelect: () => {},
  onPress: () => {},
};

describe('Button Group', () => {
  afterEach(cleanup);

  test('default', () => {
    const {baseElement, getAllByTestId} = render(<ButtonGroup {...props} />);
    const buttonContainer = getAllByTestId('button-container')[0];

    expect(baseElement);
    expect(buttonContainer).toBeEnabled();
    fireEvent.press(buttonContainer);
  });

  test('selected id string', () => {
    const {baseElement} = render(<ButtonGroup {...props} selectedId="Male" />);

    expect(baseElement);
  });

  test('selected id array of string', () => {
    const {baseElement} = render(
      <ButtonGroup {...props} selectedId={['Male', 'Female', 'Unknown']} />,
    );

    expect(baseElement);
  });

  test('selected id array of string non solid', () => {
    const {baseElement} = render(
      <ButtonGroup
        {...props}
        selectedId={['Male', 'Female', 'Unknown']}
        type="outline"
      />,
    );

    expect(baseElement);
  });

  test('button component string', () => {
    const {baseElement} = render(
      <ButtonGroup {...props} buttonComponent={info => info.id} />,
    );

    expect(baseElement);
  });

  test('button component element', () => {
    const {baseElement} = render(
      <ButtonGroup {...props} buttonComponent={() => <></>} />,
    );

    expect(baseElement);
  });

  test('action type checkbox', () => {
    const {baseElement, getAllByTestId} = render(
      <ButtonGroup {...props} actionType="checkbox" />,
    );
    const buttonContainer = getAllByTestId('button-container')[0];

    expect(baseElement);
    fireEvent.press(buttonContainer);
  });

  test('action type radio', () => {
    const {baseElement, getAllByTestId} = render(
      <ButtonGroup {...props} actionType="radio" />,
    );
    const buttonContainer = getAllByTestId('button-container')[0];

    expect(baseElement);
    fireEvent.press(buttonContainer);
  });

  test('action type checkbox selected', () => {
    const {baseElement, getAllByTestId} = render(
      <ButtonGroup
        {...props}
        actionType="checkbox"
        selectedId={['Male', 'Female', 'Unknown']}
      />,
    );
    const buttonContainer = getAllByTestId('button-container')[0];

    expect(baseElement);
    fireEvent.press(buttonContainer);
  });

  test('action type radio selected', () => {
    const {baseElement, getAllByTestId} = render(
      <ButtonGroup
        {...props}
        actionType="radio"
        selectedId={['Male', 'Female', 'Unknown']}
      />,
    );
    const buttonContainer = getAllByTestId('button-container')[0];

    expect(baseElement);
    fireEvent.press(buttonContainer);
  });
});
