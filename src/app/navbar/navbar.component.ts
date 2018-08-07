import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;

  constructor(private element: ElementRef, public location: Location, private router: Router) {
    this.sidebarVisible = false;
    router.events.subscribe((val) => {
      const title: any = this.location.prepareExternalUrl(this.location.path());
      if (title !== '/login' && title !== '/register') {
        const auth = document.getElementById('auth');
        auth.setAttribute('style', 'display:none;');

        const authss = document.getElementById('authsuccess');
        authss.setAttribute('style', 'display:inherit;');

        const ee = document.getElementById('my-nav');
        ee.classList.remove('navbar-transparent');
      } else {
        const auth = document.getElementById('auth');
        auth.setAttribute('style', 'display:inherit;');

        const authss = document.getElementById('authsuccess');
        authss.setAttribute('style', 'display:none;');

        const ee = document.getElementById('my-nav');
        ee.classList.add('navbar-transparent');
      }
    });
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');
    this.sidebarVisible = true;
  }

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }

  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  logout() {
    window.localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
