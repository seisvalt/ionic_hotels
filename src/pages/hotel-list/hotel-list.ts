import { Component } from '@angular/core';

import {
  ActionSheet,
  ActionSheetController,
  ActionSheetOptions,
  Config,
  NavController
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HotelProvider } from '../../providers/hotel';
import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';

// TODO remove
export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean|void;
};

@Component({
  selector: 'page-hotel-list',
  templateUrl: 'hotel-list.html'
})
export class HotelListPage {
  actionSheet: ActionSheet;
  hotels: any[] = [];
  assets : string  = "../assets/img";
  url_img : string  = "/hotels/";
  url_amenities : string  = "/amenities/";
  extension :string = ".svg";

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: HotelProvider,
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) {}

  ionViewDidEnter() {
    console.log("cargando");
    this.confData.getHotels().subscribe((hotels: any[]) => {
      this.hotels = hotels;
    });
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, { sessionId: session.id });
  }

  goToSpeakerDetail(hotel: any) {
    this.navCtrl.push(SpeakerDetailPage, { speakerId: hotel.id });
  }

  goToSpeakerTwitter(hotel: any) {
    this.inAppBrowser.create(
      `https://twitter.com/${hotel.twitter}`,
      '_blank'
    );
  }

  openSpeakerShare(hotel: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + hotel.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log('Copy link clicked on https://twitter.com/' + hotel.twitter);
            if ( (window as any)['cordova'] && (window as any)['cordova'].plugins.clipboard) {
              (window as any)['cordova'].plugins.clipboard.copy(
                'https://twitter.com/' + hotel.twitter
              );
            }
          }
        } as ActionSheetButton,
        {
          text: 'Share via ...'
        } as ActionSheetButton,
        {
          text: 'Cancel',
          role: 'cancel'
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }

  openContact(hotel: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + hotel.name,
      buttons: [
        {
          text: `Email ( ${hotel.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + hotel.email);
          }
        } as ActionSheetButton,
        {
          text: `Call ( ${hotel.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + hotel.phone);
          }
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }
}
