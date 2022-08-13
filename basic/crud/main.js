var listCoursesBlock = document.querySelector('.courses__list');
var courseApi = 'http://localhost:3000/courses';

// Start
function startCourse() {
    getCourses(renderCourse);
    handleCreateCourse();
}

// Run start
startCourse();

// Get courses
function getCourses(callback) {
    fetch(courseApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(error) {
            console.log(error);
        });
}

// Create course
function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(courseApi, options)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(error) {
            console.log(error);
        });
}

// Update course
function updateCourse(data, id) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(courseApi + '/' + id, options)
        .then(function(response) {
            alert('Cập nhật dữ liệu thành công');
        })
        .catch(function(error) {
            console.log(error);
        });
}

// Delete course
function deleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(courseApi + '/' + id, options)
        .then(function(response) {
            listCoursesBlock.querySelector(`li[id="${id}"]`).remove();
        })
        .catch(function(error) {
            console.log(error);
        });
}

// Handle create course
function handleCreateCourse() {
    var btnCreate = document.querySelector("#create");

    btnCreate.onclick = function() {
        var name = document.getElementById("name").value;
        var description = document.getElementById("description").value;

        if (!name || !description) {
            alert('Vui lòng nhập đầy đủ dữ liệu');
            return false;
        } else {
            var formData = {
                name: name,
                description: description
            };
            
            // Create course
            createCourse(formData, loadCourse);
        }
    }
}

// Handle delete course
function handleDeleteCourse(id) {
    if(confirm('Bạn muốn xóa khóa học này ?')) {
        // Delete course
        deleteCourse(id);
    }
}

// Handle update course
function handleUpdateCourse(id) {
    if(confirm('Bạn muốn cập nhật khóa học này ?')) {
        var name = listCoursesBlock.querySelector(`li[id="${id}"]`).querySelector('.courses__list__item__name').innerText;
        var description = listCoursesBlock.querySelector(`li[id="${id}"]`).querySelector('.courses__list__item__description').innerText;

        if (!name || !description) {
            alert('Vui lòng nhập đầy đủ dữ liệu');
            return false;
        } else {
            var formData = {
                name: name,
                description: description
            };
            
            // Update course
            updateCourse(formData, id);
        }
    }
}

// Render course
function renderCourse(courses) {
    var htmls = '';

    htmls = courses.map(function(course) {
        return templateCourse(course);
    });

    listCoursesBlock.innerHTML = htmls.join('');
}

// Load course
function loadCourse(course) {
    var parse = new DOMParser();
    var html = templateCourse(course);
    html = parse.parseFromString(html, 'text/html');
    html = html.body.querySelectorAll(".courses__list__item");

    for (let index = 0; index < html.length; index++) {
        listCoursesBlock.appendChild(html[index]);
    }
}

// Template course
function templateCourse(data) {
    return `
        <li class="courses__list__item" id="${data.id}">
            <h4 class="courses__list__item__name" contenteditable="true">${data.name}</h4>
            <p class="courses__list__item__description" contenteditable="true">${data.description}</p>
            <button onclick="handleDeleteCourse(${data.id})">Xóa</button>
            <button onclick="handleUpdateCourse(${data.id})">Cập nhật</button>
        </li>
    `;
}