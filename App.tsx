import React, {useRef, createRef, useState, useMemo} from 'react';
import {StyleSheet, View, TextInput, Text, Button} from 'react-native';

export default function App() {
  const ref = createRef<TextInput>();
  const refCopy = createRef<TextInput>();
  const refRender = useRef(0);
  const [counter, setCounter] = useState(0);
  const render = useMemo(() => refRender.current++, []);

  function handlePress() {
    const time = new Date().toString();
    ref.current?.setNativeProps({
      placeholder: `Time: ${time}`,
    });
  }

  function handleChangeText(text: string) {
    setCounter(counter + 1);
    refCopy.current?.setNativeProps({text});
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionInput}>
        <TextInput ref={refCopy} />
        <TextInput
          ref={ref}
          style={styles.input}
          onChangeText={handleChangeText}
        />
      </View>
      <Text>{`Counter: ${counter}`}</Text>
      <Text>{`Render: ${render}`}</Text>
      <Button title="Click Me" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionInput: {
    width: '100%',
  },
  input: {
    height: 48,
    borderWidth: 1,
  },
});
