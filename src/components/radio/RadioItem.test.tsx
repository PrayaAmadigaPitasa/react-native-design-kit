import {render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import RadioItem, {
  RadioItemProps,
  DefaultDisabledRadio,
  DefaultSelectedRadio,
} from './RadioItem';

function runTestDefault() {
  test('default radio', async () => {
    render(<DefaultDisabledRadio />);
    render(<DefaultSelectedRadio />);
  });
}

function runTest(name: string, props?: ObjectPartial<RadioItemProps>) {
  test(name, async () => {
    render(<RadioItem {...props} />);
  });
}

describe('RadioItem', () => {
  runTestDefault();
  runTest('default');
  runTest('isSelected', {isSelected: true});
  runTest('children', {children: <></>});
});
