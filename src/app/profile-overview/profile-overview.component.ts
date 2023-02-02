import {Component, Input, OnInit} from '@angular/core';
import {UserRegistrationService} from "../fetch-api-data.service";
import {MatDialog} from "@angular/material/dialog";
import {ProfileEditFormComponent} from "../profile-edit-form/profile-edit-form.component";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss']
})
export class ProfileOverviewComponent implements OnInit {
  user: any = {};
  favourites: any[] = [];

  constructor(private fetchApiDataService: UserRegistrationService,
              public dialog: MatDialog,
              public router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getUserInfo();
    // this.showFavourites();
  }

  /**
   * A method that gets the user info of the currently logged-in user.
   *
   * @remarks
   * Makes API call to get user info, changes the format of 'Birthday' property to LocalDateString and sets the user
   * variable to the user object.
   *
   * @returns object with user information.
   */
  getUserInfo() {
    this.fetchApiDataService.getUser().subscribe((result: any) => {
      this.user = {
        ...result,
        Birthday: new Date(result.Birthday).toLocaleDateString()
      };
      return this.user;
    })
  }

  /**
   * A method that opens a form for updating the user info of the currently logged-in user.
   */
  openEditProfileDialog(): void {
    this.dialog.open(ProfileEditFormComponent, {
      width: '280px'
    });
  }

  /**
   * A method that logs out and deletes the currently logged-in user.
   *
   * @remarks
   * Makes API call to delete the user, navigates to the welcome page and removes the user info from localStorage.
   */
  deleteUser() {
    this.router.navigate(['']).then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.snackBar.open('The account has been successfully deleted.', 'OK', {
        duration: 2000
      });
    });
    this.fetchApiDataService.deleteUser().subscribe(result => {
    })
  }

  // showFavourites() {
  //   this.fetchApiDataService.getFavoriteMovies().subscribe((response) => {
  //     console.log(response);
  //     this.favourites = response.FavoriteMovies;
  //   })
  //   return this.favourites;
  // }
}