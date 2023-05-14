import { Router } from '@angular/router';
import { User } from './../models/user';
import { UserService } from './../services/user.service';
import { WebcommService } from './../services/webcomm.service';
import { Component, OnInit } from '@angular/core';
import { Token } from '../models/token';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: string = '';
  constructor(private UserIntance: UserService, private router: Router) {}
  currentUser: Token | undefined;
  ngOnInit(): void {
    this.currentUser = this.UserIntance.GetCurrentUser();
    this.user = this.UserIntance.getUserID();
    this.UserIntance.userLoggedIn.subscribe((data) => {
      if (data) {
        this.currentUser = this.UserIntance.GetCurrentUser();
      } else {
        this.currentUser = undefined;
        this.router.navigate(['/']);
      }
    });
  }

  LogoutUser() {
    this.UserIntance.LogoutUser();

    this.router.navigate(['/']);
    // currentUser: null;
  }
}
