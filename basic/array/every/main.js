var courses = [
    {
        id: 1,
        name: 'Javascript',
        coin: 1000,
        isFree: true
    },
    {
        id: 2,
        name: 'PHP',
        coin: 1200,
        isFree: true
    },
    {
        id: 3,
        name: 'Ruby',
        coin: 1400,
        isFree: true
    },
    {
        id: 4,
        name: 'Laravel',
        coin: 1600,
        isFree: true
    },
    {
        id: 5,
        name: 'NodeJs',
        coin: 1800,
        isFree: true
    }
];

var newCourses = courses.every((course, index) => course.isFree);

console.log(newCourses);