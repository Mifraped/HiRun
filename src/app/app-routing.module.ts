import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { CalendarComponent } from './pages/calendar/calendar.component';
import { ChatComponent } from './pages/chat/chat.component';
import { LoginComponent } from './pages/login/login.component';
import { NewServiceComponent } from './pages/new-service/new-service.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "calendar", component: CalendarComponent},
  {path: "chat", component: ChatComponent},
  {path: "login", component: LoginComponent},
  {path: "new-service", component: NewServiceComponent},
  {path: "profile", component: ProfileComponent},
  {path: "register", component: RegisterComponent},
  {path: "preferences", component: PreferencesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

