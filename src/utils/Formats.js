export const formatNumber = nb => new Intl.NumberFormat().format(nb);

export function convertUnicode(input) {
  return input.replace(/\\u(\w\w\w\w)/g, function(a, b) {
    const charcode = parseInt(b, 16);
    return String.fromCharCode(charcode);
  });
}
