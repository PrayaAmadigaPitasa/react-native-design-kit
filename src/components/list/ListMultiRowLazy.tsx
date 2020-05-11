import React, {useState, useEffect} from 'react';
import ListMultiRow, {ListMultiRowProps} from './ListMultiRow';
import {LIST_ACTIVITY_DEFAULT, LIST_FILTER_DEFAULT} from '../../constants';
import {ListEndReachedInfo} from '../../interfaces';
import {ListItemType} from '../../types';

export interface ListActivity {
  loading: boolean;
  endPage: boolean;
}

export interface ListFilter {
  page: number;
}

export interface ListMultiRowLazyProps<ItemT> extends ListMultiRowProps<ItemT> {
  loadData(filter: ListFilter): ListItemType<ItemT>;
  onUpdateData?(data: ItemT[]): void;
  onUpdateFilter?(filter: ListFilter): void;
  onUpdateActivity?(activity: ListActivity): void;
}

export default function ListMultiRowLazy<ItemT>({
  data,
  loadData,
  onEndReached,
  onUpdateData,
  onUpdateFilter,
  onUpdateActivity,
  ...props
}: ListMultiRowLazyProps<ItemT>) {
  const [items, setItems] = useState(data);
  const [activity, setActivity] = useState(LIST_ACTIVITY_DEFAULT);
  const [filter, setFilter] = useState(LIST_FILTER_DEFAULT);
  const {loading, endPage} = activity;
  const {page} = filter;

  useEffect(() => {
    onUpdateData && onUpdateData(data);
    setItems(data);
  }, [data]);

  useEffect(() => {
    onUpdateFilter && onUpdateFilter(filter);
    fetchData();
  }, [filter]);

  useEffect(() => {
    onUpdateActivity && onUpdateActivity(activity);
  }, [activity]);

  /**
   * @description
   * load data then merge with previous data
   */
  async function fetchData() {
    const responses = await loadData(filter);

    setActivity({...activity, loading: true});

    if (responses) {
      setActivity({loading: false, endPage: false});
      setItems([...items, ...responses]);
    } else {
      setActivity({loading: false, endPage: true});
    }
  }

  /**
   *
   * @param info list end reached info
   *
   * @description
   * called when dif offset reached threshold value
   */
  function handleEndReached(info: ListEndReachedInfo) {
    onEndReached && onEndReached(info);

    if (!loading && !endPage) {
      setActivity({...activity, loading: true});
      setFilter({...filter, page: page + 1});
    }
  }

  return (
    <ListMultiRow {...props} data={items} onEndReached={handleEndReached} />
  );
}
