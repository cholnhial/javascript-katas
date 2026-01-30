/**
 * Async/Await Exercises
 *
 * async/await is syntactic sugar over promises, making async code
 * look synchronous. Coming from Java: similar to virtual threads feel.
 */

/**
 * Convert this promise chain to async/await
 * Original: fetchUser(id).then(user => fetchPosts(user.id)).then(posts => posts.length)
 * @param {Function} fetchUser - (id) => Promise<{id, name}>
 * @param {Function} fetchPosts - (userId) => Promise<Post[]>
 * @param {number} userId
 * @returns {Promise<number>} Number of posts
 */
async function getPostCount(fetchUser, fetchPosts, userId) {
  // Your code here - use async/await
}

/**
 * Fetch user data with profile and settings in parallel
 * @param {Function} fetchProfile - (id) => Promise<Profile>
 * @param {Function} fetchSettings - (id) => Promise<Settings>
 * @param {number} userId
 * @returns {Promise<{profile: Profile, settings: Settings}>}
 */
async function getUserData(fetchProfile, fetchSettings, userId) {
  // Your code here - fetch in parallel using Promise.all with await
}

/**
 * Sequential async operations with dependency
 * Fetch user, then their company, then company's address
 * @param {Function} fetchUser - (id) => Promise<{companyId}>
 * @param {Function} fetchCompany - (id) => Promise<{addressId}>
 * @param {Function} fetchAddress - (id) => Promise<Address>
 * @param {number} userId
 * @returns {Promise<Address>}
 */
async function getCompanyAddress(fetchUser, fetchCompany, fetchAddress, userId) {
  // Your code here
}

/**
 * Process items with async operation, collecting results
 * @param {any[]} items
 * @param {Function} processItem - async (item) => result
 * @returns {Promise<any[]>} Processed results in order
 */
async function processAll(items, processItem) {
  // Your code here - process all in parallel
}

/**
 * Process items sequentially (one at a time)
 * @param {any[]} items
 * @param {Function} processItem - async (item) => result
 * @returns {Promise<any[]>} Processed results in order
 */
async function processSequential(items, processItem) {
  // Your code here - use for...of with await
}

/**
 * Async filter - keep items where async predicate returns true
 * @param {any[]} items
 * @param {Function} predicate - async (item) => boolean
 * @returns {Promise<any[]>}
 *
 * Example:
 * await asyncFilter([1,2,3,4], async n => n % 2 === 0); // [2, 4]
 */
async function asyncFilter(items, predicate) {
  // Your code here
}

/**
 * Async reduce - reduce with async reducer function
 * @param {any[]} items
 * @param {Function} reducer - async (accumulator, item) => newAccumulator
 * @param {any} initial
 * @returns {Promise<any>}
 *
 * Example:
 * await asyncReduce([1,2,3], async (sum, n) => sum + n, 0); // 6
 */
async function asyncReduce(items, reducer, initial) {
  // Your code here
}

/**
 * Sleep function using async/await
 * @param {number} ms
 * @returns {Promise<void>}
 */
async function sleep(ms) {
  // Your code here
}

/**
 * Retry with exponential backoff
 * @param {Function} fn - async function to retry
 * @param {number} maxRetries
 * @param {number} baseDelay - initial delay in ms (doubles each retry)
 * @returns {Promise<any>}
 */
async function retryWithBackoff(fn, maxRetries, baseDelay) {
  // Your code here
}

/**
 * Execute async function with timeout
 * @param {Function} fn - async function
 * @param {number} ms - timeout in milliseconds
 * @returns {Promise<any>} Result or throws Error('Timeout')
 */
async function withAsyncTimeout(fn, ms) {
  // Your code here
}

module.exports = {
  getPostCount,
  getUserData,
  getCompanyAddress,
  processAll,
  processSequential,
  asyncFilter,
  asyncReduce,
  sleep,
  retryWithBackoff,
  withAsyncTimeout
};
