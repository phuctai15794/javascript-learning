/**
 * 1. Phương thức bind sẽ trả về 1 hàm mới
 * 2. Có thể các đối số như hàm ban đầu
 */

this.firstName = 'Minh';
this.lastName = 'Thu';

const teacher = {
    firstName: 'Minh',
    lastName: 'Thảo',
    getFullName(value1, value2) {
        return `${this.firstName} ${this.lastName}`;
    }
}

console.log(teacher.getFullName());

/**
 * Cách 1
 */
// const getTeacherName = teacher.getFullName.bind(teacher, 'Test 1', 'Test 2');
// console.log(getTeacherName());

/**
 * Cách 2
 */
const getTeacherName = teacher.getFullName.bind(teacher);
console.log(getTeacherName('Test 1', 'Test 2'));