import React from 'react';
import {render} from '@testing-library/react-native';
import {Avatar} from '.';

const defaultProps = {
  containerStyle: {},
  rounded: false,
  iconSize: 12,
  iconContainerStyle: {},
  onPress: () => {},
  onPressIcon: () => {},
  source: {
    uri:
      'https://i.pinimg.com/originals/70/3a/26/703a26fc83ced438ac13db8ce92f12a1.jpg',
  },
};

test('base', async () => {
  const props = {
    ...defaultProps,
  };
  const {baseElement} = render(<Avatar {...props} />);

  expect(baseElement);
});

test('rounded', async () => {
  const props = {
    ...defaultProps,
    rounded: true,
  };
  const {baseElement} = render(<Avatar {...props} />);

  expect(baseElement);
});

test('size', async () => {
  const props = {
    ...defaultProps,
    size: 48,
  };
  const {baseElement} = render(<Avatar {...props} />);

  expect(baseElement);
});

test('not rounded', async () => {
  const props = {
    ...defaultProps,
    rounded: false,
  };
  const {baseElement} = render(<Avatar {...props} />);

  expect(baseElement);
});

test('icon edit', async () => {
  const props = {
    ...defaultProps,
    icon: 'edit',
  };
  const {baseElement} = render(<Avatar {...props} />);

  expect(baseElement);
});

test('icon status-offline', async () => {
  const props = {
    ...defaultProps,
    icon: 'status-offline',
  };
  const {baseElement} = render(<Avatar {...props} />);

  expect(baseElement);
});

test('icon status-online', async () => {
  const props = {
    ...defaultProps,
  };
  const {baseElement} = render(<Avatar {...props} icon="status-online" />);

  expect(baseElement);
});

test('icon status-standby', async () => {
  const props = {
    ...defaultProps,
  };
  const {baseElement} = render(<Avatar {...props} icon="status-standby" />);

  expect(baseElement);
});

test('icon custom', async () => {
  const props = {
    ...defaultProps,
  };
  const {baseElement} = render(<Avatar {...props} icon={<></>} />);

  expect(baseElement);
});
