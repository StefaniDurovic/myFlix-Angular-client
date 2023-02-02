import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {UserRegistrationService} from "../fetch-api-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * A method for logging in.
   *
   * @remarks
   * Makes API call to log in the user, if successful, opens snackBar to inform the user of successful login, closes the
   * login dialog and routes the user to the home page, else, opens snackBar to show the error message.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        console.log(result);
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token)
        this.dialogRef.close();
        this.snackBar.open("Successful login.", 'OK', {
          duration: 2000
        });
        this.router.navigate(['/movies'])
      }, (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      })
  }

}