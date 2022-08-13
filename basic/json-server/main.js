var coursesApi = 'http://localhost:3000/courses';

fetch(coursesApi)
    .then(function(response) {
        return response.json();
    })
    .then(function(courses) {
        var htmls = courses.map(function(course) {
            return `<li>${course.name}</li>`;
        });

        var html = htmls.join('');

        document.getElementById("course-block").innerHTML = html;
    })
    .catch(function(error) {
        console.log('Có lỗi !');
    });