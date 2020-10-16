import {render} from '@testing-library/react-native';
import React from 'react';
import {useDidUpdate} from './ObjectHookHelper';

interface TestUseDidUpdateProps {
  count?: number;
}

function TestUseDidUpdate({count}: TestUseDidUpdateProps) {
  useDidUpdate(() => {}, [count]);
  return null;
}

describe('ObjectHookHelper', () => {
  test('useDidUpdate', () => {
    const {rerender} = render(<TestUseDidUpdate />);

    rerender(<TestUseDidUpdate count={2} />);
  });
});
