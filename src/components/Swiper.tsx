import React, {useState} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';

const screenWidth = Math.round(Dimensions.get('screen').width);

export interface SwiperResponse {
  id: number;
  URI: string;
}

export interface SwiperProps {
  swiperWidth: number;
  swiperHeight: number;
}

export default function Swiper({swiperWidth, swiperHeight}: SwiperProps) {
  const [refContent, setRefContent] = useState<FlatList<SwiperResponse>>();

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        {width: swiperWidth, height: swiperHeight},
      ])}>
      <FlatList
        ref={instance => instance && setRefContent && setRefContent(instance)}
        getItemLayout={(data, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
        onScrollEndDrag={event => {
          const offset = Math.round(event.nativeEvent.contentOffset.x);
          const toIndex = Math.floor((offset + screenWidth / 2) / screenWidth);

          console.log(offset, toIndex);
          refContent?.scrollToIndex({
            animated: true,
            index: toIndex,
          });
        }}
        data={swiperData}
        horizontal
        renderItem={({item}) => (
          <View style={styles.contentContainer}>
            <Image style={styles.content} source={{uri: item.URI}} />
          </View>
        )}
      />
    </View>
  );
}

const swiperData: SwiperResponse[] = [
  {
    id: 0,
    URI:
      'https://media-cdn.tripadvisor.com/media/photo-s/14/56/97/6e/goat-cheese-burger.jpg',
  },
  {
    id: 1,
    URI:
      'https://media-cdn.tripadvisor.com/media/photo-s/14/56/97/6e/goat-cheese-burger.jpg',
  },
  {
    id: 2,
    URI:
      'https://media-cdn.tripadvisor.com/media/photo-s/14/56/97/6e/goat-cheese-burger.jpg',
  },
];

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: 100,
  },
  contentContainer: {
    width: screenWidth,
    height: 100,
  },
  content: {
    width: '100%',
    height: '100%',
  },
});
