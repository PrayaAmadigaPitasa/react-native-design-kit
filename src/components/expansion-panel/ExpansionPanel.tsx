import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  ViewStyle,
  View,
  TextStyle,
} from 'react-native';
import {Icon} from '../icon';
import {Touchable} from '../touchable';

export interface ExpansionPanelProps<ItemT> {
  title?: string;
  titleStyle?: TextStyle;
  icon?: JSX.Element;
  animationRotation?: string;
  subtitle?: string;
  subtitleStyle?: TextStyle;
  content?: string;
  containerStyle?: ViewStyle;
  children?: React.ReactNode;
}

export default function ExpansionPanel<ItemT>({
  title,
  titleStyle,
  animationRotation = '-180deg',
  icon,
  subtitle,
  subtitleStyle,
  containerStyle,
  children,
}: ExpansionPanelProps<ItemT>) {
  const animation = useRef(new Animated.Value(0)).current;
  const refView = useRef<View>();
  const panelWidth = useRef<number>();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: toggle ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [toggle]);

  const handleRefView = useCallback((instance: View | null) => {
    if (instance) {
      refView.current = instance;
    }
  }, []);

  const handlePress = useCallback(() => {
    refView.current?.measure((x, y, width) => {
      panelWidth.current = width;
      setToggle(!toggle);
    });
  }, [refView.current, toggle]);

  return (
    <>
      <Touchable
        touchableType="normal"
        refView={handleRefView}
        style={StyleSheet.flatten([styles.container, containerStyle])}
        onPress={handlePress}>
        <Text style={StyleSheet.flatten([titleStyle])}>{title}</Text>
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
      {panelWidth.current && toggle && (
        <View
          style={StyleSheet.flatten([
            styles.listContainer,
            {
              width: panelWidth.current,
            },
          ])}>
          {children}
        </View>
      )}
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
  listContainer: {
    borderWidth: 1,
    padding: 12,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderColor: 'lightgray',
    backgroundColor: '#fff',
    maxHeight: 300,
  },
});
