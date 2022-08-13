var promise = new Promise(
    function(resolve, reject) {
        resolve();
    }
);

promise
    .then(function() {
        return 1;
    })
    .then(function(data) {
        return ++data;
    })
    .then(function(data) {
        return ++data;
    })
    .then(function(data) {
        // If return a Promise. Js will return data after Promise is done 
        return new Promise(
            function(resolve) {
                setTimeout(function() {
                    resolve(data)
                }, 3000)
            }
        )
    })
    .then(function(data) {
        console.log(data);
    })
    .catch(function(error) {
        console.log(error);
    });