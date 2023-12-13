import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ChatComponent } from './pages/chat/chat.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewServiceComponent } from './pages/new-service/new-service.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RegForm1Component } from './components/reg-form1/reg-form1.component';
import { RegForm2Component } from './components/reg-form2/reg-form2.component';
import { RegForm3Component } from './components/reg-form3/reg-form3.component';
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ChatComponent,
    CalendarComponent,
    ProfileComponent,
    NewServiceComponent,

    SearchBarComponent,

    HeaderComponent,
    NavBarComponent,

    RegForm1Component,
    RegForm2Component,
    RegForm3Component,
    HeaderComponent,
    NavBarComponent,
    PreferencesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
