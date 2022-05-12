export const emptyStringChecker = (string): Boolean => {
  // helper function to determine if the given string is empty
  // returns true if the string is not empty
  // returns false if the string is empty
  if (string) {
    return true;
  } else {
    return false;
  }
};

const intChecker = (num): Boolean => {
  // helper function to determine if the given number is a valid integer
  // returns true if the number is an integer
  // returns false if the number is not a valid integer
  if (num && !isNaN(Number(num)) && Number.isInteger(num)) {
    return true;
  } else {
    return false;
  }
};

export default {
  emptyStringChecker,
  intChecker,
};
