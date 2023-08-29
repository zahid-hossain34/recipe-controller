import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `${environment.FIREBASE_ATHUNTICATION_URL}accounts:signUp?key=${environment.FIRE_BASE_API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }
  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `${environment.FIREBASE_ATHUNTICATION_URL}accounts:signInWithPassword?key=${environment.FIRE_BASE_API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError({ errorMsg });
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'This email does not exist.';
        break;
      case 'EMAIL_EXISTS':
        errorMsg = 'This email exists already';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'Invalid Password';
        break;
    }
    return throwError(errorMsg);
  }
}