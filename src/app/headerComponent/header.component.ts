import { Component } from '@angular/core';

@Component({
  selector: 'dHeader',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  links = [
    {
      'title': 'Home',
      'link': ''
    },
    {
      'title': 'About',
      'link': ''
    },
    {
      'title': 'Projects',
      'link': ''
    },
    {
      'title': 'Blog',
      'link': ''
    },
    {
      'title': 'Contact',
      'link': ''
    }
  ];

  constructor() {

  }

}
