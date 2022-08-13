/**
 * Giống nhau
 * Là các phương thước được kế thừa từ Function.prototype
 */
// function fn() {}

// fn.bind();
// fn.call();
// fn.apply();

// console.log(fn.bind === Function.prototype.bind);
// console.log(fn.call === Function.prototype.call);
// console.log(fn.apply === Function.prototype.apply);

/**
 * Khác nhau
 * Về cách hoạt động
 */

/**
* Bind
* - Trả ra hàm mới với 'this' được tham chiếu tới 'thisArg'
* - Không thực hiện gọi hàm
* - Nếu được bind kèm arg1, arg2, ... thì các đối số này sẽ được ưu tiên hơn
*/

// function fn() {}
// const newFn = fn.bind(thisArg, arg1, arg2, ...);
// newFn(arg1, arg2, ...)

/**
* Call
* - Không trả về hàm mới
* - Thực hiện bind 'this' với 'thisArg' và thực hiện gọi hàm
* - Nhận các đối số cho hàm gốc từ arg1, arg2, ...
*/

// function fn() {}
// fn.call(thisArg, arg1, arg2, ...);

/**
* Apply
* - Không trả về hàm mới
* - Thực hiện bind 'this' với 'thisArg' và thực hiện gọi hàm
* - Nhận các đối số cho hàm gốc bằng đối số thứ 2 dưới dạng mảng [arg1, arg2, ...]
*/

// function fn() {}
// fn.apply(thisArg, [arg1, arg2, ...]);