import React from 'react';
import {Image, Dimensions, StyleSheet, View} from 'react-native';
import {Swiper} from '../../../src';

export interface SwiperStoryProps {}

export default function SwiperStory() {
  const vw = Dimensions.get('screen').width;

  return (
    <View style={styles.container}>
      <Swiper
        height={vw}
        width={vw}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Image
            style={styles.item}
            source={{uri: `https://i.picsum.photos/id/${item}/200/200.jpg`}}
          />
        )}
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
  item: {
    height: '100%',
    width: '100%',
  },
});
