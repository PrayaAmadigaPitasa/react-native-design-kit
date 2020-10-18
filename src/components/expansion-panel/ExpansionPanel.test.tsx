import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {ObjectPartial} from '../../types';
import ExpansionPanel, {ExpansionPanelProps} from './ExpansionPanel';

function runTest(name: string, props?: ObjectPartial<ExpansionPanelProps>) {
  test(name, async () => {
    const {getByTestId, rerender} = render(<ExpansionPanel {...props} />);
    const panel = getByTestId('panel');

    fireEvent(panel, 'press');
    fireEvent(panel, 'layout', {nativeEvent: {layout: {}}});
    rerender(<ExpansionPanel {...props} visible={!props?.visible} />);
  });
}

describe('ExpansionPanel', () => {
  runTest('default');
  runTest('visible', {visible: true});
  runTest('subtitle', {subtitle: 'subtitle'});
});
