/**
 * @param size total item size
 * @param divider total items per page (must be higher than 0)
 */
export function getTotalPage(size: number, divider: number) {
  if (divider <= 0) {
    throw Error('divider must be higher than 0');
  }

  return Math.floor(size / divider) + (size % divider === 0 ? 0 : 1);
}

/**
 * @param data item list data
 * @param limit total item per split
 */
export function splitList<ItemT>(data: ItemT[], limit: number) {
  const items: ItemT[][] = [];
  const length = data.length;
  const totalPage = getTotalPage(length, limit);

  for (let page = 0; page < totalPage; page++) {
    const dataSplit: ItemT[] = [];

    for (let innerIndex = 0; innerIndex < limit; innerIndex++) {
      const index = page * limit + innerIndex;

      if (index < length) {
        const item = data[index];

        dataSplit.push(item);
      }
    }

    items.push(dataSplit);
  }

  return items;
}
