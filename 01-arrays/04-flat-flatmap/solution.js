/**
 * Array.flat() & flatMap() Solutions
 */

function flattenOneLevel(array) {
  return array.flat();
}

function flattenToDepth(array, depth) {
  return array.flat(depth);
}

function flattenDeep(array) {
  return array.flat(Infinity);
}

function splitAndFlatten(sentences) {
  return sentences.flatMap(s => s.split(' '));
}

function getAllTags(posts) {
  return posts.flatMap(post => post.tags);
}

function duplicateElements(array) {
  return array.flatMap(x => [x, x]);
}

function doubleEvens(numbers) {
  return numbers.flatMap(n => n % 2 === 0 ? [n * 2] : []);
}

function cartesianProduct(arr1, arr2) {
  return arr1.flatMap(a => arr2.map(b => [a, b]));
}

function compactAndFlatten(array) {
  return array.flat().filter(() => true);
  // Or simply: array.flat()
}

function expandRanges(ranges) {
  return ranges.flatMap(([start, end]) => {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  });
}

module.exports = {
  flattenOneLevel,
  flattenToDepth,
  flattenDeep,
  splitAndFlatten,
  getAllTags,
  duplicateElements,
  doubleEvens,
  cartesianProduct,
  compactAndFlatten,
  expandRanges
};
