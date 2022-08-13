function User(Avatar, firstName, lastName) {
    this.hinhNen = Avatar;
    this.ho = firstName;
    this.ten = lastName;
    this.getCommentUser = function () {
      return `${this.comment}`;
    };
    this.getName = function () {
      return `${this.ho} ${this.ten}`;
    };
  }

  var user = new User("avatar", "Phan", "Duy");
  user.comment = "No tien hoc phi 5 trieu";
  var author = new User("avatar", "Dang", "Son");

  console.log(author);
  console.log(author.constructor);
  console.log(author.constructor === User);
  console.log(user.getName());
  console.log(user.getCommentUser());
  console.log(author.getName());