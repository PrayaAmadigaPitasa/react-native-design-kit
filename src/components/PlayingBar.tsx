import React, {useState, useEffect} from 'react';
import {View, ViewProps, StyleSheet, ViewStyle, Platform} from 'react-native';

export interface PlayingBarItemBaseProps {
  barStyle?: ViewProps;
}

export interface PlayingBarItemProps extends PlayingBarItemBaseProps {
  height: number;
}

export interface PlayingBarProps extends PlayingBarItemBaseProps {
  bars?: number[];
  containerStyle?: ViewStyle;
  minHeight?: number;
  maxHeight?: number;
  tps?: number;
  frequency?: number;
}

export function PlayingBarItem({barStyle, height}: PlayingBarItemProps) {
  return (
    <View
      style={StyleSheet.flatten([styles.bar, barStyle, {height: height}])}
    />
  );
}

export default function PlayingBar({
  bars = [0.5, 0.9, 0.4, 0.8],
  containerStyle,
  minHeight = 4,
  maxHeight = 20,
  tps = 100,
  frequency = 1.5,
  ...props
}: PlayingBarProps) {
  const [progress, setProgress] = useState(0);
  const min = Math.min(minHeight, maxHeight);
  const max = Math.max(minHeight, maxHeight);
  const dif = max - min;
  const period = 1000 / tps;
  const increment = (1 / tps) * frequency;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const scale = Platform.select({android: 1.5, default: 1});
      setProgress(progress + ((increment * scale) % 1));
    }, period);

    return () => {
      clearTimeout(timeout);
    };
  }, [progress]);

  function getHeight(start: number) {
    const relative = (progress + Math.abs(start)) % 1;

    return min + dif * 2 * (relative > 0.5 ? 1 - relative : relative);
  }

  function ListPlayingBarItem() {
    const list: JSX.Element[] = [];

    for (let index = 0; index < bars.length; index++) {
      const bar = (
        <PlayingBarItem
          {...props}
          key={index}
          height={getHeight(bars[index])}
        />
      );

      list.push(bar);
    }

    return list;
  }

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        containerStyle,
        {height: maxHeight + 1},
      ])}>
      {ListPlayingBarItem()}
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
