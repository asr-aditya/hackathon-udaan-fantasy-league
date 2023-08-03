const fs = require('fs');
const ApiError = require('./ApiError');

const checkLengthsAndThrowError = (data1, data2, errorCode, message) => {
  if (data1?.length != data2?.length) {
    throw new ApiError(errorCode, message);
  }
};

const removeUploadedFile = (fileName) => {
  const fileIsPresent = fs.existsSync(fileName);
  if (fileIsPresent) {
    fs.unlinkSync(fileName);
  }
};

const getRegexFieldFilter = (fieldName, fieldValue) => {
  const regExp = new RegExp(fieldValue);
  return {
    $expr: {
      $regexMatch: {
        input: { $toString: `$${fieldName}` },
        regex: regExp,
        options: 'i',
      },
    },
  };
};

const deleteObjectProperties = (obj, properties) => {
  properties?.forEach?.((property) => {
    delete obj?.[property];
  });
};

module.exports = {
  checkLengthsAndThrowError,
  removeUploadedFile,
  getRegexFieldFilter,
  deleteObjectProperties,
};
