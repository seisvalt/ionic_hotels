import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';


@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {

  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
