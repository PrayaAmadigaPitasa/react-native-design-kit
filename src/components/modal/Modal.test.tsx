import {render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import Modal, {ModalProps} from './Modal';

const defaultProps: ModalProps = {
  children: null,
};

function runTest(name: string, props?: ObjectPartial<ModalProps>) {
  test(name, async () => {
    render(<Modal {...defaultProps} {...props} />);
  });
}

describe('Modal', () => {
  runTest('default');
});
