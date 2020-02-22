import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  ViewStyle,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from './Modal';
import {Layout} from '../layout';

export interface ExpansionPanelProps<ItemT> {
  title?: string;
  icon?: JSX.Element;
  animationRotation?: string;
  subtitle?: string;
  content?: string;
  containerStyle?: ViewStyle;
}

export default function ExpansionPanel<ItemT>({
  title,
  animationRotation = '-180deg',
  icon,
  subtitle,
  content,
  containerStyle,
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
    }).start();
    Animated.timing(containerListAnimation, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
    }).start();
  }, [toggle]);

  function updateLayout() {
    buttonRef?.measure((x, y, width, height, pageX, pageY) =>
      setLayout({
        x: x,
        y: y,
        width: width,
        height: height,
        pageX: pageX,
        pageY: pageY,
      }),
    );
  }

  return (
    <>
      <TouchableOpacity
        ref={instance =>
          instance && buttonRef !== instance && setButtonRef(instance)
        }
        style={StyleSheet.flatten([styles.container, containerStyle])}
        onPress={() => {
          updateLayout();
          setToggle(!toggle);
        }}
        activeOpacity={1}>
        <Text>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
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
      {layout !== undefined && (
        <Modal
          transparent
          visible={toggle}
          onPressBackdrop={() => setToggle(!toggle)}>
          <View
            style={StyleSheet.flatten([
              styles.listContainer,
              {
                position: 'absolute',
                width: layout.width,
                left: layout.pageX,
                top: layout.pageY + layout.height,
                zIndex: 1,
              },
            ])}>
            <Text>{content}</Text>
          </View>
        </Modal>
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
