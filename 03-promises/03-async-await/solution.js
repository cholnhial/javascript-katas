/**
 * Async/Await Solutions
 */

async function getPostCount(fetchUser, fetchPosts, userId) {
  const user = await fetchUser(userId);
  const posts = await fetchPosts(user.id);
  return posts.length;
}

async function getUserData(fetchProfile, fetchSettings, userId) {
  const [profile, settings] = await Promise.all([
    fetchProfile(userId),
    fetchSettings(userId)
  ]);
  return { profile, settings };
}

async function getCompanyAddress(fetchUser, fetchCompany, fetchAddress, userId) {
  const user = await fetchUser(userId);
  const company = await fetchCompany(user.companyId);
  const address = await fetchAddress(company.addressId);
  return address;
}

async function processAll(items, processItem) {
  return Promise.all(items.map(item => processItem(item)));
}

async function processSequential(items, processItem) {
  const results = [];
  for (const item of items) {
    results.push(await processItem(item));
  }
  return results;
}

async function asyncFilter(items, predicate) {
  const results = await Promise.all(
    items.map(async item => ({
      item,
      keep: await predicate(item)
    }))
  );
  return results.filter(r => r.keep).map(r => r.item);
}

async function asyncReduce(items, reducer, initial) {
  let accumulator = initial;
  for (const item of items) {
    accumulator = await reducer(accumulator, item);
  }
  return accumulator;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryWithBackoff(fn, maxRetries, baseDelay) {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await sleep(baseDelay * Math.pow(2, i));
      }
    }
  }
  throw lastError;
}

async function withAsyncTimeout(fn, ms) {
  return Promise.race([
    fn(),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
  ]);
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
