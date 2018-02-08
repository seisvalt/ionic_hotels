import { Component } from '@angular/core';

import {
  ActionSheet,
  ActionSheetController,
  Config,
  NavController
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HotelProvider } from '../../providers/hotel';


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



  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
      items.push(i);
    }
    return items;
  }

}
