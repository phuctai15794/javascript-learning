// console.log('VAR:');
// console.log(age);
// var age = 16;
// console.log(age);

// console.log('LET, CONST:');
// console.log('Khi khai báo bằng 2 từ khóa này thì biến sẽ bị đưa vào vùng Temporal Dead Zone nên chúng sẽ ko thể sử dụng được');
// {
//     console.log(fullName);
//     let fullName = 'John';
// }

const counter = createCounter();

console.log(counter());

function createCounter() {
    let counter = 0;

    return increase;

    function increase() {
        return ++counter;
    }
}