import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {View, ViewProps, StyleSheet, ViewStyle, Platform} from 'react-native';

export interface PlayingBarProps {
  bars?: number[];
  barStyle?: ViewProps;
  containerStyle?: ViewStyle;
  minHeight?: number;
  maxHeight?: number;
  tps?: number;
  frequency?: number;
}

export default function PlayingBar({
  bars = [0.5, 0.9, 0.4, 0.8],
  barStyle,
  containerStyle,
  minHeight = 4,
  maxHeight = 20,
  tps = 100,
  frequency = 1.5,
}: PlayingBarProps) {
  const [progress, setProgress] = useState(0);
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      const scale = Platform.select({android: 1.5, default: 1});
      setProgress(progress + ((increment * scale) % 1));
    }, period);

    return () => clearTimeout(timeout);
  }, [increment, progress, period]);

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
