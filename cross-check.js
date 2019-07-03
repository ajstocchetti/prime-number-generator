const {bruteForcePrimes} = require('./prime-stream');
const {primeStreamAdvanced} = require('./advanced-prime-stream');

const numIterations = 200;

const timeToMs = time => time[0] * 1e9 + time[1];
const timeDiff = (t1, t2) => timeToMs(t1) - timeToMs(t2);

const regular = bruteForcePrimes();
const advanced = primeStreamAdvanced(4);


for (let x = 0; x < numIterations; x++) {
  const tStart = process.hrtime();
  const a = regular.next().value;
  ta = process.hrtime(tStart);
  const ts2 = process.hrtime();
  const b = advanced.next().value;
  tb = process.hrtime(ts2);
  console.log(a, b, a == b, timeToMs(ta), timeToMs(tb), timeDiff(ta, tb));
}
