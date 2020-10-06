import React from 'react';
import {render} from '@testing-library/react-native';
import {ObjectPartial} from '../../types';
import Touchable, {TouchableProps} from './Touchable';

function runTest(name: string, props?: ObjectPartial<TouchableProps>) {
  test(name, async () => {
    render(<Touchable {...props} />);
  });
}

describe('Touchable', () => {
  runTest('default');
  runTest('type normal', {type: 'normal'});
  runTest('type highlight', {type: 'highlight'});
});
