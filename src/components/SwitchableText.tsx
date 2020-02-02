import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Easing,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface SwitchableTextProps {
  containerStyle?: ViewStyle;
  texts: string[];
  textStyle?: TextStyle;
  duration?: number;
  progressBar?: boolean;
  progressBarStyle?: ViewStyle;
  progressBarEasing?(value: number): number;
}

export default function SwitchableText({
  containerStyle,
  texts,
  textStyle,
  duration = 3000,
  progressBar = true,
  progressBarStyle,
  progressBarEasing = Easing.linear,
}: SwitchableTextProps) {
  const [index, setIndex] = useState(0);
  const [textLayout, setTextLayout] = useState();
  const animation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    runAnimation();
  }, [index]);

  useEffect(() => {
    setIndex(0);
  }, [texts]);

  function runAnimation() {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: duration,
      easing: progressBarEasing,
    }).start(() => {
      setIndex(index + 1 < texts.length ? index + 1 : 0);
    });
  }

  return (
    <View style={containerStyle}>
      <Text
        style={StyleSheet.flatten([styles.text, textStyle])}
        onLayout={event => setTextLayout(event.nativeEvent.layout)}>
        {texts[index]}
      </Text>
      {textLayout && progressBar && (
        <Animated.View
          style={StyleSheet.flatten([
            styles.progress,
            progressBarStyle,
            {
              width: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, textLayout.width],
              }),
            },
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
