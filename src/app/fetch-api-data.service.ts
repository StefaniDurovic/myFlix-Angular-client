import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://jessica-chastain-movies.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  /**
   * POST to the '/users' endpoint of apiUrl to register a new user.
   *
   * @param userDetails
   * @returns An Observable of type any, which can be subscribed for a response. The response returns an object of type
   * User, if resolved, or an error object, if rejected.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * POST to the '/login' endpoint of apiUrl to login a user.
   *
   * @param userDetails
   * @returns An Observable, which can be subscribed for a response. The response returns an object of type User,
   * if resolved, or an error object, if rejected.
   */
  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * GET request to the '/movies' endpoint of apiUrl to get the full list of movies.
   *
   * @returns An Observable, which can be subscribed for a response. The response returns an object
   * holding data of all the movies, if resolved, or an error object, if rejected.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * GET request to the '/movies/title' endpoint of apiUrl to get the movie with the specified title.
   *
   * @param title
   * @returns An Observable, which can be subscribed for a response. The response returns an object of type Movie, if
   * resolved, or an error object, if rejected.
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * GET request to the '/movies/director/directorName' endpoint of apiUrl to get the information about the specified
   * director.
   *
   * @param directorName
   * @returns An Observable, which can be subscribed for a response. The response returns an object of type Director, if
   * resolved, or an error object, if rejected.
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/director/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * GET request to the '/movies/genre/genreName' endpoint of apiUrl to get the information about the specified genre.
   *
   * @param genreName
   * @returns An Observable, which can be subscribed for a response. The response returns a description of a specified
   * genre, if resolved, or an error object, if rejected.
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * GET request to the '/users/Username' endpoint of apiUrl to get all data from a specific user.
   *
   * @returns An Observable, which can be subscribed for a response. The response returns an object
   * holding data of a specific user, if resolved, or an error object, if rejected.
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * POST request to the '/users/Username/movies' endpoint of apiUrl to get favourite movies of a specified user.
   *
   * @returns An Observable, which can be subscribed for a response. The response returns an object
   * holding data for a specified user, if resolved, or an error object, if rejected.
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(`${apiUrl}users/${username}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * POST request to the '/users/Username/movies/movieId' endpoint of apiUrl to add a movie to the user's favourite movies.
   *
   * @param movieId - ID number of the added movie.
   * @returns An Observable, which can be subscribed for a response. The response returns an object holding data of the
   * ypdated user, if resolved, or an error object, if rejected.
   */
  addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(`${apiUrl}users/${username}/movies/${movieId}`,
        { favoriteMovie: movieId },
    {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * DELETE request to the '/users/Username/movies/movieId' endpoint of apiUrl to remove a movie from the user's
   * favourite movies.
   *
   * @param movieId - ID number of the deleted movie.
   * @returns An Observable, which can be subscribed for a response. The response returns an object
   * holding data of the updated user, if resolved, or an error object, if rejected.
   */
  removeFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * PUT request to the '/users/Username' endpoint of apiUrl to update the user's data.
   *
   * @param updatedUser - an object holding updated user data.
   * @returns An Observable, which can be subscribed for a response. The response returns an object
   * holding data of the updated user, if resolved, or an error object, if rejected.
   */
  updateUser(updatedUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(`${apiUrl}users/${username}`, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * DELETE request to the '/users/Username' endpoint of apiUrl to delete the currently logged-in user.
   *
   * @returns An Observable, which can be subscribed for a response. The response returns a message, if resolved,
   *  or an error message, if rejected.
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


  /**
   * Extracts response data from HTTP response.
   *
   * @param res - response from HTTP response.
   * @returns response body or an empty object.
   */
  private extractResponseData(res: Object): Object {
    const body = res;
    return body || {};
  }

  /**
   * Error handler.
   *
   * @param error
   * @private
   * @returns error message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something happened; please try again later.');
  }
}