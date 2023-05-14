import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css'],
})
export class NewuserComponent implements OnInit {
  // newUser: User;
  registrationFormGrp = new FormGroup({
    frmUserId: new FormControl('', [Validators.required]),
    frmFName: new FormControl('', [Validators.required]),
    frmLName: new FormControl('', [Validators.required]),
    frmemailAddress: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    frmPassword: new FormControl('', [Validators.required]),
  });
  tooltipBtn = 'Click here to register';
  constructor(
    private _snackBar: MatSnackBar,
    private UserInstance: UserService,
    private titleSvc: Title,
    private router: Router
  ) {
    // this.newUser = new User('', '', '', '', '');
    this.titleSvc.setTitle('New User');
  }

  ngOnInit(): void {}
  // MakeMeAUser() {
  //   this.UserInstance.AddUser(this.newUser);
  //   alert('User Added');
  // }
  RegisterUser() {
    // var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // let emailv: any = this.registrationFormGrp.get('frmemailAddress')?.value;
    // if (!emailv.test(mailformat)) {
    //   this._snackBar.open('Email address is not valid', 'Close', {
    //     horizontalPosition: 'center',
    //     verticalPosition: 'top',
    //   });
    // }
    this.registrationFormGrp.markAllAsTouched();
    if (this.registrationFormGrp.valid) {
      let user = this.registrationFormGrp.get('frmUserId')?.value;
      let firstname = this.registrationFormGrp.get('frmFName')?.value;
      let lastname = this.registrationFormGrp.get('frmLName')?.value;
      let email = this.registrationFormGrp.get('frmemailAddress')?.value;
      let password = this.registrationFormGrp.get('frmPassword')?.value;

      if (user && firstname && lastname && email && password) {
        this.UserInstance.CreateHandler(
          user,
          firstname,
          lastname,
          email,
          password
        ).subscribe({
          next: (data) => {
            this._snackBar.open(
              `User: ${data.firstName} has been created successfully`,
              'Close',
              { duration: 3000 }
            );
            this.router.navigate(['/Login', { userName: firstname }]);
          },
          error: (err) => {
            this._snackBar.open(`Error: ${JSON.stringify(err)}`);
          },
        });
      }
    } else {
      this._snackBar.open('All fields are required!', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  Clear() {
    this.registrationFormGrp.reset();
  }
  RedirectLogin() {
    this.router.navigate(['/Login']);
  }
}
