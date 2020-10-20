import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {ObjectPartial} from '../../types';
import Modal, {ModalProps} from './Modal';

const defaultProps: ModalProps = {
  children: null,
  onPressBackdrop: jest.fn(),
};

function runTest(name: string, props?: ObjectPartial<ModalProps>) {
  test(name, async () => {
    const {getByTestId, rerender} = render(
      <Modal {...defaultProps} {...props} />,
    );
    const backdrop = getByTestId('backdrop');

    fireEvent.press(backdrop);
    rerender(<Modal {...defaultProps} {...props} visible={!props?.visible} />);
  });
}

describe('Modal', () => {
  runTest('default');
  runTest('visible', {visible: true});
});
