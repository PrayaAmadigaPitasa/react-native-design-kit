import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  ListRenderItemInfo,
  ViewStyle,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutRectangle,
  LayoutChangeEvent,
} from 'react-native';
import {splitList} from '../../utilities';
import {ObjectRef} from '../../types';
import {ListAdditionalProps} from '../../interfaces';
import {
  LIST_END_THRESHOLD_DEFAULT,
  LIST_HORIZONTAL_SCROLL_INDICATOR_DEFAULT,
} from '../../constants';

export interface ListMultiRowProps<ItemT>
  extends ScrollViewProps,
    ListAdditionalProps {
  data: ItemT[];
  renderItem(item: ItemT): JSX.Element;
  keyColumnExtractor?(items: ItemT[], index: number): string;
  keyItemExtractor?(item: ItemT, columnIndex: number, index: number): string;
  numRow: number;
  columnContainerStyle?: ViewStyle;
  itemContainerStyle?: ViewStyle;
  onEndReachedThreshold?: number;
  showsHorizontalScrollIndicator?: boolean;
  refList?: ObjectRef<FlatList<ItemT[]>>;
}

export default function ListMultiRow<ItemT>({
  numRow,
  data,
  columnContainerStyle,
  itemContainerStyle,
  renderItem,
  keyColumnExtractor,
  keyItemExtractor,
  refList,
  showsHorizontalScrollIndicator = LIST_HORIZONTAL_SCROLL_INDICATOR_DEFAULT,
  onScroll,
  onLayout,
  onEndReached,
  onEndReachedThreshold = LIST_END_THRESHOLD_DEFAULT,
  ...props
}: ListMultiRowProps<ItemT>) {
  const [items, setItems] = useState<ItemT[][]>();
  const [endZone, setEndZone] = useState(false);
  const [layout, setLayout] = useState<LayoutRectangle>();

  useEffect(() => {
    setItems(extractData());
    setEndZone(false);
  }, [data]);

  /**
   * @description
   * extract data to multi row array
   */
  function extractData() {
    return data ? splitList(data, numRow) : undefined;
  }

  /**
   *
   * @param item item list data
   * @param columnIndex index of column
   *
   * @description
   * get key of column
   */
  function getKeyColumn(item: ItemT[], columnIndex: number) {
    return keyColumnExtractor
      ? keyColumnExtractor(item, columnIndex)
      : columnIndex.toString();
  }

  /**
   *
   * @param item item data
   * @param columnIndex index of column
   * @param index index of item relative to column
   *
   * @description
   * get key of item relative to column
   */
  function getKeyItem(item: ItemT, columnIndex: number, index: number) {
    return keyItemExtractor
      ? keyItemExtractor(item, columnIndex, index)
      : index;
  }

  /**
   *
   * @param item item list data
   * @param index index of column
   *
   * @description
   * render element of list column
   */
  function handleRenderColumn(item: ItemT[], columnIndex: number) {
    return (
      <View key={getKeyColumn(item, columnIndex)} style={columnContainerStyle}>
        {item.map((element, index) =>
          handleRenderItem(element, columnIndex, index),
        )}
      </View>
    );
  }

  /**
   *
   * @param item item data
   * @param columnIndex index of column
   * @param index index of item relative to column
   *
   * @description
   * render element of item relative to column
   */
  function handleRenderItem(item: ItemT, columnIndex: number, index: number) {
    return (
      <View
        key={getKeyItem(item, columnIndex, index)}
        style={itemContainerStyle}>
        {renderItem(item)}
      </View>
    );
  }

  /**
   *
   * @param info list render item info
   *
   * @description
   * render item for each data list
   */
  function handleRenderItemList(info: ListRenderItemInfo<ItemT[]>) {
    return handleRenderColumn(info.item, info.index);
  }

  /**
   *
   * @param event native scroll event
   *
   * @description
   * called when scroll start to move
   */
  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    onScroll && onScroll(event);

    if (onEndReached && layout) {
      const {contentOffset, contentSize} = event.nativeEvent;
      const dif = contentSize.width - contentOffset.x - layout.width;

      if (!endZone && dif <= onEndReachedThreshold) {
        onEndReached({distanceFromEnd: dif});
        setEndZone(true);
      } else if (endZone && dif > onEndReachedThreshold) {
        setEndZone(false);
      }
    }
  }

  /**
   *
   * @param event layout change event
   *
   * @description
   * called when list start to create layout
   */
  function handleLayout(event: LayoutChangeEvent) {
    setLayout(event.nativeEvent.layout);
    onLayout && onLayout(event);
  }

  return (
    <FlatList
      {...props}
      ref={refList}
      onLayout={handleLayout}
      horizontal
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      data={items}
      keyExtractor={getKeyColumn}
      renderItem={handleRenderItemList}
      onScroll={handleScroll}
      onEndReached={undefined}
      onEndReachedThreshold={undefined}
    />
  );
}
