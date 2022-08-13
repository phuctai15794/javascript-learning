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
// function courseHandler(course, index) {
//     return {
//         id: course.id,
//         name: `Khóa học ${course.name}`,
//         coin: course.coin,
//         coinText: `Giá: ${course.coin}`,
//         index: index
//     };
// }

// var newCourses = courses.map(courseHandler);

// Cách 2: Arrow function
var newCourses = courses.map((course, index) => ({
    id: course.id,
    name: `Khóa học ${course.name}`,
    coin: course.coin,
    coinText: `Giá: ${course.coin}`,
    index: index
}));

console.log(newCourses);