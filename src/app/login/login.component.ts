import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, Observer, of, Subscription } from 'rxjs';
import { AuthenticationService } from '../_services/auth.service';
import { GenericDataModel, Token } from '../_models/token.model'; 
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: any;
  password: any; 
  errorMessage = 'Invalid Credentials';
  successMessage: string | undefined;
  invalidLogin = false;
  loginSuccess = false;
  returnValue: GenericDataModel<Token> | undefined;
  tokenSubscription = new Subscription();

  observer: Observer<GenericDataModel<Token>> = {
    next: (token: GenericDataModel<Token>) => { 
      // mapping 
      this.returnValue = {
        code: token.code,
        data: token.data,
        message: token.message
      } 

      if (this.returnValue.data)
      {
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful.';

        // auto logout
        // this.expirationCounter(this.returnValue.data.expirationTime - new Date().valueOf());
        this.router.navigate(['./home']);
      }
      else{ 
        this.invalidLogin = true;
        this.loginSuccess = false;
      }
    },
    error: (error: Error) => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    },
    complete: () => {console.log("complete")}
  };
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private socialAuthService: SocialAuthService) 
    { }
    
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      sessionStorage.setItem('token', JSON.stringify(user.idToken)); 
      this.router.navigate(['./home']);
    });
  }

  handleLogin(): void {
    this.authenticationService.login(this.username, this.password).subscribe(this.observer);    
  }

  expirationCounter(timeout: number) {
    console.log("expirationCounter: " + timeout);
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
      console.log('EXPIRED!!');
      this.authenticationService.logout();
      this.router.navigate(["/login"]);
    });
  }

}
