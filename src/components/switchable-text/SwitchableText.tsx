import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
  Animated,
} from 'react-native';
import {useDidUpdate} from '../../utilities';

export interface SwitchableTextProps {
  containerStyle?: ViewStyle;
  texts: string[];
  textStyle?: TextStyle;
  duration?: number;
  progressBar?: boolean;
  progressBarStyle?: ViewStyle;
  byPassAnimationCallback?: boolean;
}

export default function SwitchableText({
  containerStyle,
  texts,
  textStyle,
  duration = 2000,
  progressBar = true,
  byPassAnimationCallback = false,
  progressBarStyle,
}: SwitchableTextProps) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number>();
  const animation = useRef(new Animated.Value(0)).current;

  const handleLayoutText = useCallback(
    (event: LayoutChangeEvent) =>
      progressBar && setWidth(event.nativeEvent.layout.width),
    [progressBar],
  );

  const handleRenderText = useMemo(
    () => (
      <Text
        testID="text"
        style={StyleSheet.flatten([styles.text, textStyle])}
        onLayout={handleLayoutText}>
        {texts[index]}
      </Text>
    ),
    [index, texts, textStyle, handleLayoutText],
  );

  const handleRenderBar = useMemo(() => {
    return (
      progressBar &&
      width !== undefined && (
        <Animated.View
          style={StyleSheet.flatten([
            styles.progress,
            progressBarStyle,
            {
              width: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, width],
              }),
            },
          ])}
        />
      )
    );
  }, [width, animation, progressBar, progressBarStyle]);

  const handleRunAnimation = useCallback(() => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration,
      useNativeDriver: false,
    }).start(
      callback =>
        (byPassAnimationCallback || callback.finished) &&
        setIndex(index + 1 >= texts.length ? 0 : index + 1),
    );
  }, [animation, index, duration, texts]);

  useDidUpdate(() => {
    setIndex(0);
  }, [texts]);

  useEffect(() => handleRunAnimation, [handleRunAnimation]);

  return texts.length > 0 ? (
    <View style={containerStyle}>
      {handleRenderText}
      {handleRenderBar}
    </View>
  ) : null;
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
