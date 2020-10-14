import {Errors} from '../../constants';
import {filterSelectList, getTotalPage, splitList} from './ListHelper';

describe('ListHelper', () => {
  test('getTotalPage', async () => {
    const totalCase1 = getTotalPage(17, 10);
    const totalCase2 = getTotalPage(30, 10);
    const totalCase3 = () => getTotalPage(0, 10);
    const totalCase4 = () => getTotalPage(10, 0);

    expect(totalCase1).toBe(2);
    expect(totalCase2).toBe(3);
    expect(totalCase3).toThrow(Errors.ERROR_VALUE_MUST_BE_HIGHER_THAN_ZERO);
    expect(totalCase4).toThrow(Errors.ERROR_DIVIDER_MUST_BE_HIGHER_THAN_ZERO);
  });

  test('splitList', async () => {
    const valueCase1 = splitList(['a', 'b', 'c'], 2);
    const valueCase2 = splitList(['a', 'b', 'c'], 3);

    expect(valueCase1).toEqual([['a', 'b'], ['c']]);
    expect(valueCase2).toEqual([['a', 'b', 'c']]);
  });

  test('filterSelectList', async () => {
    const valueCase1 = filterSelectList(['a', 'b', 'c'], ['a', 'b']);
    const valueCase2 = filterSelectList(['a', 'b', 'c'], ['a', 'b'], true);
    const valueCase3 = filterSelectList(['a', 'b', 'c'], ['a', 'b', 'c', 'd']);
    const valueCase4 = filterSelectList(['a', 'b', 'c'], 'a');
    const valueCase5 = filterSelectList(['a', 'b', 'c'], 'd');

    expect(valueCase1).toEqual(['a', 'b']);
    expect(valueCase2).toEqual(['a']);
    expect(valueCase3).toEqual(['a', 'b', 'c']);
    expect(valueCase4).toEqual(['a']);
    expect(valueCase5).toEqual([]);
  });
});
