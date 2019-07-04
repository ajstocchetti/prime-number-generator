const {bruteForcePrimes} = require('./prime-stream');
const {primeStreamAdvanced} = require('./advanced-prime-stream');

const numIterations = 50000000;
// const startLogging = numIterations / 20;
const startLogging = 6000000;

const timeToMs = time => time[0] * 1e9 + time[1];
const timeDiff = (t1, t2) => timeToMs(t1) - timeToMs(t2);

const bf = bruteForcePrimes();
const advanced = primeStreamAdvanced(8);


for (let x = 0; x < numIterations; x++) {
  const tStart = process.hrtime();
  const a = advanced.next().value; // advanced
  ta = process.hrtime(tStart);

  const ts2 = process.hrtime();
  const b = bf.next().value; // brute force
  tb = process.hrtime(ts2);

  if (a !== b) console.log(x, a, b);
  if (x > startLogging) console.log(x, a, timeDiff(tb, ta));
  // console.log(x, a, b, a == b, timeDiff(ta, tb));
}
