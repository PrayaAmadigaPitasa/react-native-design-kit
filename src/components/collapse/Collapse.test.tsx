import React from 'react';
import {render} from '@testing-library/react-native';
import {ObjectPartial} from '../../types';
import Collapse, {CollapseProps} from './Collapse';

const defaultProps: CollapseProps = {
  children: null,
};

function runTest(name: string, props?: ObjectPartial<CollapseProps>) {
  test(name, async () => {
    const {rerender} = render(<Collapse {...defaultProps} {...props} />);

    rerender(
      <Collapse {...defaultProps} {...props} visible={!props?.visible} />,
    );
  });
}

describe('Collapse', () => {
  runTest('default');
  runTest('byPassAnimationCallback', {byPassAnimationCallback: true});
  runTest('visible', {visible: true});
});
