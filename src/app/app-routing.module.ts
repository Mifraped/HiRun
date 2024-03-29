import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { BusinessComponent } from './pages/business/business.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ChatComponent } from './pages/chat/chat.component';
import { LoginComponent } from './pages/login/login.component';
import { NewBusinessComponent } from './pages/new-business/new-business.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ResultsComponent } from './pages/results/results.component';
import { FiltersComponent } from './components/filters/filters.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { RatingsComponent } from './pages/ratings/ratings.component';
import { ServiceProvidedComponent } from './pages/service-provided/service-provided.component';
import { RequestedServiceComponent } from './pages/requested-service/requested-service.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

import { EditBusinessComponent } from './pages/edit-business/edit-business.component';
import { BookServiceComponent } from './pages/book-service/book-service.component';

import { OrderByComponent } from './components/order-by/order-by.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { ChatResolver } from './resolvers/chat.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'login', component: LoginComponent },
  { path: 'new-business', component: NewBusinessComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'profile/:id_user', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'ratings/:id_user', component: RatingsComponent },
  { path: 'service-provided/:id_user', component: ServiceProvidedComponent },
  { path: 'requested-service', component: RequestedServiceComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'business/:id_business', component: BusinessComponent },
  { path: 'edit-business/:id_business', component: EditBusinessComponent },
  // { path: 'book-service', component: BookServiceComponent },
  {
    path: 'book-service/:id_business/:id_service',
    component: BookServiceComponent,
  },

  { path: 'results', component: ResultsComponent },
  { path: 'filters', component: FiltersComponent },
  { path: 'order-by', component: OrderByComponent },
  { path: 'chat-page', component: ChatPageComponent },
  {
    path: 'chat-page',
    component: ChatPageComponent,
    resolve: {
      chat: ChatResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
