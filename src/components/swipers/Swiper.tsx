import React, {useRef} from 'react';
import {Image, Animated} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';

export default function Swiper() {
  const translationX = useRef(new Animated.Value(0)).current;
  const gestureEvent = useRef(getGestureEvent()).current;

  function getGestureEvent() {
    return Animated.event(
      [
        {
          nativeEvent: {translationX},
        },
      ],
      {useNativeDriver: true},
    );
  }

  return (
    <PanGestureHandler onGestureEvent={gestureEvent}>
      <Image
        style={{
          height: 300,
          width: 300,
        }}
        source={{
          uri:
            'https://i.pinimg.com/736x/70/3a/26/703a26fc83ced438ac13db8ce92f12a1.jpg',
        }}
      />
    </PanGestureHandler>
  );
}
