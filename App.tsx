import React from 'react';
import {StyleSheet, View} from 'react-native';

export interface ItemData {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export default function App() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    margin: 2.5,
  },
  item: {
    height: 200,
    width: 200,
    backgroundColor: 'black',
  },
});
