import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {View, ViewProps, StyleSheet, ViewStyle, Animated} from 'react-native';

export interface PlayingBarProps {
  bars?: number[];
  barStyle?: ViewProps;
  containerStyle?: ViewStyle;
  minHeight?: number;
  maxHeight?: number;
  tps?: number;
  frequency?: number;
  byPassAnimatedCallback?: boolean;
}

export default function PlayingBar({
  bars = [0.5, 0.9, 0.4, 0.8],
  barStyle,
  containerStyle,
  minHeight = 4,
  maxHeight = 20,
  tps = 60,
  frequency = 2,
  byPassAnimatedCallback = false,
}: PlayingBarProps) {
  const [progress, setProgress] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;
  const min = useMemo(() => Math.min(minHeight, maxHeight), [
    minHeight,
    maxHeight,
  ]);
  const max = useMemo(() => Math.max(minHeight, maxHeight), [
    minHeight,
    maxHeight,
  ]);
  const dif = useMemo(() => max - min, [max, min]);
  const period = useMemo(() => 1000 / tps, [tps]);
  const increment = useMemo(() => (1 / tps) * frequency, [tps, frequency]);
  const mounted = useRef(true);

  const handleRenderPlayingBarItem = useCallback(
    (key: number, start: number) => {
      const relative = (progress + Math.abs(start)) % 1;
      const height = min + dif * 2 * (relative > 0.5 ? 1 - relative : relative);

      return (
        <View
          key={key}
          style={StyleSheet.flatten([styles.bar, barStyle, {height}])}
        />
      );
    },
    [barStyle, progress, min, dif],
  );

  const handleRenderListPlayingBarItem = useMemo(
    () => bars.map((value, index) => handleRenderPlayingBarItem(index, value)),
    [handleRenderPlayingBarItem],
  );

  const handleRunAnimation = useCallback(() => {
    mounted.current = true;
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: period,
      useNativeDriver: true,
    }).start(
      callback =>
        mounted.current &&
        (callback.finished || byPassAnimatedCallback) &&
        setProgress(progress + (increment % 1)),
    );

    return () => {
      mounted.current = false;
    };
  }, [animation, period, progress]);

  useEffect(handleRunAnimation, [handleRunAnimation]);

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        containerStyle,
        {height: maxHeight + 1},
      ])}>
      {handleRenderListPlayingBarItem}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bar: {
    width: 3.5,
    backgroundColor: 'black',
    marginHorizontal: 1,
  },
});
