import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile-overview', component: ProfileOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
