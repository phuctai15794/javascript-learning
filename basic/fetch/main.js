var postApi = 'https://jsonplaceholder.typicode.com/posts';

fetch(postApi)
    .then(function(response) {
        return response.json();
    })
    .then(function(posts) {
        var htmls = posts.map(function(post) {
            return `<li>${post.title}</li>`;
        });

        var html = htmls.join('');

        document.getElementById("post-block").innerHTML = html;
    })
    .catch(function(error) {
        console.log('Có lỗi !');
    });