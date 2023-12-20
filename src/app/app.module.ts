import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http' 
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ChatComponent } from './pages/chat/chat.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewBusinessComponent } from './pages/new-business/new-business.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RegForm1Component } from './components/reg-form1/reg-form1.component';
import { RegForm2Component } from './components/reg-form2/reg-form2.component';
import { RegForm3Component } from './components/reg-form3/reg-form3.component';
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { FormsModule } from '@angular/forms';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { RatingsComponent } from './pages/ratings/ratings.component';
import { ServiceProvidedComponent } from './pages/service-provided/service-provided.component';
import { RequestedServiceComponent } from './pages/requested-service/requested-service.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { BusinessComponent } from './pages/business/business.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { ServiceRatingComponent } from './components/service-rating/service-rating.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProfileBusinessCardComponent } from './components/profile-business-card/profile-business-card.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { EditBusinessComponent } from './pages/edit-business/edit-business.component';
import { TimeframeModalComponent } from './components/timeframe-modal/timeframe-modal.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import { StarRatingModule } from 'angular-star-rating';
import { RatingCardComponent } from './components/rating-card/rating-card.component';

import { ResultsComponent } from './pages/results/results.component';
import { FiltersComponent } from './components/filters/filters.component';
import { HeaderNavbarService } from './shared/header-navbar.service';
import { CommonModule } from '@angular/common';

import { BookServiceComponent } from './pages/book-service/book-service.component';
import { OrderByComponent } from './components/order-by/order-by.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChatCardComponent } from './components/chat-card/chat-card.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ChatComponent,
    CalendarComponent,
    ProfileComponent,
    NewBusinessComponent,
    SearchBarComponent,
    HeaderComponent,
    NavBarComponent,
    RegForm1Component,
    RegForm2Component,
    RegForm3Component,
    PreferencesComponent,
    BusinessComponent,
    BusinessCardComponent,
    ServiceRatingComponent,
    ResultsComponent,
    FiltersComponent,
    EditBusinessComponent,
    EditProfileComponent,
    RatingsComponent,
    ServiceProvidedComponent,
    RequestedServiceComponent,
    FavoritesComponent,
    RatingCardComponent,
    BookServiceComponent,
    OrderByComponent,

    ChatCardComponent,
    ChatPageComponent,

    ServiceCardComponent,
    TimeframeModalComponent,
    ProfileBusinessCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    FullCalendarModule,
    StarRatingModule.forRoot(),
    CommonModule,
    MatDialogModule,
    HttpClientModule
  ],

  providers: [HeaderNavbarService],
  bootstrap: [AppComponent],
})
export class AppModule {}
