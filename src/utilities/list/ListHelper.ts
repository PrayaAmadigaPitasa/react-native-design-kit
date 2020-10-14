import {Errors} from '../../constants';

/**
 * @param size total item size (must be higher than 0)
 * @param divider total items per page (must be higher than 0)
 */
export function getTotalPage(size: number, divider: number) {
  if (size <= 0) {
    throw Errors.ERROR_VALUE_MUST_BE_HIGHER_THAN_ZERO;
  } else if (divider <= 0) {
    throw Errors.ERROR_DIVIDER_MUST_BE_HIGHER_THAN_ZERO;
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

export function filterSelectList(
  list: string[],
  input: string[] | string,
  single?: boolean,
) {
  const selection: string[] = [];

  if (Array.isArray(input)) {
    for (const check in input) {
      if (list.indexOf(check) >= 0) {
        selection.push(check);

        if (single) {
          return selection;
        }
      }
    }
  } else if (list.indexOf(input) >= 0) {
    selection.push(input);
  }

  return selection;
}
