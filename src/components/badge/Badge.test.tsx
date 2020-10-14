import {render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import Badge, {BadgeProps} from './Badge';

function runTest(name: string, props?: ObjectPartial<BadgeProps>) {
  test(name, async () => {
    render(<Badge {...props} />);
  });
}

describe('Badge', () => {
  runTest('default');
  runTest('value', {value: 10});
});
