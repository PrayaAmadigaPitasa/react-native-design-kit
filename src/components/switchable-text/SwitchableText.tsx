import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
  LayoutChangeEvent,
} from 'react-native';

export interface SwitchableTextProps {
  containerStyle?: ViewStyle;
  texts: string[];
  textStyle?: TextStyle;
  duration?: number;
  tps?: number;
  progressBar?: boolean;
  progressBarStyle?: ViewStyle;
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

  useEffect(() => {
    if (width !== undefined) {
      if (progress >= 1) {
        setIndex((index + 1) % texts.length);
        setProgress(0);
      } else {
        const period = 1000 / Math.max(1, Math.min(1000, tps));
        const scale = Platform.select({android: 1.5, default: 1});
        const timeout = setTimeout(() => {
          setProgress(progress + (period / duration) * scale);
        }, period);

        return () => clearTimeout(timeout);
      }
    }
  }, [progress, width]);

  const handleLayoutText = useCallback(
    (event: LayoutChangeEvent) =>
      progressBar && setWidth(event.nativeEvent.layout.width),
    [progressBar],
  );

  const handleRenderText = useMemo(
    () => (
      <Text
        style={StyleSheet.flatten([styles.text, textStyle])}
        onLayout={handleLayoutText}>
        {texts[index]}
      </Text>
    ),
    [index, texts, textStyle, handleLayoutText],
  );

  useEffect(() => {
    setIndex(0);
  }, [texts]);

  return (
    <View style={containerStyle}>
      {handleRenderText}
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
