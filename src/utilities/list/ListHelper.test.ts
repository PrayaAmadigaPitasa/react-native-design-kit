import {Errors} from '../../constants';
import {getTotalPage, splitList} from './ListHelper';

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
});
