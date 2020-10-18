import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {ObjectPartial} from '../../types';
import Collapse, {CollapseProps} from './Collapse';

const defaultProps: CollapseProps = {
  children: null,
};

function runTest(name: string, props?: ObjectPartial<CollapseProps>) {
  test(name, async () => {
    const {getByTestId, rerender} = render(
      <Collapse {...defaultProps} {...props} />,
    );
    const view = getByTestId('view');

    fireEvent(view, 'layout', {nativeEvent: {layout: {}}});
    rerender(
      <Collapse {...defaultProps} {...props} visible={!props?.visible} />,
    );
    fireEvent(view, 'layout', {nativeEvent: {layout: {}}});
  });
}

describe('Collapse', () => {
  runTest('default');
  runTest('byPassAnimationCallback', {byPassAnimationCallback: true});
  runTest('visible', {visible: true});
});
