import { Component } from '@angular/core';

import { HomeTopicsService } from './../home-topics.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  topProject = null;
  latestBlogs = null;
  featuredProjects = null;
  showSpinner = true;
  constructor (private _homeService: HomeTopicsService) {
    this._homeService.getHomeTopics()
    .subscribe(res => {
      console.log(res);
      this.topProject = res[0]['topProject'];
      this.latestBlogs = res[0]['latestBlogs'];
      this.featuredProjects = res[0]['featuredProjects'];
      this.showSpinner = false;
    });
  }

}
