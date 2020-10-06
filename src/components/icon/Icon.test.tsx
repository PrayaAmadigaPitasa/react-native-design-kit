import {render} from '@testing-library/react-native';
import React from 'react';
import Icon from './Icon';

describe('Icon', () => {
  test('default', async () => {
    render(<Icon name="glass" />);
  });
});
