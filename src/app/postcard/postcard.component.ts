import { UserService } from './../services/user.service';
import { Post } from './../models/post';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from '../models/comment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.css'],
})
export class PostcardComponent implements OnInit {
  @Input() CurrentPost: Post | undefined;
  currentUser: string = '';
  commentArray: Comment[];

  constructor(
    private userInstance: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.commentArray = [];
  }

  ngOnInit(): void {
    this.currentUser = this.userInstance?.getUserID();
    this.userInstance.GetComment(this.CurrentPost!.postId).subscribe({
      next: (data) => {
        // this.router.navigate(['/Login', { userName: firstname }]);
        this.commentArray = data.map((a: Comment) => ({ ...a }));
        this.commentArray = [...data];

        console.log(this.commentArray);
      },
      error: (err) => {
        // this._snackBar.open(`Error: ${JSON.stringify(err)}`);
        this._snackBar.open(`Error: ${JSON.stringify(err)}`);
      },
    });
  }

  DeletePost() {
    if (window.confirm('Are sure you want to delete this post ?')) {
      this.userInstance.removePost(this.CurrentPost!.postId).subscribe({
        next: (data) => {
          // console.log(localStorage.getItem('token'));
          console.log('Post deleted succesfully');
        },
        error: (err) => {
          console.log('errro');
          this._snackBar.open(`Error: ${JSON.stringify(err)}`);
        },
      });
    }
  }
  goToRedirect() {
    this.router.navigate(['/Edit'], {
      state: {
        postId: this.CurrentPost?.postId,
        name: this.CurrentPost?.title,
        content: this.CurrentPost?.content,
        url: this.CurrentPost?.headerImage,
      },
    });
  }
  MakeCommentRoute() {
    this.router.navigate(['/Comment'], {
      state: {
        value: this.CurrentPost?.postId,
        user: this.CurrentPost?.userId,
      },
    });
  }
}
