import React, {useState, createRef, useEffect} from 'react';
import {
  FlatList,
  View,
  FlatListProps,
  ViewStyle,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
} from 'react-native';

interface SwiperState {
  index: number;
}

export interface SwiperProps<ItemT> extends FlatListProps<ItemT> {
  height: number;
  width: number;
  containerStyle?: ViewStyle;
  scaleMoveTrigger?: number;
  scaleVelocityTrigger?: number;
}

export default function Swiper<ItemT>({
  data,
  renderItem,
  horizontal = true,
  height,
  width,
  initialScrollIndex = 0,
  containerStyle,
  scaleMoveTrigger = 0.35,
  scaleVelocityTrigger = 1,
  showsHorizontalScrollIndicator = false,
  onScrollEndDrag,
  ...props
}: SwiperProps<ItemT>) {
  const refSwiper = createRef<FlatList<ItemT>>();
  const [state, setState] = useState<SwiperState>({index: initialScrollIndex});
  const {index} = state;
  const length = data?.length || 0;

  useEffect(() => {
    refSwiper.current?.scrollToIndex({index});
  }, [state]);

  /**
   * @param event scroll event
   *
   * @description
   * called when scroll
   * list end dragged
   */
  function handleScrollEndDrag(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const velocity = event.nativeEvent.velocity?.x || 0;
    const velocityPlatform = Platform.select({android: -1, default: 1});
    const previousOffset = width * index;
    const difOffset = previousOffset - event.nativeEvent.contentOffset.x;
    let nextIndex = index;

    if (Math.abs(velocity) >= scaleVelocityTrigger) {
      nextIndex = index + (velocity > 0 ? 1 : -1) * velocityPlatform;
    } else if (Math.abs(difOffset) >= scaleMoveTrigger * width) {
      nextIndex = index + (velocity > 0 ? 1 : -1);
    }

    onScrollEndDrag && onScrollEndDrag(event);
    setState({index: Math.max(0, Math.min(length - 1, nextIndex))});
  }

  return (
    <View style={StyleSheet.flatten([containerStyle, {height, width}])}>
      <FlatList
        {...props}
        data={data}
        initialScrollIndex={initialScrollIndex}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        ref={refSwiper}
        onScrollEndDrag={handleScrollEndDrag}
        renderItem={info => (
          <View style={{height, width}}>{renderItem(info)}</View>
        )}
      />
    </View>
  );
}
