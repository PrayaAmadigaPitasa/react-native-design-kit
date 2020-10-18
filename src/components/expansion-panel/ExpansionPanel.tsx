import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  ViewStyle,
  View,
  TextStyle,
} from 'react-native';
import {Collapse} from '../collapse';
import {Icon} from '../icon';
import {Touchable} from '../touchable';

export interface ExpansionPanelProps<ItemT> {
  title?: string;
  titleStyle?: TextStyle;
  icon?: JSX.Element;
  animationRotation?: string;
  animationDuration?: number;
  subtitle?: string;
  subtitleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  children?: React.ReactNode;
}

export default function ExpansionPanel<ItemT>({
  title,
  titleStyle,
  animationRotation = '-180deg',
  animationDuration = 250,
  icon,
  subtitle,
  subtitleStyle,
  containerStyle,
  contentContainerStyle,
  children,
}: ExpansionPanelProps<ItemT>) {
  const animation = useRef(new Animated.Value(0)).current;
  const refView = useRef<View>();
  const width = useRef<number>();
  const [toggle, setToggle] = useState(false);

  const handleRefView = useCallback((instance: View | null) => {
    if (instance) {
      refView.current = instance;
    }
  }, []);

  const handlePress = useCallback(() => {
    refView.current?.measure((x, y, w) => {
      width.current = w;
      setToggle(!toggle);
    });
  }, [refView.current, toggle]);

  const handleRenderPanel = useMemo(
    () => (
      <Touchable
        touchableType="normal"
        refView={handleRefView}
        style={StyleSheet.flatten([styles.container, containerStyle])}
        onPress={handlePress}>
        <Text style={titleStyle}>{title}</Text>
        {subtitle ? (
          <Text style={StyleSheet.flatten([styles.subtitle, subtitleStyle])}>
            {subtitle}
          </Text>
        ) : null}
        <Animated.View
          style={StyleSheet.flatten([
            styles.iconContainer,
            {
              transform: [
                {
                  rotateZ: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', animationRotation],
                  }),
                },
              ],
            },
          ])}>
          {icon || <Icon name={'chevron-down'} />}
        </Animated.View>
      </Touchable>
    ),
    [
      icon,
      titleStyle,
      title,
      subtitle,
      subtitleStyle,
      containerStyle,
      animation,
      animationRotation,
      handlePress,
      handleRefView,
    ],
  );

  const handleRenderContent = useMemo(
    () => (
      <Collapse visible={toggle} animationDuration={animationDuration}>
        <View
          style={StyleSheet.flatten([
            styles.contentContainer,
            contentContainerStyle,
            {width: width.current},
          ])}>
          {children}
        </View>
      </Collapse>
    ),
    [width.current, toggle, animationDuration, contentContainerStyle, children],
  );

  useEffect(() => {
    Animated.timing(animation, {
      toValue: toggle ? 1 : 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  }, [toggle]);

  return (
    <>
      {handleRenderPanel}
      {handleRenderContent}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'lightgray',
    padding: 12,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtitle: {
    color: 'lightgrey',
  },
  iconContainer: {
    marginLeft: 12,
  },
  contentContainer: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
    borderColor: 'lightgray',
    backgroundColor: '#fff',
    maxHeight: 300,
  },
});
