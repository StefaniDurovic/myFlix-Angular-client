import {Component, Input, OnInit} from '@angular/core';
import {UserRegistrationService} from "../fetch-api-data.service";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrls: ['./profile-edit-form.component.scss']
})
export class ProfileEditFormComponent implements OnInit {

  user: any = {};

  @Input() userUpdatedData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(public fetchApiData: UserRegistrationService,
              public dialogRef: MatDialogRef<ProfileEditFormComponent>,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  /**
   * A method that updates the user info of the currently logged-in user.
   *
   * @remarks
   * Makes API call to update the user info of the currently logged-in user, resets the localStorage, opens snackBar to
   * inform the user of successful update, closes the dialog and reloads the profile page.
   */
  editUser() {
    this.fetchApiData.updateUser(this.userUpdatedData).subscribe((response) => {
      localStorage.setItem('user', response.Username);
      this.dialogRef.close();
      this.snackBar.open("You have successfully updated your profile!", 'OK', {
        duration: 4000
      });
      window.location.reload();
    }
    );
  }
}