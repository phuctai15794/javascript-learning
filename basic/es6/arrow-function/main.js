// Cách 1: Logger
// const logger = (log) => {
//     return log;
// };

// Cách 2: Logger
// const logger = (log) => log;

// Cách 3: Logger
const logger = log => log;

// Cách 1: Sum
const sum = (a, b) => a + b;

// Cách 1: Object
// const course = (a, b) => {
//     return {
//         a: a,
//         b: b
//     }
// };

// Cách 2: Object
const course = (a, b) => ({
    a: a,
    b: b
});

console.log(logger('Message...'));
console.log(sum(4, 5));
console.log(course(4, 5));