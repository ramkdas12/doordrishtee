import { Component } from '@angular/core';

import { DataService } from './data.service';

import { HeaderComponent } from './headerComponent/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Rambo';

  users: Array<any>;

  constructor(private _dataService: DataService) {
    
    this._dataService.getUsers()
    .subscribe(res => {
      this.users = res;
    });

  }

}
