import React, {useState, useCallback, useMemo, useRef} from 'react';
import {
  FlatListProps,
  Text,
  Animated,
  StyleSheet,
  View,
  FlatList,
  ViewStyle,
  TextStyle,
  ListRenderItemInfo,
} from 'react-native';
import {Layout} from '../../layout';
import {useDidUpdate} from '../../utilities';
import {Icon} from '../icon';
import {Touchable} from '../touchable';
import {Modal} from '../Modal';

export interface PickerSelectionInfo<ItemT> {
  item: ItemT;
  key: string;
  index: number;
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
  iconStartRotation?: string;
  iconEndRotation?: string;
  data: ReadonlyArray<ItemT>;
  keyExtractor(item: ItemT, index: number): string;
  titleExtractor?(item: ItemT, index: number): string;
  onSelect(key: string, item: ItemT, index: number): void;
}

export default function Picker<ItemT>({
  containerStyle,
  selected,
  selectedContainerStyle,
  listContainerStyle,
  listItemContainerStyle,
  listItemSelectedContainerStyle,
  placeholder = 'Select Option',
  icon,
  iconContainerStyle,
  iconStartRotation = '-90deg',
  iconEndRotation = '0deg',
  data,
  keyExtractor,
  titleExtractor,
  onSelect,
  renderItem,
  ...props
}: PickerProps<ItemT>) {
  const [selection, setSelection] = useState<
    PickerSelectionInfo<ItemT> | undefined
  >(getInfoFromKey(selected));
  const [toggle, setToggle] = useState(false);
  const layout = useRef<Layout>();
  const refButton = useRef<View>();
  const animation = useState(new Animated.Value(0))[0];

  const title = useMemo(
    () =>
      selection
        ? titleExtractor
          ? titleExtractor(selection.item, selection.index)
          : keyExtractor(selection.item, selection.index)
        : placeholder,
    [selection, titleExtractor, keyExtractor, placeholder],
  );

  console.log(`title: ${title}`);

  function getInfoFromKey(
    key?: string,
  ): PickerSelectionInfo<ItemT> | undefined {
    if (key !== undefined) {
      for (let index = 0; index < data.length; index++) {
        const item = data[index];

        if (keyExtractor(item, index) === key) {
          return {key, index, item};
        }
      }
    }

    return undefined;
  }

  const handleRefButton = useCallback((instance: View | null) => {
    if (instance) {
      refButton.current = instance;
    }
  }, []);

  const handleRunAnimation = useCallback(
    () =>
      Animated.timing(animation, {
        toValue: toggle ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }).start(),
    [animation, toggle],
  );

  const handlePressMenuItem = useCallback(
    (key: string, item: ItemT, index: number) => {
      setSelection({key, item, index});
      setToggle(false);
      onSelect(key, item, index);
    },
    [],
  );

  const handlePressButton = useCallback(
    () =>
      refButton.current?.measure((x, y, width, height, pageX, pageY) => {
        layout.current = {
          x,
          y,
          width,
          height,
          pageX,
          pageY,
        };
        setToggle(!toggle);
      }),
    [refButton.current, toggle],
  );

  const handleRenderMenuItem = useCallback(
    (info: ListRenderItemInfo<ItemT>) => {
      const {item, index} = info;
      const key = keyExtractor(item, index);

      return (
        <Touchable
          style={StyleSheet.flatten([
            styles.listItemContainer,
            listItemContainerStyle,
            selection?.index === index &&
              StyleSheet.flatten([
                styles.listItemSelectedContainer,
                listItemSelectedContainerStyle,
              ]),
          ])}
          onPress={() => handlePressMenuItem(key, item, index)}>
          {renderItem(info)}
        </Touchable>
      );
    },
    [
      selection,
      listItemContainerStyle,
      listItemSelectedContainerStyle,
      keyExtractor,
      renderItem,
      handlePressMenuItem,
    ],
  );

  const handleRenderMenu = useMemo(
    () =>
      layout.current && (
        <Modal
          transparent
          visible={toggle}
          onPressBackdrop={() => setToggle(!toggle)}>
          <View
            style={StyleSheet.flatten([
              styles.listContainer,
              listContainerStyle,
              styles.fixedListContainer,
              {
                width: layout.current.width,
                left: layout.current.pageX,
                top: layout.current.pageY + layout.current.height,
              },
            ])}>
            <FlatList
              {...props}
              data={data}
              keyExtractor={keyExtractor}
              renderItem={handleRenderMenuItem}
            />
          </View>
        </Modal>
      ),
    [
      layout.current,
      toggle,
      props,
      data,
      listContainerStyle,
      keyExtractor,
      handleRenderMenuItem,
    ],
  );

  useDidUpdate(() => setSelection(getInfoFromKey(selected)), [selected]);

  useDidUpdate(handleRunAnimation, [handleRunAnimation]);

  return (
    <>
      <Touchable
        touchableType="normal"
        refView={handleRefButton}
        style={StyleSheet.flatten([
          styles.container,
          containerStyle,
          toggle
            ? StyleSheet.flatten([
                styles.selectedContainer,
                selectedContainerStyle,
              ])
            : {},
        ])}
        onPress={handlePressButton}>
        <Text style={StyleSheet.flatten([styles.title])}>{title}</Text>
        <Animated.View
          style={StyleSheet.flatten([
            styles.iconContainer,
            iconContainerStyle,
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
      </Touchable>
      {handleRenderMenu}
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
  fixedListContainer: {
    position: 'absolute',
    zIndex: 1,
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
