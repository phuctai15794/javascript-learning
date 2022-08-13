// Promise have 3 status:
// 1. Pending
// 2. Fulfilled
// 3. Rejected

var promise = new Promise(
    // Excutor
    function(resolve, reject) {
        // Logic
        // Thành công: resolve()
        // Thất bại: reject()

        resolve('Good job');
        reject('Có lỗi');
    }
);

promise
    .then(function(data) {
        // Called when resolve() is called
        console.log('Successfully: ', data);
    })
    .catch(function(error) {
        // Called when reject() is called
        console.log('Failure: ', error);
    })
    .finally(function() {
        // Called when both of resolve(), reject() is called
        console.log('Done!!!');
    });