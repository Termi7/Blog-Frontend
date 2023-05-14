import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-editaccount',
  templateUrl: './editaccount.component.html',
  styleUrls: ['./editaccount.component.css'],
})
export class EditaccountComponent implements OnInit {
  registrationFormGrp = new FormGroup({
    frmFName: new FormControl('', [Validators.required]),
    frmLName: new FormControl('', [Validators.required]),
    frmemailAddress: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
  });
  tooltipBtn = `Click here to udpdate User`;
  constructor(
    private _snackBar: MatSnackBar,
    private UserInstance: UserService,
    private titleSvc: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.registrationFormGrp.setValue({
    //   frmFName: ,
    //   frmLName: ,
    //   frmemailAddress:
    // });;
  }

  UpdateUser() {
    this.registrationFormGrp.markAllAsTouched();
    if (this.registrationFormGrp.valid) {
      let firstname = this.registrationFormGrp.get('frmFName')?.value;
      let lastname = this.registrationFormGrp.get('frmLName')?.value;
      let email = this.registrationFormGrp.get('frmemailAddress')?.value;

      if (firstname && lastname && email) {
        this.UserInstance.UpdateHandler(
          firstname,
          lastname,
          email,
          this.UserInstance.getUserID()
        ).subscribe({
          next: (data) => {
            this._snackBar.open(
              `User: ${data.firstName} has been udpated successfully`,
              'Close',
              { duration: 3000 }
            );
            console.log(data);
            this.router.navigate(['/']);
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
}
