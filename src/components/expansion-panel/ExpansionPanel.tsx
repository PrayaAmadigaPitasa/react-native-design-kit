import React, {useState, useRef, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  ViewStyle,
  View,
  TextStyle,
} from 'react-native';
import {useDidUpdate} from '../../utilities';
import {Collapse} from '../collapse';
import {Icon} from '../icon';
import {Touchable} from '../touchable';

export interface ExpansionPanelProps {
  visible?: boolean;
  title?: string;
  titleStyle?: TextStyle;
  icon?: JSX.Element;
  iconStartRotation?: string;
  iconEndRotation?: string;
  animationRotation?: string;
  animationDuration?: number;
  subtitle?: string;
  subtitleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  children?: React.ReactNode;
}

export default function ExpansionPanel({
  visible = false,
  title,
  titleStyle,
  iconStartRotation = '-90deg',
  iconEndRotation = '0deg',
  animationDuration = 250,
  icon,
  subtitle,
  subtitleStyle,
  containerStyle,
  contentContainerStyle,
  children,
}: ExpansionPanelProps) {
  const refView = useRef<View>();
  const width = useRef<number>();
  const animation = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const [toggle, setToggle] = useState(visible);

  const handleRefView = useCallback((instance: View | null) => {
    if (instance) {
      refView.current = instance;
    }
  }, []);

  const handlePress = useCallback(
    () =>
      refView.current?.measure((x, y, w) => {
        width.current = w;
        setToggle(!toggle);
      }),
    [refView.current, toggle],
  );

  const handleRenderPanel = useMemo(
    () => (
      <Touchable
        testID="panel"
        touchableType="normal"
        refView={handleRefView}
        style={StyleSheet.flatten([
          styles.container,
          containerStyle,
          styles.fixedContainer,
        ])}
        onPress={handlePress}>
        <Animated.View
          style={StyleSheet.flatten([
            styles.iconContainer,
            {
              transform: [
                {
                  rotateZ: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [iconStartRotation, iconEndRotation],
                  }),
                },
              ],
            },
          ])}>
          {icon || <Icon name={'chevron-down'} />}
        </Animated.View>
        <View style={styles.sectionTitle}>
          <View style={styles.titleContainer}>
            <Text style={titleStyle}>{title}</Text>
          </View>
          {subtitle ? (
            <View style={styles.subtitleContainer}>
              <Text
                style={StyleSheet.flatten([styles.subtitle, subtitleStyle])}>
                {subtitle}
              </Text>
            </View>
          ) : null}
        </View>
      </Touchable>
    ),
    [
      icon,
      iconStartRotation,
      iconEndRotation,
      titleStyle,
      title,
      subtitle,
      subtitleStyle,
      containerStyle,
      animation,
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

  const handleRunAnimation = useCallback(
    () =>
      Animated.timing(animation, {
        toValue: toggle ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: true,
      }).start(),
    [animation, toggle, animationDuration],
  );

  useDidUpdate(() => setToggle(visible), [visible]);

  useDidUpdate(handleRunAnimation, [handleRunAnimation]);

  return (
    <>
      {handleRenderPanel}
      {handleRenderContent}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'lightgray',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fixedContainer: {
    flexDirection: 'row-reverse',
  },
  titleContainer: {
    flex: 1,
    padding: 12,
    paddingRight: 6,
    justifyContent: 'center',
  },
  subtitleContainer: {
    flex: 1,
    padding: 12,
    paddingHorizontal: 6,
    justifyContent: 'center',
  },
  sectionTitle: {
    flexDirection: 'row',
    flex: 1,
  },
  subtitle: {
    color: 'lightgrey',
  },
  iconContainer: {
    padding: 12,
  },
  contentContainer: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
    borderColor: 'lightgray',
    backgroundColor: '#fff',
  },
});
