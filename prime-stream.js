function * bruteForcePrimes(starting=2) {
  starting = Math.floor(starting);
  if (starting < 3) {
    yield 2;
    starting = 3;
  }
  if (!(starting % 2)) ++starting; // make odd number
  let n = starting;

  while(true) {
    if (isPrime(n)) {
      yield n;
    }
    n += 2;
  }
}

function isPrime(num) {
  const max = ~~Math.sqrt(num) + 1;
  for (let d=2; d<max; d++) {
    if (num%d === 0) return false;
  }
  return true;
}


module.exports = {
  isPrime,
  bruteForcePrimes,
};
