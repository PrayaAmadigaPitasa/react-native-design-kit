import React from 'react';
import {render} from '@testing-library/react-native';
import Avatar, {AvatarProps} from './Avatar';

const defaultProps: AvatarProps = {
  source: {uri: ''},
};

function runTest(name: string) {
  test(name, async () => {
    render(<Avatar {...defaultProps} />);
  });
}

describe('Avatar', () => {
  runTest('default');
});
