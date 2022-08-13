function User(firstName, lastName, avatar) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatar = avatar;
    this.getName = function(){
        return `${this.firstName} ${this.lastName}`;
    };
};

User.prototype.className = 'F8';
User.prototype.getClassName = function(className) {
    return this.className = className;
}

var author = new User('Tuan', 'Diep', 'Avatar', 'f8');
var user = new User('Son', 'Dang', 'Avatar');

console.log(author);
console.log(user);