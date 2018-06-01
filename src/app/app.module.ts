//basic modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';

//for animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//main app component
import { AppComponent } from './app.component';

//For HTTP requests
import { HttpModule } from '@angular/http';

import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

//Ui components
import { NgZorroAntdModule } from 'ng-zorro-antd';

/** register language package **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
import { NZ_I18N, en_US } from 'ng-zorro-antd';

//services for data transfer
import { DataService } from './data.service';

//header and section 
import { HeaderComponent } from './headerComponent/header.component';
import { SectionComponent } from './sectionComponent/section.component';

//various views
import { HomeComponent } from './homeComponent/home.component';
import { AboutComponent } from './aboutComponent/about.component';
import { ProjectComponent } from './projectComponent/project.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ContactComponent } from './contact/contact.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

//routes
const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'projects',
    component: ProjectComponent
  },
  {
    path: 'blogs',
    component: BlogsComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  }, {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: SignupComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SectionComponent,
    HomeComponent,
    AboutComponent,
    ProjectComponent,
    BlogsComponent,
    ContactComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
