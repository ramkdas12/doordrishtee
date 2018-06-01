import { Component } from '@angular/core';

import { DataService } from './../data.service';
import { error } from 'protractor';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  topProject = null;
  latestBlogs = null;
  featuredProjects = null;

  showSpinner = true;
  serviceError = false;

  constructor(private _dataService: DataService) {
    this._dataService.getData('getHomeTopics')
      .subscribe(
        success => {
        if (success['status'] === 200 && success['data']) {
          this.topProject = success['data'][0]['topProject'];
          this.latestBlogs = success['data'][0]['latestBlogs'];
          this.featuredProjects = success['data'][0]['featuredProjects'];
          this.showSpinner = false;
        } else {
          this.showSpinner = false;
          this.serviceError = true;
        }
        console.log(success);
      },
      error => {
        console.log(error);
      }
    );
  }

}
