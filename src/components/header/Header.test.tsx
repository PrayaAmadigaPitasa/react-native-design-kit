import {render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import Header, {HeaderProps} from './Header';

function runTest(name: string, props?: ObjectPartial<HeaderProps>) {
  test(name, async () => {
    render(<Header {...props} />);
  });
}

describe('Header', () => {
  runTest('default');
  runTest('placement left', {placement: 'left'});
  runTest('placement right', {placement: 'right'});
  runTest('placement center', {placement: 'center'});
  runTest('centerComponent', {centerComponent: <></>});
});
