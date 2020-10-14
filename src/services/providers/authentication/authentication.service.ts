import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserLogged } from 'src/services/models/userLogged';
import { ProviderService } from '../provider.service';
import * as jwt_decode from 'jwt-decode'
import { UserLogin } from 'src/services/models/userLogin';
import { map } from 'rxjs/operators'
import { Auth } from '../../models/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService extends ProviderService{
private http: HttpClient;
private currentUserSubject: BehaviorSubject<Auth>;
public currentUser: Observable<Auth>;
  
  constructor(_http: HttpClient) 
  { 
    super("login");
    this.http = _http;
    this.currentUserSubject = new BehaviorSubject<Auth>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser= this.currentUserSubject.asObservable();
  }

  public get currentUserValue() : Auth {
    return this.currentUserSubject.value;
  }

  public get userInformations(): UserLogged {
    try {
      return jwt_decode(localStorage.getItem('currentUser'));
    } catch(Error)
    {
      return null;
    }
  }

  login(username: string, password: string)
  {
    var userLogin = new UserLogin(username, password);
    var data = JSON.stringify(userLogin);

    return this.http.post<any>(`${this.url}`, JSON.parse(data),{})
            .pipe(map(user => {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
            }))
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


}
