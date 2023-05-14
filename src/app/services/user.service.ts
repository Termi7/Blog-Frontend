import { Post } from './../models/post';
import { environment } from './../../environments/environment';
import { Token } from './../models/token';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from '../models/user';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  @Output() userLoggedIn = new EventEmitter<boolean>();
  currentUser: Token | undefined;
  constructor(private httpClient: HttpClient) {
    let tokenInstance = localStorage.getItem('token');

    if (tokenInstance) {
      this.currentUser = JSON.parse(tokenInstance);
    }
  }

  Login(userId: string, pwd: string) {
    return this.httpClient.get<Token>(
      `${environment.serverEndpoint}Users/${userId}/${pwd}`
    );
  }

  SetcurrentUser(token: Token) {
    this.currentUser = token;

    localStorage.setItem('token', JSON.stringify(token));
    this.userLoggedIn.emit(true);
  }
  getUserID() {
    // let tokenU = JSON.parse(localStorage.getItem('token') ?? '');
    if (this.currentUser !== undefined) {
      let decoded: any = jwt_decode(this.currentUser.token);
      // console.log(decoded.UserData.userId);
      console.log(decoded.data?.userId);
      return decoded.data?.userId;
      // return decoded.UserData?.userId;
      // UserData
    }
    // let decoded: any = jwt_decode(this.currentUser.token);
    // console.log(decoded.data.userId);
    // return decoded.data.userId;
  }

  GetCurrentUser() {
    return this.currentUser;
  }
  // GetUser() {
  //   return this.userArray;
  // }

  // AddUser(user: User) {
  //   this.userArray.push(user);
  // }

  LogoutUser() {
    this.currentUser = undefined;
    this.userLoggedIn.emit(false);
  }

  // GetPost() {
  //   return this.postArray;
  // }

  GetPost() {
    return this.httpClient.get<any>(`${environment.serverEndpoint}Posts`);
  }

  GetComment(postId: Number) {
    return this.httpClient.get<any>(
      `${environment.serverEndpoint}Comments/${postId}`
    );
  }
  AddComment(comment: String, userId: String, postId: Number) {
    let mytoken = JSON.parse(localStorage.getItem('token') ?? '');
    var header = {
      headers: new HttpHeaders().set('Authorization', `${mytoken.token}`),
    };
    console.log(header);
    let commentValue = {
      comment: comment,
    };
    return this.httpClient.post<any>(
      `${environment.serverEndpoint}Comments/${postId}`,
      commentValue,
      header
    );
  }

  patchPost(
    title: String,
    content: String,
    headerImage: String,
    postId: Number
  ) {
    // var user = this.getUserID();
    let mytoken = JSON.parse(localStorage.getItem('token') ?? '');
    var header = {
      headers: new HttpHeaders().set('Authorization', `${mytoken.token}`),
    };
    console.log(header);
    let patchValue = {
      title: title,
      content: content,
      headerImage: headerImage,
    };
    return this.httpClient.patch<any>(
      `${environment.serverEndpoint}Posts/${postId}`,
      patchValue,
      header
    );
  }

  removePost(postId: Number) {
    let mytoken = JSON.parse(localStorage.getItem('token') ?? '');
    var header = {
      headers: new HttpHeaders().set('Authorization', `${mytoken.token}`),
    };

    return this.httpClient.delete(
      `${environment.serverEndpoint}Posts/${postId}`,

      header
    );
  }

  // AddPost(post: Post) {
  //   this.postArray.push(post);
  // }
  // AddPost(post: Post) {
  AddPost(title: String, content: String, headerImage: String) {
    let mytoken = JSON.parse(localStorage.getItem('token') ?? '');
    var header = {
      headers: new HttpHeaders().set('Authorization', `${mytoken.token}`),
    };
    console.log(header);
    let postValue = {
      title: title,
      content: content,
      headerImage: headerImage,
    };
    console.log(postValue);
    return this.httpClient.post<any>(
      `${environment.serverEndpoint}Posts`,
      postValue,
      header
    );
  }

  CreateHandler(
    userId: String,
    firstname: String,
    lastname: String,
    emailAddress: String,
    password: String
  ) {
    let newUser = {
      userId: userId,
      firstName: firstname,
      lastName: lastname,
      emailAddress: emailAddress,
      password: password,
    };
    console.log(newUser);

    return this.httpClient.post<User>(
      `${environment.serverEndpoint}Users`,
      newUser
    );
  }

  UpdateHandler(
    firstname: String,
    lastname: String,
    emailAddress: String,
    userId: String
  ) {
    let newUser = {
      firstName: firstname,
      lastName: lastname,
      emailAddress: emailAddress,
    };
    let mytoken = JSON.parse(localStorage.getItem('token') ?? '');
    var header = {
      headers: new HttpHeaders().set('Authorization', `${mytoken.token}`),
    };
    console.log(newUser);

    return this.httpClient.patch<User>(
      `${environment.serverEndpoint}Users/${userId}`,
      newUser,
      header
    );
  }
}
