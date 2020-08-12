export const isRequired = (value) =>
  value.trim() !== '' ? { valid: true, errorType: '' } : { valid: false, errorType: 'This field is required' };

export const validateEmail = (email) => {
  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/.test(email);
  return { valid: isValid, errorType: !isValid ? 'Invalid email' : '' };
};

export const validateMinLength = (value, lengthRequired) => value.length >= lengthRequired;

export const validateUppercase = (value) => /[A-Z]+/.test(value);

export const matchStringValidate = (str1, str2) => str1 === str2;

export const validate = (value, validations) => {
  if (validations.length < 1) return { valid: true, errorType: '' };
  const validator = validations.map((v) => v(value));
  const validateResult = validator.filter((v) => v.valid !== true);
  return validateResult;
};
