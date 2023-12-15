import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';

import { ServiceComponent } from './pages/service/service.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ChatComponent } from './pages/chat/chat.component';
import { LoginComponent } from './pages/login/login.component';
import { NewServiceComponent } from './pages/new-service/new-service.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { RatingsComponent } from './pages/ratings/ratings.component';
import { ServiceProvidedComponent } from './pages/service-provided/service-provided.component';
import { RequestedServiceComponent } from './pages/requested-service/requested-service.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { EditServiceComponent } from './pages/edit-service/edit-service.component';
import { BookServiceComponent } from './pages/book-service/book-service.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'login', component: LoginComponent },
  { path: 'newservice', component: NewServiceComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'ratings', component: RatingsComponent },
  { path: 'service-provided', component: ServiceProvidedComponent },
  { path: 'requested-service', component: RequestedServiceComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'editservice', component: EditServiceComponent },
  { path: 'book-service', component: BookServiceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
