/**
 * Array.sort() Solutions
 */

function sortAscending(numbers) {
  return [...numbers].sort((a, b) => a - b);
}

function sortDescending(numbers) {
  return [...numbers].sort((a, b) => b - a);
}

function sortAlphabetically(strings) {
  return [...strings].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
}

function sortByProperty(objects, property) {
  return [...objects].sort((a, b) => a[property] - b[property]);
}

function sortByStringProperty(objects, property) {
  return [...objects].sort((a, b) => a[property].localeCompare(b[property]));
}

function sortByCategoryThenPrice(products) {
  return [...products].sort((a, b) => {
    const categoryCompare = a.category.localeCompare(b.category);
    if (categoryCompare !== 0) return categoryCompare;
    return a.price - b.price;
  });
}

function sortDates(dateStrings) {
  return [...dateStrings].sort((a, b) => new Date(a) - new Date(b));
}

function sortByCustomPriority(tasks, priorityOrder) {
  const priorityIndex = {};
  priorityOrder.forEach((p, i) => priorityIndex[p] = i);
  return [...tasks].sort((a, b) => priorityIndex[a.priority] - priorityIndex[b.priority]);
}

function sortByLengthThenAlpha(strings) {
  return [...strings].sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    return a.localeCompare(b);
  });
}

function sortWithNullsLast(values) {
  return [...values].sort((a, b) => {
    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;
    return a - b;
  });
}

module.exports = {
  sortAscending,
  sortDescending,
  sortAlphabetically,
  sortByProperty,
  sortByStringProperty,
  sortByCategoryThenPrice,
  sortDates,
  sortByCustomPriority,
  sortByLengthThenAlpha,
  sortWithNullsLast
};
