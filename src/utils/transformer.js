// Function for combining all keys in an object to one value
// mainObjectWithAllValues - This is the main object withh all the keys
// keyList - List of keys we want to combine
// separator - For separating keys we use separator
const combineObjectKeys = (mainObjectWithAllValues, keyList, separator = '-') => {
  let finalValue = '';
  const keysLength = keyList?.length || 0;
  keyList?.forEach((key, index) => {
    const value = mainObjectWithAllValues?.[key];
    // After last index separator is not needed
    if (index == keysLength - 1) {
      finalValue += value;
      return;
    }
    // If separator is present we add separator after the value
    if (separator) {
      finalValue += `${value}${separator}`;
      return;
    }
    finalValue += value;
  });
  return finalValue;
};

const transformArrayToObject = (data, keyList, keySeparator = '-') => {
  const result = {};
  data?.forEach?.((details) => {
    const combinedKey = combineObjectKeys(details, keyList, keySeparator);
    result[combinedKey] = details;
  });
  return result;
};

module.exports = { transformArrayToObject };
