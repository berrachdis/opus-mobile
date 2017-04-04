import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Meteor } from 'meteor/meteor';
import { HomePage } from '../../../ui/pages/home/home.component';
import { MosaiquePage } from '../../../ui/pages/mosaique/mosaique.component';
import { RegisterPage } from '../../../ui/pages/auth/register.component';
import template from "./app.html";

@Component({
  template
})
export class MyApp {
  rootPage: any;

  constructor(platform : Platform) {
    this.rootPage = Meteor.user() ? MosaiquePage : MosaiquePage;

    platform.ready().then(() => {
        console.log(platform);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (platform.is('cordova')) {
        StatusBar.styleDefault();
        Splashscreen.hide();
      }
    });
  }
}
