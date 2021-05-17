import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from '../auth/login/login.component';
import { RegisterComponent} from "../auth/register/register.component";
import { MainPageComponent } from "../pages/main-page/main-page.component";
import { EditProfileComponent } from "../auth/edit-profile/edit-profile.component";



const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: `login`, component: LoginComponent},
  {path: `register`, component: RegisterComponent},
  {path: 'boards', component: MainPageComponent },
  {path: 'boards/:boardName', component: MainPageComponent },
  {path: 'boards/:boardId/:taskId', component: MainPageComponent },
  {path: 'edit-profile', component: EditProfileComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
