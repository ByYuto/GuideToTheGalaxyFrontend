export const isRequired = (value) =>
  value.trim() !== '' ? { valid: true, errorType: '' } : { valid: false, errorType: 'This field is required' };

export const requiredDate = (date) => {
  const isValid = date instanceof Date;
  return { valid: isValid, errorType: !isValid ? 'Date field is required' : '' };
};

export const fileRequired = (files) => {
  const isValid = files.length > 0;
  return { valid: isValid, errorType: !isValid ? 'Featured Image is required' : '' };
};

export const validateEmail = (email) => {
  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/.test(email);
  return { valid: isValid, errorType: !isValid ? 'Invalid email' : '' };
};

export const validateMinLength = (value, lengthRequired = 3) => ({
  valid: value.length >= lengthRequired,
  errorType: !(value.length >= lengthRequired) ? `The min length required is ${lengthRequired}` : '',
});

export const validateMaxLength = (value, lengthRequired = 140) => ({
  valid: value.length <= lengthRequired,
  errorType: !(value.length <= lengthRequired) ? `The max length allowed is ${lengthRequired}` : '',
});

export const validateUrl = (url, requiredEmpty = false) => {
  if (requiredEmpty || url.trim() !== '') {
    const isValid = /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
      url
    );
    return { valid: isValid, errorType: !isValid ? 'Invalid url' : '' };
  } else {
    return { valid: true, errorType: '' };
  }
};

export const validateEmbed = (url, requiredEmpty = false) => {
  if (requiredEmpty || url.trim() !== '') {
    const isValid = /^[http(s)?:\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
      url
    );
    return { valid: isValid, errorType: !isValid ? 'Invalid url' : '' };
  } else {
    return { valid: true, errorType: '' };
  }
};

export const validateUppercase = (value) => /[A-Z]+/.test(value);

export const matchStringValidate = (str1, str2) => str1 === str2;

export const validate = (value, validations) => {
  if (validations.length < 1) return { valid: true, errorType: '' };
  const validator = validations.map((v) => v(value));
  const validateResult = validator.filter((v) => v.valid !== true);
  return validateResult;
};
