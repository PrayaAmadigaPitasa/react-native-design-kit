import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';

export interface SwitchableTextProps {
  containerStyle?: ViewStyle;
  texts: string[];
  textStyle?: TextStyle;
  duration?: number;
  tps?: number;
  progressBar?: boolean;
  progressBarStyle?: ViewStyle;
  progressBarEasing?(value: number): number;
}

export default function SwitchableText({
  containerStyle,
  texts,
  textStyle,
  duration = 2000,
  tps = 100,
  progressBar = true,
  progressBarStyle,
}: SwitchableTextProps) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number>();
  const [progress, setProgress] = useState(0);
  const [timestamp, setTimestamp] = useState();

  useEffect(() => {
    if (width !== undefined) {
      if (progress >= 1) {
        const now = new Date().getTime();

        if (timestamp !== undefined) {
          console.log(`elapsed time: ${now - timestamp}`);
        }
        setTimestamp(now);
        setIndex((index + 1) % texts.length);
        setProgress(0);
      } else {
        const period = 1000 / Math.max(1, Math.min(1000, tps));
        const timeout = setTimeout(() => {
          setProgress(progress + period / duration);
        }, period);

        return () => clearTimeout(timeout);
      }
    }
  }, [progress, width]);

  useEffect(() => {
    setIndex(0);
  }, [texts]);

  return (
    <View style={containerStyle}>
      <Text
        style={StyleSheet.flatten([styles.text, textStyle])}
        onLayout={event => {
          if (progressBar) {
            setWidth(event.nativeEvent.layout.width);
          }
        }}>
        {texts[index]}
      </Text>
      {progressBar && width !== undefined && (
        <View
          style={StyleSheet.flatten([
            styles.progress,
            progressBarStyle,
            {width: progress * width},
          ])}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  progress: {
    height: 5,
    borderRadius: 1,
    marginTop: 2,
    backgroundColor: 'darkcyan',
  },
});
