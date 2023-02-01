import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';
import { ProfileEditFormComponent } from '../profile-edit-form/profile-edit-form.component';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss']
})
export class ProfileOverviewComponent implements OnInit {

  user: any = {};
  
    constructor(private fetchApiDataService: UserRegistrationService,
                public dialog: MatDialog,
                public router: Router,
                public snackBar: MatSnackBar) {
    }
  
    ngOnInit() {
      this.getUserInfo();
    }
  
    getUserInfo() {
      this.fetchApiDataService.getUser().subscribe((result: any) => {
        this.user = {
          ...result,
          Birthday: new Date(result.Birthday).toLocaleDateString()
        };
        return this.user;
      })
    }
  
    openEditProfileDialog(): void {
      this.dialog.open(ProfileEditFormComponent, {
        width: '280px'
      });
    }
  
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
}
