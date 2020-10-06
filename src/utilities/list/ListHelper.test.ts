import {getTotalPage} from './ListHelper';

describe('ListHelper', () => {
  test('getTotalPage', async () => {
    const totalCase1 = getTotalPage(17, 10);
    const totalCase2 = getTotalPage(30, 10);

    expect(totalCase1).toBe(2);
    expect(totalCase2).toBe(3);
    expect(() => getTotalPage(10, 0)).toThrow();
  });

  // test('splitList', async () => {

  // })
});
