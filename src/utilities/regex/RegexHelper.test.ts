import {isNumber} from './RegexHelper';

describe('RegexHelper', () => {
  test('isNumber', async () => {
    const caseValue1 = isNumber('1');
    const caseValue2 = isNumber('123');
    const caseValue3 = isNumber('abc');

    expect(caseValue1).toBe(true);
    expect(caseValue2).toBe(true);
    expect(caseValue3).toBe(false);
  });
});
