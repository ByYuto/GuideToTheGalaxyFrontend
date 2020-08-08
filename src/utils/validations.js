export const isRequired = (value) =>
  value.trim() !== '' ? { valid: true, errorType: '' } : { valid: false, errorType: 'This field is required' };

export const validate = (value, validations) => {
  if (validations.length < 1) return { valid: true, errorType: '' };
  const validator = validations.map((v) => v(value));
  const validateResult = validator.filter((v) => v.valid !== true);
  return validateResult;
};
