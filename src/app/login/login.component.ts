import { NgIfContext } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userSvc: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  userID = '';
  password = '';
  errorOccured = false;
  ngOnInit(): void {}

  Login() {
    this.userSvc.Login(this.userID, this.password).subscribe({
      next: (data) => {
        this.userSvc.SetcurrentUser(data);
        this.router.navigate(['/']);
        console.log(data);
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(`Error: ${JSON.stringify(err)}`);
      },
      complete: () => {
        console.log('Complete');
      },
    });

    //   let result = this.userSvc.Login(this.userID, this.password);
    //   console.log(result);
    //   if (result) {
    //     this.router.navigate(['/']);
    //   } else {
    //     this.errorOccured = true;
    //   }
    // }
  }
}
