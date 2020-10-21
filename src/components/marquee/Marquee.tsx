import React, {useState, useEffect, ReactNode, useMemo} from 'react';
import {ScrollView, StyleSheet, View, ViewStyle, Platform} from 'react-native';

export interface MarqueeProps {
  containerStyle?: ViewStyle;
  speed?: number;
  cooldown?: number;
  children: ReactNode;
}

export default function Marquee({
  containerStyle,
  speed = 1,
  cooldown = 1000,
  children,
}: MarqueeProps) {
  const [width, setWidth] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const [offset, setOffset] = useState<number>();

  useEffect(() => {
    if (offset !== undefined) {
      const scale = Platform.select({android: 1.5, default: 1});
      const speedScaled = speed * scale;

      if (offset <= -length - (cooldown / 10) * speedScaled) {
        setOffset(width);
      } else {
        const timeout = setTimeout(() => {
          setOffset(offset - speedScaled);
        }, 10);

        return () => clearTimeout(timeout);
      }
    }
  }, [offset]);

  const handleRenderMarquee = useMemo(
    () =>
      offset !== undefined && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
          scrollEnabled={false}
          contentContainerStyle={StyleSheet.flatten([
            styles.sectionContent,
            {marginLeft: offset},
          ])}>
          <View onLayout={event => setLength(event.nativeEvent.layout.width)}>
            {children}
          </View>
        </ScrollView>
      ),
    [offset, children],
  );

  useEffect(() => {
    setWidth(width);
    setOffset(width);
  }, [width]);

  return (
    <View
      style={StyleSheet.flatten([styles.container, containerStyle])}
      onLayout={event => setWidth(event.nativeEvent.layout.width)}>
      {handleRenderMarquee}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100%',
    alignItems: 'center',
  },
  sectionContent: {
    alignItems: 'center',
  },
});
