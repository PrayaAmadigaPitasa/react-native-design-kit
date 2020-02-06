import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Modal} from '../../../src';

export default function ModalStory() {
  const [toggle, setToggle] = useState(false);

  return (
    <View style={styles.container}>
      <Button title="Click Me" onPress={() => setToggle(true)} />
      {toggle && (
        <Modal visible={toggle} onPressBackdrop={() => setToggle(false)}>
          <View style={styles.modalContainer} />
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
