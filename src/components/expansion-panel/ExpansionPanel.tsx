import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  ViewStyle,
  View,
  TextStyle,
} from 'react-native';
import {Layout} from '../../layout';
import {Icon} from '../icon';

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
  const animation = useState(new Animated.Value(0))[0];
  const containerListAnimation = useState(new Animated.Value(0))[0];
  const [toggle, setToggle] = useState(false);
  const [buttonRef, setButtonRef] = useState<TouchableOpacity>();
  const [layout, setLayout] = useState<Layout>();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: toggle ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
    Animated.timing(containerListAnimation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [toggle]);

  function updateLayout() {
    buttonRef?.measure((x, y, width, height, pageX, pageY) => {
      console.log(x, y, width, height, pageX, pageY);
      return setLayout({
        x,
        y,
        width,
        height,
        pageX,
        pageY,
      });
    });
  }

  return (
    <>
      <TouchableOpacity
        testID="press-here"
        ref={instance =>
          instance && buttonRef !== instance && setButtonRef(instance)
        }
        style={StyleSheet.flatten([styles.container, containerStyle])}
        onPress={() => {
          updateLayout();
          setToggle(!toggle);
        }}
        activeOpacity={1}>
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
      </TouchableOpacity>
      {layout !== undefined && toggle && (
        <View
          style={StyleSheet.flatten([
            styles.listContainer,
            {
              width: layout.width,
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
