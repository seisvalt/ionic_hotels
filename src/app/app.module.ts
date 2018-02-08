import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { ConferenceApp } from './app.component';
import {HotelListPage} from "../pages/hotel-list/hotel-list";
import {HotelProvider} from "../providers/hotel";


@NgModule({
  declarations: [
    ConferenceApp,
    HotelListPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: HotelListPage, name: 'Hotel', segment: 'hotels' },
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    HotelListPage,
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HotelProvider,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule { }
