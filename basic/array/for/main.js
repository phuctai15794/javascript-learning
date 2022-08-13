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

console.log('%cFor Of: ', 'color:red;font-weight:bold');
for (const course of courses) {
    console.log('ID: ', course.id , ' - Name: ', course.name, ' - Coin: ', course.coin);
}

console.log('%cFor In: ', 'color:red;font-weight:bold');
for (const key in courses) {
    console.log('ID: ', courses[key].id , ' - Name: ', courses[key].name, ' - Coin: ', courses[key].coin);
}

console.log('%cFor: ', 'color:red;font-weight:bold');
for (let index = 0; index < courses.length; index++) {
    console.log('ID: ', courses[index].id , ' - Name: ', courses[index].name, ' - Coin: ', courses[index].coin);
}