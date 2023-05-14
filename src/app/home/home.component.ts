import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Title } from '@angular/platform-browser';
import { Post } from '../models/post';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  myUserArray: Post[];

  constructor(
    private postInstance: UserService,
    private titleSvs: Title,
    private _snackBar: MatSnackBar
  ) {
    this.myUserArray = [];
  }

  ngOnInit(): void {
    // this.myUserArray =
    this.postInstance.GetPost().subscribe({
      next: (data) => {
        // this.router.navigate(['/Login', { userName: firstname }]);

        this.myUserArray = data.map((a: Post) => ({ ...a }));
        this.myUserArray = [...data];
        // let arrClone = [...arr];
        console.log(this.myUserArray);
        // alert('comment found');
      },
      error: (err) => {
        this._snackBar.open(`Error: ${JSON.stringify(err)}`);
      },
    });

    this.titleSvs.setTitle('Home Page');
    // this.postInstance.SetcurrentUser(
    //   JSON.parse(localStorage.getItem('token') ?? '')
    // );
  }
}
