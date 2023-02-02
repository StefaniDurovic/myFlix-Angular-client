import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GenreDialogComponent} from "../genre-dialog/genre-dialog.component";
import {DirectorDialogComponent} from "../director-dialog/director-dialog.component";
import {MovieDetailsDialogComponent} from "../movie-details-dialog/movie-details-dialog.component";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  favourites: any[] = [];
  constructor(public fetchApiData: UserRegistrationService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * A method that shows all movies currently in the database.
   *
   * @remarks
   * Fetches movies via API call and sets the returned array of Movie objects to the movies variable.
   *
   * @returns an array holding movie objects.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
    });
  }

  /**
   * A method that opens a dialog showing more information about the movie genre.
   *
   * @param name - name of the genre.
   * @param description - description of the genre.
   */
  openGenreDialog(name: string, description: string) {
    this.dialog.open(GenreDialogComponent, {
      data: {
        Name: name,
        Description: description
      }
    });
  }


  /**
   * A method that opens a dialog showing more information about the movie director.
   *
   * @param name - name of the director.
   * @param bio - the director's biography.
   * @param birth - the director's year of birth.
   * @param death - the director's year of death, if there's one.
   */
  openDirectorDialog(name: string, bio: string, birth: string, death: string) {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      }
    });
  }

  /**
   * A method that opens a dialog showing more information about the movie.
   *
   * @param name - title of the movie.
   * @param description - description of the movie.
   */
  openMovieDetailsDialog(name: string, description: string) {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        Name: name,
        Description: description
      }
    });
  }

  /**
   * A method that adds/removes a movie into/from the list of favourite movies.
   *
   * @param id - ID of a specific movie.
   *
   * @remarks
   * Checks via ID if the specified movie is already in the list. If not, makes API call to add the forwarded
   * movie ID into the user's list of favourite movies. Otherwise, makes API call to delete the forwarded movie ID from
   * the list. After the API call, the favourites variable is updated with the value of FavoriteMovies property. The
   * snackBar opens to inform the user of the successful addition/removal of the movie to/from the list, otherwise, the
   * snackBar informs the user of error.
   */
  FavouriteMovie(id: string) {
    if (!this.favourites.includes(id)) {
      this.fetchApiData.addFavoriteMovie(id).subscribe((response) => {
        this.favourites = response.FavoriteMovies;
        this.snackBar.open("Movie has been successfully added to favourites!", "OK", {
          duration: 2000
        })
      }, (response) => {
        this.snackBar.open(response.message, "OK", {
          duration: 2000
        })
      })
    } else {
      this.fetchApiData.removeFavoriteMovie(id).subscribe((response) => {
        this.favourites = response.FavoriteMovies;
        this.snackBar.open("Movie has been successfully removed from favourites.", "OK", {
          duration: 2000
        })
      }, (response) => {
        this.snackBar.open(response.message, "OK", {
          duration: 2000
        });
      })
    }
  }

  /**
   * A method that gets a list of current user's favourite movies.
   *
   * @remarks
   * Fetches the user info via API call and sets the value of property FavoriteMovies of the returned User object to the
   * favourites variable.
   *
   * @returns an array of movieIDs.
   */
  getFavouriteMovies() {
    this.fetchApiData.getUser().subscribe((response) => {
      this.favourites = response.FavoriteMovies;
      return this.favourites;
    })
  }
}