const {bruteForcePrimes} = require('./prime-stream');
const {primeStreamAdvanced} = require('./advanced-prime-stream');

const numIterations = 500000;

const regular = bruteForcePrimes();
const start_reg = Date.now();
for (let z=0; z < numIterations; z++) { regular.next() }
const end_reg = Date.now();

const advanced = primeStreamAdvanced(8);
const start_adv = Date.now();
for (let z=0; z < numIterations; z++) { advanced.next() }
const end_adv = Date.now();

console.log('Regular time (ms):', end_reg-start_reg);
console.log('Advanced time (ms):', end_adv-start_adv);
