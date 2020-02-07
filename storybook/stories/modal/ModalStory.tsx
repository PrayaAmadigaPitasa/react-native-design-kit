import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Modal, ModalProps} from '../../../src';

export interface ModalStoryProps extends ModalProps {
  title?: string;
}

export default function ModalStory({
  title = 'Click Me',
  onPressBackdrop,
  children,
  ...props
}: ModalStoryProps) {
  const [toggle, setToggle] = useState(false);

  return (
    <View style={styles.container}>
      <Button title={title} onPress={() => setToggle(true)} />
      {toggle && (
        <Modal
          {...props}
          visible={toggle}
          onPressBackdrop={event => {
            onPressBackdrop && onPressBackdrop(event);
            setToggle(false);
          }}>
          {children || <View style={styles.modalContainer} />}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    height: 200,
    width: 200,
    borderRadius: 4,
    backgroundColor: 'white',
  },
});
