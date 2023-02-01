import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {
  }

  showMovies() {
    this.router.navigate(['/movies']);
  }

  showMyProfile() {
    this.router.navigate(['/profile-overview']);
  }

  showWelcomeScreen() {
    this.router.navigate(['']);
  }
}
