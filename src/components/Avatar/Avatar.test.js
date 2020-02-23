import React from 'react';
import {render, cleanup} from '@testing-library/react-native';
import {toHaveStyle} from '@testing-library/jest-native';
import {Avatar} from '.';

expect.extend({toHaveStyle});

const defaultProps = {
  source: {
    uri:
      'https://i.pinimg.com/originals/70/3a/26/703a26fc83ced438ac13db8ce92f12a1.jpg',
  },
};

describe('Avatar', () => {
  afterEach(cleanup);

  test('default', () => {
    const props = {
      ...defaultProps,
    };
    const {baseElement} = render(<Avatar {...props} />);

    expect(baseElement);
  });

  test('not rounded', () => {
    const props = {
      ...defaultProps,
      rounded: false,
    };
    const {baseElement, getByTestId} = render(<Avatar {...props} />);
    const avatarImageContainer = getByTestId('avatar-image-container');

    expect(baseElement);
    expect(avatarImageContainer).toHaveStyle({height: 48, width: 48});
  });

  test('size', () => {
    const props = {
      ...defaultProps,
      size: 48,
    };
    const {baseElement} = render(<Avatar {...props} />);

    expect(baseElement);
  });

  test('icon size', () => {
    const props = {
      ...defaultProps,
      iconSize: 16,
    };
    const {baseElement} = render(<Avatar {...props} />);

    expect(baseElement);
  });

  test('icon edit', () => {
    const props = {
      ...defaultProps,
      icon: 'edit',
    };
    const {baseElement} = render(<Avatar {...props} />);

    expect(baseElement);
  });

  test('icon status-offline', () => {
    const props = {
      ...defaultProps,
      icon: 'status-offline',
    };
    const {baseElement} = render(<Avatar {...props} />);

    expect(baseElement);
  });

  test('icon status-online', () => {
    const props = {
      ...defaultProps,
    };
    const {baseElement} = render(<Avatar {...props} icon="status-online" />);

    expect(baseElement);
  });

  test('icon status-standby', () => {
    const props = {
      ...defaultProps,
    };
    const {baseElement} = render(<Avatar {...props} icon="status-standby" />);

    expect(baseElement);
  });

  test('icon custom', () => {
    const props = {
      ...defaultProps,
    };
    const {baseElement} = render(<Avatar {...props} icon={<></>} />);

    expect(baseElement);
  });
});
