import 'zone.js';
import 'reflect-metadata';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MeteorObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { AppModule } from '../imports/startup/client/app/app.module';

Meteor.startup(() => {
  const subscription = MeteorObservable.autorun().subscribe(() => {
    if (Meteor.loggingIn()) {
      return;
    }

    setTimeout(() => subscription.unsubscribe());
    platformBrowserDynamic().bootstrapModule(AppModule);
  });
});
