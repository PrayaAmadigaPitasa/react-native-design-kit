import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
import {Header} from '.';

describe('Header', () => {
  afterEach(cleanup);

  test('default', () => {
    const {baseElement} = render(
      <Header title="John" placement centerComponent />,
    );

    expect(baseElement);
  });

  test('placement left', () => {
    const {baseElement} = render(<Header title="John" placement="left" />);

    expect(baseElement);
  });
  test('placement right', () => {
    const {baseElement} = render(<Header title="John" placement="right" />);

    fireEvent.focus;
    expect(baseElement);
  });
});
