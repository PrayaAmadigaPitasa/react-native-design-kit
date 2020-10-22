import React, {useState, ReactNode, useMemo, useRef, useCallback} from 'react';
import {ScrollView, StyleSheet, View, ViewStyle, Animated} from 'react-native';
import {useDidUpdate} from '../../utilities';

export interface MarqueeProps {
  containerStyle?: ViewStyle;
  speed?: number;
  delay?: number;
  cooldown?: number;
  byPassAnimationCallback?: boolean;
  children: ReactNode;
}

export default function Marquee({
  speed = 0.125,
  delay,
  containerStyle,
  byPassAnimationCallback = false,
  children,
}: MarqueeProps) {
  const [layoutWidth, setLayoutWidth] = useState<number>();
  const [contentWidth, setContentWidth] = useState(0);
  const [lastCycle, setLastCycle] = useState<Date>();
  const animation = useRef(new Animated.Value(0)).current;
  const lineWidth = useMemo(
    () => (layoutWidth ? layoutWidth + contentWidth * 2 : undefined),
    [layoutWidth, contentWidth],
  );
  const duration = useMemo(() => (lineWidth ? lineWidth / speed : undefined), [
    lineWidth,
    speed,
  ]);

  const handleRunAnimation = useCallback(() => {
    if (duration) {
      animation.setValue(0);
      Animated.timing(animation, {
        duration,
        delay,
        toValue: 1,
        useNativeDriver: true,
      }).start(
        callback =>
          (byPassAnimationCallback || callback.finished) &&
          setLastCycle(new Date()),
      );
    }
  }, [duration, animation, delay, byPassAnimationCallback]);

  const handleRenderMarquee = useMemo(
    () =>
      layoutWidth ? (
        <ScrollView
          horizontal
          testID="marquee"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onContentSizeChange={w => setContentWidth(w)}
          scrollEnabled={false}
          contentContainerStyle={StyleSheet.flatten([styles.sectionContent])}>
          <Animated.View
            style={StyleSheet.flatten([
              {
                translateX: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layoutWidth, -contentWidth],
                }),
              },
            ])}>
            {children}
          </Animated.View>
        </ScrollView>
      ) : null,
    [layoutWidth, contentWidth, children],
  );

  useDidUpdate(handleRunAnimation, [
    lastCycle,
    layoutWidth,
    handleRunAnimation,
  ]);

  return (
    <View
      testID="container"
      style={StyleSheet.flatten([styles.container, containerStyle])}
      onLayout={event => setLayoutWidth(event.nativeEvent.layout.width)}>
      {handleRenderMarquee}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  sectionContent: {
    alignItems: 'center',
  },
});
