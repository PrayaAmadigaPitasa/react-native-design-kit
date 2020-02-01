import React, {useState, useEffect} from 'react';
import {
  FlatListProps,
  Text,
  Animated,
  StyleSheet,
  View,
  TouchableOpacity,
  LayoutRectangle,
  FlatList,
  ViewStyle,
  TextStyle,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

interface Layout extends LayoutRectangle {
  pageX: number;
  pageY: number;
}

function isLayoutValid(layout: Layout) {
  const {x, y, width, height, pageX, pageY} = layout;

  return (
    x !== 0 ||
    y !== 0 ||
    width !== 0 ||
    height !== 0 ||
    pageX !== 0 ||
    pageY !== 0
  );
}

export interface PickerDataSelection {
  key: string;
  title?: string;
}

export interface PickerProps<ItemT> extends FlatListProps<ItemT> {
  containerStyle?: ViewStyle;
  selected?: ItemT;
  selectedContainerStyle?: ViewStyle;
  selectedTitleStyle?: TextStyle;
  dropdownContainerStyle?: ViewStyle;
  dropdownItemContainerStyle?: ViewStyle;
  dropdownItemSelectedContainerStyle?: ViewStyle;
  placeholder?: string;
  placeholderColor?: string;
  titleExtractor(item: ItemT): string;
  onSelect(item: ItemT): void;
}

export default function Picker<ItemT>({
  containerStyle,
  selected,
  selectedContainerStyle,
  selectedTitleStyle,
  dropdownContainerStyle,
  dropdownItemContainerStyle,
  dropdownItemSelectedContainerStyle,
  placeholder = 'Select Option',
  placeholderColor = '#a9a9a9',
  titleExtractor,
  onSelect,
  renderItem,
  ...props
}: PickerProps<ItemT>) {
  const [selection, setSelected] = useState<ItemT | undefined>(selected);
  const [toggle, setToggle] = useState(false);
  const [layout, setLayout] = useState<Layout>();
  const [buttonRef, setButtonRef] = useState<TouchableOpacity>();
  const animation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(animation, {
      toValue: toggle ? 1 : 0,
      duration: 250,
    }).start();
  }, [toggle]);

  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  return (
    <View style={styles.root}>
      <TouchableOpacity
        ref={instance => instance && setButtonRef(instance)}
        onLayout={() =>
          buttonRef?.measure((x, y, width, height, pageX, pageY) =>
            setLayout({
              x: x,
              y: y,
              width: width,
              height: height,
              pageX: pageX,
              pageY: pageY,
            }),
          )
        }
        style={StyleSheet.flatten([
          styles.container,
          containerStyle,
          toggle ? [styles.selectedContainer, selectedContainerStyle] : {},
        ])}
        activeOpacity={0.5}
        onPress={() => setToggle(!toggle)}>
        <Text
          style={StyleSheet.flatten([
            styles.title,
            selection !== undefined
              ? selectedTitleStyle
              : {color: placeholderColor},
          ])}>
          {selection !== undefined ? titleExtractor(selection) : placeholder}
        </Text>
        <Animated.View
          style={StyleSheet.flatten([
            styles.chevronContainer,
            {
              transform: [
                {
                  rotateZ: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-180deg'],
                  }),
                },
              ],
            },
          ])}>
          <Icon name={'chevron-down'} />
        </Animated.View>
      </TouchableOpacity>
      {layout !== undefined && isLayoutValid(layout) && (
        <Modal visible={toggle} transparent>
          <TouchableWithoutFeedback onPress={() => setToggle(!toggle)}>
            <View style={{height: '100%', width: '100%'}} />
          </TouchableWithoutFeedback>
          <View
            style={StyleSheet.flatten([
              styles.dropdownContainer,
              dropdownContainerStyle,
              {
                position: 'absolute',
                width: layout.width,
                left: layout.pageX,
                top: layout.pageY + layout.height,
                zIndex: 1,
              },
            ])}>
            <FlatList
              {...props}
              renderItem={info => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={StyleSheet.flatten([
                    styles.dropdownItemContainer,
                    dropdownItemContainerStyle,
                    selection !== undefined && selection === info.item
                      ? [
                          styles.dropdownItemSelectedContainer,
                          dropdownItemSelectedContainerStyle,
                        ]
                      : {},
                  ])}
                  onPress={() => {
                    setSelected(info.item);
                    setToggle(false);
                    onSelect(info.item);
                  }}>
                  {renderItem(info)}
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    zIndex: 1,
  },
  container: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#e4e9f2',
    backgroundColor: '#f7f9fc',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  selectedContainer: {
    borderColor: 'dodgerblue',
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#e4e9f2',
    backgroundColor: '#fff',
    maxHeight: 300,
  },
  dropdownItemContainer: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
    justifyContent: 'center',
  },
  dropdownItemSelectedContainer: {
    backgroundColor: '#f7f9fc',
  },
  chevronContainer: {
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
  },
});
