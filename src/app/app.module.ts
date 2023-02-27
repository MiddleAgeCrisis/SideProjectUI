import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component'; 
import { SocialLoginModule, GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,  
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('321363163144-rnarkev56clip7tfhg4j5260otiq78pd.apps.googleusercontent.com') 
        }
      ],
      onError: (err: any) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig
  },
  httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
