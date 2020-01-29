const REGEX_NUMBER = new RegExp('^[0-9]$');
export function isNumber(text) {
    return REGEX_NUMBER.test(text);
}
