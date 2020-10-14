import {render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import Button, {ButtonProps} from './Button';

function runTest(name: string, props?: ObjectPartial<ButtonProps>) {
  test(name, async () => {
    render(<Button {...props} />);
  });
}

describe('Button', () => {
  runTest('default');
  runTest('disabled', {disabled: true});
  runTest('raised', {raised: true});
  runTest('type text', {type: 'text'});
  runTest('type outline', {type: 'outline'});
  runTest('topIcon', {topIcon: <></>});
  runTest('leftIcon', {leftIcon: <></>});
  runTest('rightIcon', {rightIcon: <></>});
  runTest('bottomIcon', {bottomIcon: <></>});
});
