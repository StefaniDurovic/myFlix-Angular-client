import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router) {
  }

  /**
   * A method for showing the movies list.
   *
   * @remarks
   * Navigates the user to the home screen, which shows all movies currently in the database.
   */
  showMovies() {
    this.router.navigate(['/movies']);
  }

  /**
   * A method for showing the profile page of the logged-in user.
   *
   * @remarks
   * Navigates the user to the profile overview page, which shows all information of the currently logged-in user and
   * has buttons for updating the user data as well as deleting the profile.
   */
  showMyProfile() {
    this.router.navigate(['/profile-overview']);
  }

  /**
   * A method for logging out the current user.
   *
   * @remarks
   * Navigates the user to the welcome page and clears out localStorage.
   */
  showWelcomeScreen() {
    this.router.navigate(['']);
    localStorage.clear();
  }
}