var name = 'Javascript';
var price = 1000;
var fieldFree = 'isFree';

var courses = {
    name,
    price,
    [fieldFree]: true,
    getName() {
        return this.name
    }
};

console.log(courses);
console.log(courses.getName());