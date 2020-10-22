import React, {useState, ReactNode, useMemo, useRef, useCallback} from 'react';
import {ScrollView, StyleSheet, View, ViewStyle, Animated} from 'react-native';
import {useDidUpdate} from '../../utilities';

export interface MarqueeProps {
  containerStyle?: ViewStyle;
  speed?: number;
  delay?: number;
  cooldown?: number;
  children: ReactNode;
}

export default function Marquee({
  speed = 0.125,
  delay,
  containerStyle,
  children,
}: MarqueeProps) {
  const [layoutWidth, setLayoutWidth] = useState<number>();
  const [contentWidth, setContentWidth] = useState(0);
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
      }).start(callback => callback.finished && handleRunAnimation());
    }
  }, [duration, animation, delay]);

  const handleRenderMarquee = useMemo(
    () =>
      layoutWidth !== undefined && (
        <ScrollView
          horizontal
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
      ),
    [layoutWidth, contentWidth, children],
  );

  useDidUpdate(handleRunAnimation, [layoutWidth, handleRunAnimation]);

  return (
    <View
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
