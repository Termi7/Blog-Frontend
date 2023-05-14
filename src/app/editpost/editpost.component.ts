import { UserService } from './../services/user.service';

import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { Title } from '@angular/platform-browser';
import { Navigation, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css'],
})
export class EditpostComponent implements OnInit {
  editPost: Post;
  postnumber: number = 0;
  postname: string = '';
  postcontent: string = '';
  posturl: string = '';
  constructor(
    private PostInstance: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.editPost = new Post(1, '', '', '', '', '', '');
    // this.postnumber = this.router.getCurrentNavigation().extras.state.value;
  }

  ngOnInit(): void {
    this.postnumber = history.state.postId;
    this.postcontent = history.state.content;
    this.postname = history.state.name;
    this.posturl = history.state.url;
    console.log(this.postcontent);
    console.log(this.posturl);
    console.log(this.postname);

    this.editPost = new Post(
      this.postnumber,
      '',
      this.postname,
      this.postcontent,
      '',
      this.posturl,
      ''
    );
  }

  EditPost() {}

  EditAPost(editPost: Post) {
    this.PostInstance.patchPost(
      this.editPost.title,
      this.editPost.content,
      this.editPost.headerImage,
      this.postnumber
    ).subscribe({
      next: (data) => {
        console.log('Post updated succesfully');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('errro');
        this._snackBar.open(`Error: ${JSON.stringify(err)}`);
      },
    });
  }
}
