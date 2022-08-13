/**
 * Phương thức này dùng để gọi hàm và bind this cho hàm
 * - Fn.call() giúp gọi hàm và bind this tới đối tượng khác, mặc định this là window object
 * - Fn.call() không trả ra hàm mới, nó gọi luôn hàm sau khi bind this (Fn.bind() thì chỉ bind this nhưng không gọi hàm)
 * - Fn.call() dùng để mượn hàm - function borrowing
 * - Fn.call() Ví dụ về Arguments
 * - Fn.call() có thể dùng để kế thừa properties & method từ 1 Constructor khác
 */

/**
 * 1/ Gọi gàm với CALL method
 */
// console.log('1/ Gọi gàm với CALL method');

// var firstName = 'John';
// var lastName = 'Smith';

// function showFullName() {
//     console.log(`${firstName} ${lastName}`);
// }

// showFullName.call();

/**
 * 2.1/ Gọi gàm và bind và áp dụng function borrowing
 */
// console.log('2.1/ Gọi gàm và bind');

// const teacher = {
//     firstName: 'Thu',
//     lastName: 'Trang'
// }

// const me = {
//     firstName: 'Phuc',
//     lastName: 'Tai',
//     showFullName() {
//         console.log(`${this.firstName} ${this.lastName}`);
//     }
// }

// me.showFullName.call(teacher);
// me.showFullName.call(me);

/**
 * 2.2/ Trong `strict mode` vẫn có THIS nếu được bind
 */
// 'use strict';

// console.log('2.2/ Trong `strict mode` vẫn có THIS nếu được bind');

// this.firstName = 'Phuc';
// this.lastName = 'Tai';

// function getFullName() {
//     console.log(`${this.firstName} ${this.lastName}`);
// }

// getFullName.call(this);
// getFullName(); // This chỗ này sẽ là undefinded nếu ko đc bind

/**
 * 3/ Thể hiện được tính kế thừa (extends) trong OOP
 */
function Animal(name, weight) {
    this.name = name;
    this.weight = weight;
}

function Chicken(name, weight, legs) {
    Animal.call(this, name, weight); // this ở đây chính là gaRung
    this.legs = legs;
}

const gaRung = new Chicken('Gà rừng', 5, 2);
console.log(gaRung);

/**
 * 4/ Ví dụ về Function Borrowing
 */

function logger() {
    Array.prototype.forEach.call(arguments, item => {
        console.log(item)
    });
    
    const arrSliced = Array.prototype.slice.call(arguments);
    console.log(arrSliced);
}

logger(1, 2, 3, 4, 5);