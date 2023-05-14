import { CommentComponent } from './comment/comment.component';
import { NewpostComponent } from './newpost/newpost.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewuserComponent } from './newuser/newuser.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthgService } from './services/authg.service';
import { EditpostComponent } from './editpost/editpost.component';
import { EditaccountComponent } from './editaccount/editaccount.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'NewUser',
    component: NewuserComponent,
  },
  {
    path: 'NewPost',
    component: NewpostComponent,
    canActivate: [AuthgService],
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Edit',
    component: EditpostComponent,
  },
  {
    path: 'Comment',
    component: CommentComponent,
  },

  {
    path: 'EditAccount',
    component: EditaccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
