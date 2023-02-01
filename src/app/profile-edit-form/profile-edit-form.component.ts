import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrls: ['./profile-edit-form.component.scss']
})
export class ProfileEditFormComponent implements OnInit{
  user: any = {};

  @Input() userUpdatedData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(public fetchApiData: UserRegistrationService,
              public dialogRef: MatDialogRef<ProfileEditFormComponent>,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

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
