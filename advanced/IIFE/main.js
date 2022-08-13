/**
 * Dùng dấu ; trước IIFE
 * IIFE là hàm private
 */

// Cách 1: Không sử dụng IIFE
const app = {
    cars: [],
    add(car) {
        this.cars.push(car);
    },
    edit(index, car) {
        this.cars[index] = car;
    },
    delete(index) {
        this.cars.splice(index, 1);
    },
    show() {
        console.log(this.cars);
    }
};

app.add('BMW');
app.add('Mazda');
app.add('Ford');
app.add('Toyota');
app.show();

// Không sử dụng IIFE thì vẫn có thể truy cập được các variables của object
app.cars = null;
app.show();

// Cách 2: Sử dụng IIFE
const appIIFE = (() => {
    const cars = [];

    return {
        add(car) {
            cars.push(car);
        },
        edit(index, car) {
            cars[index] = car;
        },
        delete(index) {
            cars.splice(index, 1);
        },
        show() {
            console.log(cars);
        }
    }
})();

appIIFE.add('Honda');
appIIFE.add('Suzuki');
appIIFE.add('Lexus');
appIIFE.add('KIA');
appIIFE.show();

// Sử dụng IIFE thì không thể truy cập được các variables của object
appIIFE.cars = null;
appIIFE.show();