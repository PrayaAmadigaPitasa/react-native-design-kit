import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {ObjectPartial} from '../../types';
import SwitchableText, {SwitchableTextProps} from './SwitchableText';

jest.useFakeTimers();

const defaultProps: SwitchableTextProps = {
  texts: ['a', 'b', 'c', 'd'],
};

function runTest(name: string, props?: ObjectPartial<SwitchableTextProps>) {
  test(name, async () => {
    const {getByTestId} = render(
      <SwitchableText {...defaultProps} {...props} />,
    );

    if (props?.texts ? props.texts.length > 0 : defaultProps.texts.length > 0) {
      const text = getByTestId('text');

      fireEvent(text, 'layout', {nativeEvent: {layout: {width: 100}}});
    }
  });
}

describe('SwitchableText', () => {
  runTest('default');
  runTest('texts empty', {texts: []});
  runTest('texts single', {texts: ['a']});
});
