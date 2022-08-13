/**
 * Phương thức này cho phép gọi một hàm với một this (bind) và truyền đối số cho hàm gốc dưới dạng mảng
 */

/**
 * Ví dụ 1
 */
// const teacher = {
//     firstName: 'Minh',
//     lastName: 'Thu'
// }

// function greet(greeting, message) {
//     return `${greeting} ${this.firstName} ${this.lastName}. ${message}`;
// }

// let result = greet.apply(teacher, ['Em chào cô', 'Cô dạy môn gì thế ạ ? (Đã xem cô livestream 1 tiếng)']);

// console.log(result);

// So sánh với call method
// result = greet.call(teacher, 'Em chào cô', 'Cô dạy môn gì thế ạ ? (Đã xem cô livestream 1 tiếng)');

// console.log(result);

/**
 * Ví dụ 2: Function borrowing
 */
// const teacher = {
//     firstName: 'Minh',
//     lastName: 'Thu',
//     isOnline: false,
//     goOnline() {
//         this.isOnline = true;
//         console.log(`${this.firstName} ${this.lastName} is Online`);
//     },
//     goOffline() {
//         this.isOnline = false;
//         console.log(`${this.firstName} ${this.lastName} is Offline`);
//     }
// };

// const me = {
//     firstName: 'Phuc',
//     lastName: 'Tai',
//     isOnline: false
// };

// console.log('Teacher: ', teacher.isOnline);
// teacher.goOnline();
// console.log('Teacher: ', teacher.isOnline);

// console.log('----------');

// console.log('Student: ', me.isOnline);
// teacher.goOnline.apply(me);
// console.log('Student: ', me.isOnline);

/**
 * Ví dụ 3: Extends (Kế thừa)
 */
// function Animal(name, weight) {
//     this.name = name;
//     this.weight = weight;
// }

// function Parrot() {
//     Animal.apply(this, arguments);
//     this.speak = function() {
//         console.log('Nhà có khách!');
//     }
// }

// const conVet = new Parrot('Vẹt', 300);
// console.log(conVet);