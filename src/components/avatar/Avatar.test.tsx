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
  runTest('iconSize', {iconSize: 20});
  runTest('icon edit', {icon: 'edit'});
  runTest('icon status-online', {icon: 'status-online'});
  runTest('icon status-offline', {icon: 'status-offline'});
  runTest('icon status-standby', {icon: 'status-standby'});
});
