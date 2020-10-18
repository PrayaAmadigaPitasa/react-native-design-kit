import React, {ReactNode, useCallback, useRef, useState} from 'react';
import {Animated, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {useDidUpdate} from '../../utilities';

export interface CollapseProps {
  visible?: boolean;
  animationDuration?: number;
  children: ReactNode;
}

export default function Collapse({
  visible = false,
  animationDuration = 250,
  children,
}: CollapseProps) {
  const height = useRef<number>(0);
  const refView = useRef<View>();
  const animation = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const toggle = useRef(visible);
  const [animating, setAnimating] = useState(false);

  const handleRefView = useCallback((instance: View | null) => {
    if (instance) {
      refView.current = instance;
    }
  }, []);

  const handleLayoutView = useCallback(
    (event: LayoutChangeEvent) => {
      if (!animating) {
        height.current = event.nativeEvent.layout.height;
      }
    },
    [refView.current && animating],
  );

  const handleRunAnimation = useCallback(() => {
    setAnimating(true);
    Animated.timing(animation, {
      toValue: visible ? 1 : 0,
      duration: animationDuration,
      useNativeDriver: false,
    }).start(callback => {
      if (callback.finished) {
        toggle.current = visible;
        setAnimating(false);
      }
    });
  }, [animation, visible, animationDuration]);

  useDidUpdate(handleRunAnimation, [handleRunAnimation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        toggle.current && !animating
          ? undefined
          : {
              overflow: 'hidden',
              height: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, height.current],
              }),
            },
      ])}>
      <View
        ref={handleRefView}
        style={StyleSheet.flatten([
          !animating && !toggle.current && {position: 'absolute'},
        ])}
        onLayout={handleLayoutView}>
        {children}
      </View>
    </Animated.View>
  );
}
