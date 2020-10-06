const REGEX_NUMBER = new RegExp('^[0-9]+$');

export function isNumber(text: string) {
  return REGEX_NUMBER.test(text);
}
