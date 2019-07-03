const {bruteForcePrimes} = require('./prime-stream');
const debug = true;

module.exports = {
  primeStreamAdvanced,
  getCommonMultiple,
  generateSkipList,
  isDivisByAny,
};

function getCommonMultiple(arr) {
  return arr.reduce((a, c) => a*c, 1);
}


function generateSkipList(primes) {
  const commonMultiple = 2 * getCommonMultiple(primes);
  const advance = [];
  let x = 0;
  let last = 0;
  for (x=0; x < commonMultiple; x += 2) {
    if (!isDivisByAny(x, primes)) {
      advance.push(x-last);
      last = x;
    }
  }
  advance.push(commonMultiple - last);
  return advance;
}


function isDivisByAny(num, arr) {
  let x = 0;
  for (; x<arr.length; x++) {
    if (num % arr[x] === 0) return true;
  }
  return false;
  // return arr.reduce((a, c) => (a || num%c === 0), false);
}

function * primeStreamAdvanced(numBruteForce = 5, starting = 2) {
  const bf = bruteForcePrimes();

  // edge case: 2
  // cant pass 2 into generateSkipList, it messes things up
  if (starting < 3) yield bf.next().value;
  --numBruteForce;

  const primes = [];
  while (primes.length < numBruteForce) {
    const next = bf.next().value;
    primes.push(next);
    if (next >= starting) yield next;
  }

  if (debug) console.log(`Generated ${numBruteForce + 1} primes`, primes);

  const optStart = getCommonMultiple(primes);
  if (debug) console.log(`Need to get to ${optStart} via brute force`);
  let another = bf.next().value;
  for (; another < optStart; another = bf.next().value) {
    yield another;
  }
  if (debug) console.log(`Caught up to skip list starting point, using optimized method`);

  const skipList = generateSkipList(primes);
  const isPrimeCheckStart = primes[primes.length - 1];
  const len = skipList.length;
  const lastIndex = skipList.length - 1;
  let n = optStart;
  let skipIndex = -1;

  while(true) {
    skipIndex = ++skipIndex % len; // advance index
    n += skipList[skipIndex];
    if (skipIndex === lastIndex) continue;
    if (isPrime(n, isPrimeCheckStart)) yield n;
  }
}

function isPrime(num, startCheck = 2) {
  const max = ~~Math.sqrt(num) + 1;
  for (let d=startCheck; d<max; d++) {
    if (num%d === 0) return false;
  }
  return true;
}
