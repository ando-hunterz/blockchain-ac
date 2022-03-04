const required = (value) => {
  if (value.length > 0) return true;
  return false;
};

const alphaNumeric = (value) => {
  return /^[A-Za-z]+$/.test(value);
};

const nameValidation = (value, column) => {
  if (!required(value)) return `${column} column is required`;
  if (!alphaNumeric(value)) return `${column} column must be alphanumeric`;
  return null;
};

export { required, alphaNumeric, nameValidation };
