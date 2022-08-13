const obj = {
    name: 'Alice',
    cat1: {
        name: 'Dinah 1',
        cat2: {
            name: 'Dinah 2',
            cat3: {
                name: 'Dinah 3'
            }
        }
    },
    sub: {
        name: ['sub1', 'sub2'],
        price: [1000, 2000]
    },
    getName(value) {
        console.log(value);
    }
};

console.log(obj.cat1.cat2.cat3?.name);
console.log(obj.sub.name?.[2]);
obj.getName?.(123);