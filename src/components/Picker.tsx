import React, {useState, useEffect} from 'react';
import {
  FlatListProps,
  Text,
  Animated,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ViewStyle,
  TextStyle,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Layout} from '../layout';
import {Modal} from './Modal';

export interface PickerDataSelection {
  key: string;
  title?: string;
}

export interface PickerProps<ItemT> extends FlatListProps<ItemT> {
  containerStyle?: ViewStyle;
  selected?: string;
  selectedContainerStyle?: ViewStyle;
  selectedTitleStyle?: TextStyle;
  listContainerStyle?: ViewStyle;
  listItemContainerStyle?: ViewStyle;
  listItemSelectedContainerStyle?: ViewStyle;
  placeholder?: string;
  placeholderColor?: string;
  icon?: JSX.Element;
  iconContainerStyle?: ViewStyle;
  animationRotation?: string;
  data: ReadonlyArray<ItemT>;
  keyExtractor(item: ItemT, index: number): string;
  titleExtractor?(item: ItemT, index: number): string;
  onSelect(key: string, item: ItemT, index: number): void;
}

export default function Picker<ItemT>({
  containerStyle,
  selected,
  selectedContainerStyle,
  selectedTitleStyle,
  listContainerStyle,
  listItemContainerStyle,
  listItemSelectedContainerStyle,
  placeholder = 'Select Option',
  placeholderColor = 'darkgray',
  icon,
  iconContainerStyle,
  animationRotation = '-180deg',
  data,
  keyExtractor,
  titleExtractor,
  onSelect,
  renderItem,
  ...props
}: PickerProps<ItemT>) {
  const [selection, setSelection] = useState();
  const [toggle, setToggle] = useState(false);
  const [layout, setLayout] = useState<Layout>();
  const [buttonRef, setButtonRef] = useState<TouchableOpacity>();
  const animation = useState(new Animated.Value(0))[0];
  const selectionIndex = getSelectionIndex(selection);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: toggle ? 1 : 0,
      duration: 250,
    }).start();
  }, [toggle]);

  useEffect(() => {
    if (selected !== undefined && getSelectionIndex(selected) !== undefined) {
      setSelection(selected);
    } else {
      setSelection(undefined);
    }
  }, [selected]);

  function getSelectionIndex(key: string) {
    if (key !== undefined) {
      for (let index = 0; index < data.length; index++) {
        const item = data[index];

        if (keyExtractor(item, index) === key) {
          return index;
        }
      }
    }

    return undefined;
  }

  function getTitle() {
    if (selectionIndex !== undefined) {
      return titleExtractor !== undefined
        ? titleExtractor(selection, selectionIndex)
        : keyExtractor(selection, selectionIndex);
    }

    return placeholder;
  }

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
        style={StyleSheet.flatten([
          styles.container,
          containerStyle,
          toggle ? [styles.selectedContainer, selectedContainerStyle] : {},
        ])}
        activeOpacity={0.5}
        onPress={() => {
          updateLayout();
          setToggle(!toggle);
        }}>
        <Text
          style={StyleSheet.flatten([
            styles.title,
            selectionIndex !== undefined
              ? selectedTitleStyle
              : {color: placeholderColor},
          ])}>
          {selectionIndex !== undefined ? getTitle() : placeholder}
        </Text>
        <Animated.View
          style={StyleSheet.flatten([
            styles.iconContainer,
            iconContainerStyle,
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
              listContainerStyle,
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
              data={data}
              keyExtractor={keyExtractor}
              renderItem={info => {
                const {item, index} = info;
                const key = keyExtractor(item, index);

                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={StyleSheet.flatten([
                      styles.listItemContainer,
                      listItemContainerStyle,
                      selection !== undefined && selection === key
                        ? [
                            styles.listItemSelectedContainer,
                            listItemSelectedContainerStyle,
                          ]
                        : {},
                    ])}
                    onPress={() => {
                      setSelection(key);
                      setToggle(false);
                      onSelect(key, item, index);
                    }}>
                    {renderItem(info)}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'lightgray',
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  selectedContainer: {
    borderColor: 'dodgerblue',
    backgroundColor: 'white',
  },
  listContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'lightgray',
    backgroundColor: '#fff',
    maxHeight: 300,
  },
  listItemContainer: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
    justifyContent: 'center',
  },
  listItemSelectedContainer: {
    backgroundColor: 'whitesmoke',
  },
  iconContainer: {
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
  },
});
