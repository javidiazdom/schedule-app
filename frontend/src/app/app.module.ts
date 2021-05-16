import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RegisterComponent } from './auth/register/register.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskComponent } from './components/task/task.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { BoardsDisplayComponent } from './components/boards-display/boards-display.component';
import { BoardComponent } from './components/board/board.component';
import { CreateJobComponent } from './components/create-job/create-job.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    CreateTaskComponent,
    TaskComponent,
    LogoutComponent,
    BoardsDisplayComponent,
    BoardComponent,
    CreateJobComponent,
    SideBarComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
