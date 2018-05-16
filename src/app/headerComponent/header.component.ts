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
      'link': '',
      'subLinks': [
        {
          'title': 'Project 1',
          'link': ''
        },
        {
          'title': 'Project 2',
          'link': ''
        }
      ]
    },
    {
      'title': 'Blog',
      'link': '',
      'subLinks': [
        {
          'title': 'Blog 1',
          'link': ''
        },
        {
          'title': 'Blog 2',
          'link': ''
        }
      ]
    },
    {
      'title': 'Contact',
      'link': ''
    }
  ];

  openNav = true;

  constructor() {

  }

  showNav = function () {
    var classAdd = document.getElementsByClassName('navLinks')[0].className;
    var classTest;
    console.log(classAdd);
    if (classAdd.indexOf('displayNav') >= 0) {
      classTest = classAdd.replace('displayNav', ' ').trim();
      this.openNav = true;
    } else {
      classTest = classAdd + ' displayNav';
      this.openNav = false;
    }
    console.log(classTest);
    document.getElementsByClassName('navLinks')[0].className = classTest;
  };

  showSub = function (event, ele) {
    console.log(event);
    console.log(ele)
  };

  route = function (event, links, link, sub) {
    event.preventDefault();
    event.stopPropagation();
    console.log(links);
    for (var prevLink in links) {
      console.log(links[prevLink]);
      if (links[prevLink]['selected']) {
        links[prevLink]['selected'] = false;
      }
      if (links[prevLink]['subLinks']) {
        for (var prevSubLink in links[prevLink]['subLinks']) {
          if (links[prevLink]['subLinks'][prevSubLink]['selected']) {
            links[prevLink]['subLinks'][prevSubLink]['selected'] = false;
          }
        }
      }
    }
    console.log(link);
    link['selected'] = true;
    if (sub) {
      sub['selected'] = true;
    }
  }

}
