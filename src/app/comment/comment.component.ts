import { UserService } from './../services/user.service';
import { Comment } from './../models/comment';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  newComment: Comment;
  postnumber: Number = 0;
  usernumber: String = '';

  constructor(
    private commentInstance: UserService,
    private titleSvc: Title,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.newComment = new Comment(0, '', '', 0, '');
    this.titleSvc.setTitle('Add new Comment');
  }

  ngOnInit(): void {
    this.postnumber = history.state.value;
    this.usernumber = history.state.user;
  }

  MakeMeAComment(comment: Comment) {
    this.commentInstance
      .AddComment(this.newComment.comment, this.usernumber, this.postnumber)
      .subscribe({
        next: (data) => {
          console.log('Comment added succesfully');
          this.router.navigate(['/']);
          // alert('Post created succesfully');
        },
        error: (err) => {
          console.log('errro');
          this._snackBar.open(`Error: ${JSON.stringify(err)}`);
        },
      });
  }
}
