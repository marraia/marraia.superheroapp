import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/providers/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  //emailModel = 'demo@vien.com';
  //passwordModel = 'demovien1122';
  public emailModel: string;
  public passwordModel: string;

  buttonDisabled = false;
  buttonState = '';
  constructor(
    private authService: AuthenticationService, 
    private router: Router
) { }

ngOnInit() {
}

onSubmit() {
  if (!this.loginForm.valid || this.buttonDisabled) {
    return;
  }
  this.buttonDisabled = true;
  this.buttonState = 'show-spinner';

  this.authService
    .login(this.emailModel, this.passwordModel)
    .subscribe((user) => {
      this.router.navigate(['/hero']);
    }, (error) => {
      this.buttonDisabled = false;
      this.buttonState = '';
    });
}

}
