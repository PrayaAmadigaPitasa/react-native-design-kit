import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {ObjectPartial} from '../../types';
import ExpansionPanel, {ExpansionPanelProps} from './ExpansionPanel';

jest.mock(
  'react-native/Libraries/Components/Touchable/TouchableOpacity',
  () => {
    return {measure: jest.mock};
  },
);

function runTest(name: string, props?: ObjectPartial<ExpansionPanelProps>) {
  test(name, async () => {
    const {getByTestId, rerender} = render(<ExpansionPanel {...props} />);
    const panel = getByTestId('panel');

    fireEvent.press(panel);

    rerender(<ExpansionPanel {...props} visible={!props?.visible} />);
  });
}

describe('ExpansionPanel', () => {
  runTest('default');
  runTest('visible', {visible: true});
  runTest('subtitle', {subtitle: 'subtitle'});
});
