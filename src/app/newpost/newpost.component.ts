import { UserService } from './../services/user.service';

import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css'],
})
export class NewpostComponent implements OnInit {
  newPost: Post;
  constructor(
    private PostInstance: UserService,
    private titleSvc: Title,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.newPost = new Post(1, '', '', '', '', '', '');
    this.titleSvc.setTitle('New Post');
  }

  ngOnInit(): void {
    // this.PostInstance.AddPost(Post).subscribe;
  }
  MakeMeAPost(post: Post) {
    // this.PostInstance.AddPost(this.newPost);
    this.PostInstance.AddPost(
      this.newPost.title,
      this.newPost.content,
      this.newPost.headerImage
    ).subscribe({
      next: (data) => {
        console.log(localStorage.getItem('token'));
        // alert('Post created succesfully');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('errro');
        this._snackBar.open(`Error: ${JSON.stringify(err)}`);
      },
    });

    // alert('User Added');
  }
}
