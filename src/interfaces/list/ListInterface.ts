import {
  ViewToken,
  ViewabilityConfig,
  ViewabilityConfigCallbackPairs,
  ViewStyle,
} from 'react-native';

export interface ListItemLayout {
  length: number;
  offset: number;
  index: number;
}

export interface ListScrollIndexFailedInfo {
  index: number;
  highestMeasuredFrameIndex: number;
  averageItemLength: number;
}

export interface ListEndReachedInfo {
  distanceFromEnd: number;
}

export interface ListAdditionalProps {
  ItemSeparatorComponent?: React.ComponentType<any> | null;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListFooterComponentStyle?: ViewStyle | null;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListHeaderComponentStyle?: ViewStyle | null;
  debug?: boolean;
  disableVirtualization?: boolean;
  extraData?: any;
  getItemCount?: (data: any) => number;
  getItemLayout?: (data: any, index: number) => ListItemLayout;
  initialNumToRender?: number;
  initialScrollIndex?: number;
  listKey?: string;
  maxToRenderPerBatch?: number;
  onEndReached?: ((info: {distanceFromEnd: number}) => void) | null;
  onEndReachedThreshold?: number | null;
  onRefresh?: (() => void) | null;
  onScrollToIndexFailed?: (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => void;
  onViewableItemsChanged?:
    | ((info: {
        viewableItems: Array<ViewToken>;
        changed: Array<ViewToken>;
      }) => void)
    | null;
  progressViewOffset?: number;
  refreshing?: boolean | null;
  removeClippedSubviews?: boolean;
  updateCellsBatchingPeriod?: number;
  viewabilityConfig?: ViewabilityConfig;
  viewabilityConfigCallbackPairs?: ViewabilityConfigCallbackPairs;
}
