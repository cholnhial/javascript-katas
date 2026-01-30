/**
 * Array Search Methods Solutions
 */

function findFirstEven(numbers) {
  return numbers.find(n => n % 2 === 0);
}

function findUserById(users, id) {
  return users.find(user => user.id === id);
}

function findNegativeIndex(numbers) {
  return numbers.findIndex(n => n < 0);
}

function contains(array, value) {
  return array.includes(value);
}

function hasGreaterThan(numbers, threshold) {
  return numbers.some(n => n > threshold);
}

function allPositive(numbers) {
  return numbers.every(n => n > 0);
}

function hasDuplicates(array) {
  return array.some((item, index) => array.indexOf(item) !== index);
}

function hasAnyRole(userRoles, requiredRoles) {
  return userRoles.some(role => requiredRoles.includes(role));
}

function allInStock(items) {
  return items.every(item => item.quantity > 0);
}

function findByNestedProperty(objects, path, value) {
  const keys = path.split('.');
  return objects.find(obj => {
    let current = obj;
    for (const key of keys) {
      if (current === undefined || current === null) return false;
      current = current[key];
    }
    return current === value;
  });
}

module.exports = {
  findFirstEven,
  findUserById,
  findNegativeIndex,
  contains,
  hasGreaterThan,
  allPositive,
  hasDuplicates,
  hasAnyRole,
  allInStock,
  findByNestedProperty
};
