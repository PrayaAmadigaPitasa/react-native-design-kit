import {render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import ExpansionPanel, {ExpansionPanelProps} from './ExpansionPanel';

function runTest(name: string, props?: ObjectPartial<ExpansionPanelProps>) {
  test(name, async () => {
    render(<ExpansionPanel {...props} />);
  });
}

describe('ExpansionPanel', () => {
  runTest('default');
});
