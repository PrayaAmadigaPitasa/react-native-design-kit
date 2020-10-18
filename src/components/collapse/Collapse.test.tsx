import React from 'react';
import {render} from '@testing-library/react-native';
import {ObjectPartial} from '../../types';
import Collapse, {CollapseProps} from './Collapse';

const defaultProps: CollapseProps = {
  children: null,
};

function runTest(name: string, props?: ObjectPartial<CollapseProps>) {
  test(name, async () => {
    render(<Collapse {...defaultProps} {...props} />);
  });
}

describe('Collapse', () => {
  runTest('default');
});
