import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Button, Input, ButtonGroup} from './src';

export default function App() {
  const [value, setValue] = useState('');

  console.log(value);

  return (
    <View style={styles.container}>
      <Button disabled={value === ''} onPress={() => Alert.alert('Test')} />
      <Input onChangeText={text => setValue(text)} />
      <ButtonGroup
        type="outline"
        actionType="radio"
        buttonIds={['Banana', 'Apple', 'Orange']}
        onSelect={() => {}}
      />
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
