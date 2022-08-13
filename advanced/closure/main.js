/**
 * Closure là một hàm có thể ghi nhớ nơi nó được tạo ra và truy cập được biến ở bên ngoài phạm vi của nó
 * Biến được tham chiếu (refer) trong Closure sẽ không bị xóa khỏi bộ nhớ khi hàm cha thực thi xong
 */

// function createCounter() {
//     let counter = 0;

//     function increase() {
//         return ++counter;
//     }

//     return increase;
// }

// const counter = createCounter();

// console.log('Counter 1:');
// console.log(counter());
// console.log(counter());
// console.log(counter());
// console.log(counter());
// console.log(counter());

// const counter2 = createCounter();

// console.log('Counter 2:');
// console.log(counter2());
// console.log(counter2());
// console.log(counter2());
// console.log(counter2());
// console.log(counter2());

// function createLogger(namespace) {
//     function logger(message) {
//         console.log(`[${namespace}] ${message}`);
//     }

//     return logger;
// }

// const infoLogger = createLogger('Info');
// infoLogger('Bắt đầu gửi mail');
// infoLogger('Gửi mail lần 1');
// infoLogger('Gửi mail lần 2');
// infoLogger('Gửi mail lần 3');
// infoLogger('Hoàn tất gửi mail...');

// const errorLogger = createLogger('Error');
// errorLogger('Gửi mail thất bại lần 1');
// errorLogger('Gửi mail thất bại lần 2');
// errorLogger('Gửi mail thất bại lần 3');
// errorLogger('Thất bại. Thử lại sau...');

// function createStorage(key) {
//     const store = JSON.parse(localStorage.getItem(key)) ?? {};
//     const storage = {
//         get(key) {
//             return store[key];
//         },
//         set(key, value) {
//             store[key] = value;
//             save();
//         },
//         remove(key) {
//             delete store[key];
//             save();
//         }
//     };
//     const save = () => {
//         localStorage.setItem(key, JSON.stringify(store));
//     }

//     return storage;
// }

// // Profile.js
// const profileSetting = createStorage('profileSetting');

// profileSetting.set('fullname', 'Phuc Tai');
// profileSetting.set('age', 28);
// profileSetting.set('address', 'TP. Ho Chi Minh');
// profileSetting.get('fullname');
// profileSetting.get('age');
// profileSetting.get('address');

function createApp() {
    const cars = [];

    return {
        add(car) {
            cars.push(car);
        },
        show() {
            console.log(cars);
        }
    }
}

const app = createApp();

app.add('BMW');
app.add('Toyota');
app.add('Suzuki');
app.add('Mazda');
app.show();