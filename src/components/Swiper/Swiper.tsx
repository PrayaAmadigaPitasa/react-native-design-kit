import React, {useState, createRef, useEffect} from 'react';
import {
  FlatList,
  View,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  FlatListProps,
  ViewStyle,
  StyleSheet,
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
  containerStyle,
  scaleMoveTrigger = 0.35,
  scaleVelocityTrigger = 1,
  showsHorizontalScrollIndicator = false,
  ...props
}: SwiperProps<ItemT>) {
  const refSwiper = createRef<FlatList<ItemT>>();
  const [state, setState] = useState<SwiperState>({index: 0});
  const {index} = state;
  const panResponder = createPanResponder();
  const length = data?.length || 0;

  useEffect(() => {
    refSwiper.current?.scrollToIndex({index});
  }, [state]);

  /**
   * @description
   * create handler for
   * pan responder event
   */
  function createPanResponder() {
    return PanResponder.create({
      onPanResponderRelease: handleSwiperRelease,
    });
  }

  /**
   *
   * @param e gesture responder event
   * @param gestureState gesture state event
   *
   * @description
   * called when swiper
   * start to release
   */
  function handleSwiperRelease(
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) {
    const {dx, vx} = gestureState;
    let newIndex = index;

    if (Math.abs(vx) > scaleVelocityTrigger) {
      newIndex = index + (vx < 0 ? 1 : -1);
    } else if (Math.abs(dx) > width * scaleMoveTrigger) {
      newIndex = index + (dx < 0 ? 1 : -1);
    }

    setState({...state, index: Math.max(0, Math.min(length - 1, newIndex))});
  }

  return (
    <View style={StyleSheet.flatten([containerStyle, {height, width}])}>
      <FlatList
        {...props}
        {...panResponder.panHandlers}
        data={data}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        ref={refSwiper}
        renderItem={info => (
          <View style={{height, width}}>{renderItem(info)}</View>
        )}
      />
    </View>
  );
}
