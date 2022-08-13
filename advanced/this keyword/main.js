/**
 * 1/ Từ khóa THIS trong Javascript đề cập đến đối tượng mà nó thuộc về
 * 2/ Trong một phương thức, THIS tham chiếu tới đối tượng truy cập phương thức (đối tượng trước dấu .)
 * 3/ Đứng ngoài phương thức, THIS tham chiếu tới đối tượng Global => Window
 * 4/ THIS trong hàm tạo là đại diện cho đối tượng sẽ được tạo
 * 5/ THIS trong một hàm là undefined nếu ở 'strict mode' và là Window nếu không ở 'strict mode'
 * 6/ THIS trong Arrow Function sẽ trả về đối tượng nằm bên ngoài gần nó nhất
 * 7/ Các phương thức bind(), call(), apply() có thể tham chiếu THIS tới đối tượng khác
 */

/**
 * 1/ Từ khóa THIS trong Javascript đề cập đến đối tượng mà nó thuộc về
 */
const iPhone = {
    // Property
    name: 'iPhone7',
    color: 'Pink',
    weight: 300,
    
    // Method
    takePhoto() {
        console.log(this);
    },
    objChild: {
        name: 'Child object',
        methodChild() {
            console.log(this);
        }
    }
}

iPhone.takePhoto();
iPhone.objChild.methodChild();

/**
* 2/ Trong một phương thức, THIS tham chiếu tới đối tượng truy cập phương thức (đối tượng trước dấu .)
*/
const button = document.querySelector('button');

button.onclick = function() {
    console.log(this);
}

/**
* 3/ Đứng ngoài phương thức, THIS tham chiếu tới đối tượng Global => Window
*/
console.log(this);

/**
* 4/ THIS trong hàm tạo là đại diện cho đối tượng sẽ được tạo
*/
function Car(name, color, weight) {
    this.name = name;
    this.color = color;
    this.weight = weight;
    this.run = () => {
        console.log(this);
    }
}

const mercedesS450 = new Car('Mercedes S450', 'Black', 1200);
mercedesS450.run();

/**
* 5/ THIS trong một hàm là undefined nếu ở 'strict mode' và là Window nếu không ở 'strict mode'
*/
'use strict';

function hello() {
    console.log(this);
    // this => undefined if in 'strict mode'
    // this => Window if IS NOT IN 'strict mode'
}

hello();

/**
* 6/ THIS trong Arrow Function sẽ trả về đối tượng nằm bên ngoài gần nó nhất
*/
const button = document.querySelector('button');

button.onclick = () => {
    console.log(this);
    // this => Window
}