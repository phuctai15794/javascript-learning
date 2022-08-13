var courses = [
    {
        id: 1,
        name: 'Javascript',
        coin: 1000
    },
    {
        id: 2,
        name: 'PHP',
        coin: 1200
    },
    {
        id: 3,
        name: 'Ruby',
        coin: 1400
    },
    {
        id: 4,
        name: 'Laravel',
        coin: 1600
    },
    {
        id: 5,
        name: 'NodeJs',
        coin: 1800
    }
];


// Cách 1: Original
// function coinHandler(accumulator, currentValue, currentIndex, originalArray) {
//     return accumulator + currentValue.coin;
// }

// var totalCoin = courses.reduce(coinHandler, 0);

// Cách 1: Arrow function
var totalCoin = courses.reduce((accumulator, currentValue) => accumulator + currentValue.coin, 0);

console.log(totalCoin);