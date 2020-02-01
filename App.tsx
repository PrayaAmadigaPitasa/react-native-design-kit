import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Button, Input} from './src';

export default function App() {
  const [value, setValue] = useState('');

  console.log(value);

  return (
    <View style={styles.container}>
      <Button disabled={value === ''} onPress={() => Alert.alert('Test')} />
      <Input onChangeText={text => setValue(text)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
