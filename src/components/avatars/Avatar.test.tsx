import React from 'react';
import {render} from '@testing-library/react-native';
import {ObjectPartial} from '../../types';
import Avatar, {AvatarProps} from './Avatar';

const defaultProps: AvatarProps = {
  source: {uri: ''},
};

function runTest(name: string, props?: ObjectPartial<AvatarProps>) {
  test(name, async () => {
    render(<Avatar {...defaultProps} {...props} />);
  });
}

describe('Avatar', () => {
  runTest('default');
});
