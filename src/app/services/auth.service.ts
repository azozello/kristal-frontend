import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  private httpUrl: string = environment.backendUrl;

  constructor(public http: HttpClient, public jwtHelper: JwtHelperService) {

  }

  /**
   * @param token - JWT from the backend
   * Adds user§s JWT to the local storage
   */
  login(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    localStorage.setItem('Authorization', token);
    localStorage.setItem('Role', 'USER');
  }

  logout() {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('Role');
  }

  /**
   * @return String representation of JWT from the local storage
   */
  getToken(): string {
    return localStorage.getItem('Authorization');
  }

  /**
   * @return true if the user is authenticated false if not
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('Authorization');
    return !this.jwtHelper.isTokenExpired(token);
  }


  // /**
  //  *
  //  * @param user model - see shared/models/user.model.ts
  //  * @return Observable from the registration request to the backend
  //  */
  // public registerUser(user: User) {
  //   return this.http.post(this.httpUrl + 'auth/register', user);
  // }


  /**
   * @param email
   * @param password
   * @return Observable from the login request to the backend server
   */
  public loginUser(email: string, password: string): Observable<Object> {
    return this.http.post(this.httpUrl + 'auth/login', {
      email: email,
      password: password
    });
  }
}
