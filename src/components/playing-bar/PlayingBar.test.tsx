import {render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import PlayingBar, {PlayingBarProps} from './PlayingBar';

jest.useFakeTimers();

function runTest(name: string, props?: ObjectPartial<PlayingBarProps>) {
  test(name, async () => {
    render(<PlayingBar {...props} />);
  });
}

describe('PlayingBar', () => {
  runTest('default');
});
