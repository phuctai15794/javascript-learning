var users = [
    {
        id: 1,
        name: 'Quang Tran'
    },
    {
        id: 2,
        name: 'Tuyet Tran'
    },
    {
        id: 3,
        name: 'be bong'
    }
]

var comments = [
    {
        id: 1,
        user_id: 1,
        content: 'Mua cho em cai banh my'
    },
    {
        id:2,
        user_id: 2,
        content: 'ok tí tao mua cho'
    },
    {
        id:3,
        user_id:3 ,
        content: 'Oke anh'
    },
  
]

function getComments() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(comments)
        }, 1000);
    });
}

function getUsersByIds(userIds) {
    return new Promise(function(resolve) {
        var result = users.filter(function(user) {
            return userIds.includes(user.id) 
        });

        setTimeout( function(){
            resolve(result)
        }, 1000);
    });
}

getComments()
    .then(function(comments) {
        var userIds = comments.map(function(comment){
            return comment.user_id;
        });

        var users = getUsersByIds(userIds)
                        .then(function(users) {
                            return {
                                usersNew: users,
                                commentsNew: comments
                            }; 
                        });

        return users;
    })
    .then(function(data){
        var commentBlock = document.getElementById('comment-block');
        var html = '';

        data.commentsNew.forEach(comment => {
            var user = data.usersNew.find(function(user){
                return user.id === comment.user_id
            })
            html += `<li>${user.name}: ${comment.content}</li>`
        });

        commentBlock.innerHTML = html;
    });