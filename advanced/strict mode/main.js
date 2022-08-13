/**
 * 1/ Không thể khai báo biến mà không sử dụng từ khóa var, let, const
 * 2/ Báo lỗi khi gán giá trị cho thuộc tính có writable: false
 * 3/ Báo lỗi khi hàm có tham số trùng tên
 * 4/ Khai báo hàm trong phạm vị Code block thì hàm sẽ chỉ thuộc phạm vi Code block
 * 5/ Không đặt tên biến, tên hàm bằng một số từ khóa 'nhạy cảm' của ngôn ngữ (private, public,...)
 */

/**
 * 1/ Không thể khai báo biến mà không sử dụng từ khóa var, let, const
 */
// "use strict";

// fullName = 'John';

// function testFunc() {
//     age = 18;
// }

// testFunc()

// console.log(fullName);
// console.log(age);

/**
 * 2/ Báo lỗi khi gán giá trị cho thuộc tính có writable: false
 */
// "use strict";

// const student = {};

// Object.defineProperties(student, {
//     'fullName': {
//         value: 'John smith',
//         writable: true
//     },
//     'age': {
//         value: 28,
//         writable: false
//     }
// });

// student.fullName = 'Will smith';
// console.log(student.fullName);

// student.age = 15;
// console.log(student.age);

/**
 * 3/ Báo lỗi khi hàm có tham số trùng tên
 */
// "use strict";

// function sum(a, a) {
//     return a + a;
// }

// console.log(sum(6, 9));

/**
 * 4/ Khai báo hàm trong phạm vị Code block thì hàm sẽ chỉ thuộc phạm vi Code block
 */
// "use strict";

// {
//     function sum(a, b) {
//         return a + b;
//     }

//     console.log(sum(6, 9));
// }

// console.log(sum(6, 9));

/**
 * 5/ Không đặt tên biến, tên hàm bằng một số từ khóa 'nhạy cảm' của ngôn ngữ (private, public,...)
 */
// "use strict";

// const private = 1;
// const public = 2;
// const protected = 3;