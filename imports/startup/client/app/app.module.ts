import { NgModule, ErrorHandler } from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MomentModule } from 'angular2-moment';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
//pages
import { LoginPage } from '../../../ui/pages/auth/login.component';
import { RegisterPage} from '../../../ui/pages/auth/register.component';
import { HomePage } from '../../../ui/pages/home/home.component';
import { MosaiquePage } from '../../../ui/pages/mosaique/mosaique.component';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp, HomePage, MosaiquePage,RegisterPage,LoginPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),MomentModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, HomePage, MosaiquePage,RegisterPage,LoginPage,
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule {}
