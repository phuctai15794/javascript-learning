var promise1 = new Promise(resolve => {
    setTimeout(function() {
        resolve([1, 2]);
    }, 2000)
});

var promise2 = new Promise(resolve => {
    setTimeout(function() {
        resolve([3, 4]);
    }, 4000)
});

Promise.all([promise1, promise2])
    .then((result) => {
        console.log(result);
    });