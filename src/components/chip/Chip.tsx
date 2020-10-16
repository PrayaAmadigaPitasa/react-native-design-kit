import React, {
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacityProps,
  FlatList,
  NativeScrollPoint,
  TouchableOpacity,
  LayoutRectangle,
  TextStyle,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import {ChipActionType, ChipIcon, ChipIconAction, ChipInfo} from '../../types';
import {Icon} from '../icon';
import {ButtonBaseProps} from '../button';
import ChipItem from './ChipItem';

export interface ChipItemBaseProps
  extends TouchableOpacityProps,
    ButtonBaseProps {
  rounded?: boolean;
  children?: ReactNode;
}

export interface ChipProps extends ChipItemBaseProps {
  actionType?: ChipActionType;
  chips: string[];
  chipContainerStyle?: ((id: string) => ViewStyle) | ViewStyle;
  chipComponent?(info: ChipInfo): string | JSX.Element;
  chipTitleStyle?: ((id: string) => TextStyle) | TextStyle;
  selectedChipContainerStyle?: ((id: string) => ViewStyle) | ViewStyle;
  selectedChipTitleStyle?: ((id: string) => TextStyle) | TextStyle;
  leftIcon?: ChipIcon;
  leftIconAction?: ChipIconAction;
  rightIcon?: ChipIcon;
  rightIconAction?: ChipIconAction;
  horizontal?: boolean;
  horizontalScrollIndicator?: boolean;
  horizontalScrollEnabled?: boolean;
  horizontalScrollButton?: boolean;
  horizontalScrollLeftButton?: JSX.Element;
  horizontalScrollLeftButtonContainerStyle?: ViewStyle;
  horizontalScrollRightButton?: JSX.Element;
  horizontalScrollRightButtonContainerStyle?: ViewStyle;
  selectedId?: string | string[];
  onSelect(id: string, selected: string[]): void;
}

export default function Chip({
  actionType = 'chip',
  containerStyle,
  chips,
  chipContainerStyle,
  chipComponent,
  chipTitleStyle,
  selectedChipContainerStyle,
  selectedChipTitleStyle,
  horizontal,
  horizontalScrollIndicator = false,
  horizontalScrollEnabled = true,
  horizontalScrollButton = true,
  horizontalScrollLeftButton,
  horizontalScrollLeftButtonContainerStyle,
  horizontalScrollRightButton,
  horizontalScrollRightButtonContainerStyle,
  selectedId,
  leftIcon,
  leftIconAction,
  rightIcon,
  rightIconAction,
  onSelect,
  onPress,
  activeOpacity = 0.5,
  ...props
}: ChipProps) {
  const [chipIds, setChipIds] = useState(chips);
  const [layout, setLayout] = useState<LayoutRectangle>();
  const [size, setSize] = useState<NativeScrollPoint>();
  const [offset, setOffset] = useState<NativeScrollPoint>({x: 0, y: 0});
  const [scrollRef, setScrollRef] = useState<FlatList<string> | null>(null);
  const [selected, setSelected] = useState<string[]>(
    selectedId !== undefined ? filterId(selectedId, true) : [],
  );

  useEffect(() => {
    setChipIds(chips);
  }, [chips]);

  useEffect(() => {
    setSelected(selectedId !== undefined ? filterId(selectedId, true) : []);
  }, [selectedId]);

  function checkId(id: string) {
    return chipIds.indexOf(id) >= 0;
  }

  function isSelected(id: string) {
    return selected.indexOf(id) >= 0;
  }

  function filterId(id: string | string[], checkType?: boolean) {
    const selection: string[] = [];

    if (Array.isArray(id)) {
      for (let indexId = 0; indexId < id.length; indexId++) {
        const check = id[indexId];

        if (checkId(check)) {
          selection.push(check);

          if (checkType && actionType === 'radio') {
            return selection;
          }
        }
      }
    } else {
      if (checkId(id)) {
        selection.push(id);
      }
    }

    return selection;
  }

  function allowScrollLeft() {
    return offset !== undefined && offset.x > 0;
  }

  function allowScrollRight() {
    const difSize = getDifSize();

    return difSize !== undefined && offset.x < difSize;
  }

  function getDifSize() {
    return layout !== undefined && size !== undefined
      ? size.x - layout.width
      : undefined;
  }

  function getIcon(
    id: string,
    iconFunction?: ChipIcon,
    iconActionFunction?: ChipIconAction,
  ) {
    if (iconFunction !== undefined) {
      return iconFunction({id: id, isSelected: isSelected(id)});
    }

    if (iconActionFunction !== undefined) {
      const action = iconActionFunction(id, isSelected(id));

      if (action === 'delete') {
        return <Icon style={styles.icon} name="times-circle" />;
      }

      if (action === 'check' && isSelected(id)) {
        return (
          <Icon
            style={StyleSheet.flatten([styles.icon, styles.iconCheck])}
            name="check"
          />
        );
      }
    }

    return undefined;
  }

  const handleRemoveId = useCallback(
    (id: string) => setChipIds(chipIds.filter(chipId => chipId !== id)),
    [chipIds],
  );

  function getIconAction(id: string, iconActionFunction?: ChipIconAction) {
    if (iconActionFunction !== undefined) {
      const action = iconActionFunction(id, isSelected(id));

      if (action === 'delete') {
        return () => handleRemoveId(id);
      } else if (action === 'check') {
        return () => {};
      }

      return action;
    }

    return undefined;
  }

  const handlePressChipItem = useCallback(
    (id: string, event: GestureResponderEvent) => {
      onPress && onPress(event);

      if (actionType !== 'chip') {
        if (actionType === 'checkbox') {
          const selection = [...selected];

          if (isSelected(id)) {
            selection.splice(selection.indexOf(id), 1);
          } else {
            selection.push(id);
          }

          setSelected(selection);
          onSelect(id, selection);
        } else {
          const selection = [id];

          setSelected([id]);
          onSelect(id, selection);
        }
      } else {
        onSelect(id, selected);
      }
    },
    [actionType, selected, isSelected, onPress, onSelect],
  );

  const handleRenderChipItem = useCallback(
    (id: string) => {
      const component =
        chipComponent && chipComponent({id, isSelected: isSelected(id)});
      const title =
        typeof component === 'string'
          ? component
          : component === undefined
          ? id
          : undefined;

      return (
        <ChipItem
          {...props}
          key={id}
          containerStyle={StyleSheet.flatten([
            typeof chipContainerStyle === 'function'
              ? chipContainerStyle(id)
              : chipContainerStyle,
            isSelected(id)
              ? StyleSheet.flatten([
                  styles.selectedChipContainer,
                  typeof selectedChipContainerStyle === 'function'
                    ? selectedChipContainerStyle(id)
                    : selectedChipContainerStyle,
                ])
              : {},
          ])}
          title={title}
          titleStyle={StyleSheet.flatten([
            typeof chipTitleStyle === 'function'
              ? chipTitleStyle(id)
              : chipTitleStyle,
            isSelected(id)
              ? typeof selectedChipTitleStyle === 'function'
                ? selectedChipTitleStyle(id)
                : selectedChipTitleStyle
              : {},
          ])}
          leftIcon={getIcon(id, leftIcon, leftIconAction)}
          leftIconAction={getIconAction(id, leftIconAction)}
          rightIcon={getIcon(id, rightIcon, rightIconAction)}
          rightIconAction={getIconAction(id, rightIconAction)}
          onPress={event => handlePressChipItem(id, event)}>
          {component !== undefined &&
            typeof component !== 'string' &&
            component}
        </ChipItem>
      );
    },
    [
      props,
      chipTitleStyle,
      chipContainerStyle,
      selectedChipTitleStyle,
      selectedChipContainerStyle,
      leftIcon,
      leftIconAction,
      rightIcon,
      rightIconAction,
      getIcon,
      chipComponent,
      isSelected,
      handlePressChipItem,
    ],
  );

  const handleRenderListChipItem = useMemo(
    () => chipIds.map(id => handleRenderChipItem(id)),
    [chipIds, handleRenderChipItem],
  );

  return horizontal ? (
    <View style={StyleSheet.flatten([containerStyle, styles.containerNoWrap])}>
      {horizontalScrollButton && (
        <TouchableOpacity
          testID="chip-scroll-left-icon-container"
          activeOpacity={activeOpacity}
          disabled={!allowScrollLeft()}
          style={StyleSheet.flatten([
            styles.scrollContainer,
            styles.scrollLeftIconContainer,
            horizontalScrollLeftButtonContainerStyle,
            !allowScrollLeft() ? styles.scrollContainerDisabled : {},
          ])}
          onPress={() => {
            if (scrollRef !== null) {
              scrollRef.scrollToOffset({
                offset: Math.max(0, offset.x - 125),
                animated: true,
              });
            }
          }}>
          {horizontalScrollLeftButton || <Icon name="chevron-left" />}
        </TouchableOpacity>
      )}
      <FlatList
        ref={instance => setScrollRef(instance)}
        onLayout={event => setLayout(event.nativeEvent.layout)}
        data={chipIds}
        horizontal
        scrollEnabled={horizontalScrollEnabled}
        onContentSizeChange={(w, h) => setSize({x: w, y: h})}
        onScroll={event => {
          setOffset(event.nativeEvent.contentOffset);
        }}
        contentContainerStyle={styles.sectionWrap}
        showsHorizontalScrollIndicator={horizontalScrollIndicator}
        keyExtractor={item => item}
        renderItem={({item}) => handleRenderChipItem(item)}
      />
      {horizontalScrollButton && (
        <TouchableOpacity
          testID="chip-scroll-right-icon-container"
          activeOpacity={activeOpacity}
          disabled={!allowScrollRight()}
          style={StyleSheet.flatten([
            styles.scrollContainer,
            styles.scrollRightIconContainer,
            horizontalScrollRightButtonContainerStyle,
            !allowScrollRight() ? styles.scrollContainerDisabled : {},
          ])}
          onPress={() => {
            const difSize = getDifSize();

            if (scrollRef !== null && difSize !== undefined) {
              scrollRef.scrollToOffset({
                offset: Math.min(difSize, offset.x + 125),
                animated: true,
              });
            }
          }}>
          {horizontalScrollRightButton || <Icon name="chevron-right" />}
        </TouchableOpacity>
      )}
    </View>
  ) : (
    <View style={StyleSheet.flatten([containerStyle, styles.containerWrap])}>
      {handleRenderListChipItem}
    </View>
  );
}

const styles = StyleSheet.create({
  containerWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerNoWrap: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  chipContainer: {
    padding: 7.5,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipTitle: {
    fontWeight: 'normal',
    color: 'black',
  },
  chipTitleContainer: {
    marginHorizontal: 5,
  },
  chipLeftIconContainer: {
    marginRight: 0,
  },
  chipRightIconContainer: {
    marginLeft: 0,
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainerDisabled: {
    opacity: 0.2,
  },
  scrollLeftIconContainer: {
    marginRight: 5,
  },
  scrollRightIconContainer: {
    marginLeft: 5,
  },
  selectedChipContainer: {
    backgroundColor: 'dodgerblue',
  },
  sectionWrap: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: 'dimgray',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  iconCheck: {
    fontSize: 16,
  },
});
