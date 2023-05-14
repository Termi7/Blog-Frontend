export class User {
  userId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;

  constructor(
    userId: string,
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAddress = emailAddress;
    this.password = password;
  }

  //  You can use this to skip returning the password property in the JSON calls

  // skipPassword() {
  //   let pwdLess = new User('', '', '', '', '');
  //   Object.assign(pwdLess, this);
  //   let returnObj = <any>pwdLess;
  //   delete returnObj.password;
  //   return returnObj;
  // }

  // skipPassword() {
  //   return {
  //     userId: this.userId,
  //     firstName: this.firstName,
  //     lastName: this.lastName,
  //     emailAddress: this.emailAddress,
  //   };
  // }
}
