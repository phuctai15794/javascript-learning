var brand = 'F8';
var course = 'Javascript';

function highlight([first, ...strings], ...values) {
    return values.reduce((accumulator, current) => [...accumulator, `<span>${current}</span>`, strings.shift()], [first]).join('');
}

console.log(highlight`Học lập trình ${course} tại ${brand}!`);

// Debug
// var array = ["Học lập trình ", "<span>Javascript</span>", " tại "];
// var array = ["Học lập trình ", "<span>Javascript</span>", " tại ", "<span>F8</span>", "!"];

// console.log(array.join(''));