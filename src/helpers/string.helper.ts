export const isStringNullOrEmpty = (value: string): boolean => {
  if (value === undefined || value === null || value === '') {
    return false;
  }

  return true;
};

export const replaceNumberStringWithCommas = (
  numberString: string | number
) => {
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  var parts = numberString.toString().split('.');
  parts[0] = parts[0].replace(regex, ',');
  return parts.join('.');
};

export const replaceNumberStringWithCommasReport = (
  numberString: string | number
) => {
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const numberWith2Decimals =
    typeof numberString === 'number'
      ? numberString.toFixed(2)
      : parseFloat(numberString).toFixed(2);
  var parts = numberWith2Decimals.toString().split('.');
  parts[0] = parts[0].replace(regex, ',');
  return parts.join('.');
};

export const replaceNumberStringWithoutCommas = (numberTypeString: string) => {
  return numberTypeString.replace(/\,/g, '');
};

export const genCode = (count: number) => {
  if (count < 10) {
    return `000${count}`;
  }
  if (count < 100) {
    return `00${count}`;
  }
  if (count < 1000) {
    return `0${count}`;
  }
  return count;
};

export const randomString = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const truncateString = (str: string, maxLength: number) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + '...';
  }
  return str;
};
