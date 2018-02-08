import { Component, ViewChild } from '@angular/core';

import {App, Events, MenuController, Nav, Platform} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import {HotelListPage} from "../pages/hotel-list/hotel-list";
import {HotelProvider} from "../providers/hotel";


export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html',
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Hotels', name: 'Hotel', component: null, tabComponent: HotelListPage, index: 1, icon: 'contacts' },
  ];
  loggedInPages: PageInterface[] = [
  ];
  loggedOutPages: PageInterface[] = [
  ];

  type_search = {
    name: '',
    starts: ''
  };

  rootPage: any;

  constructor(
    public events: Events,
    public menu: MenuController,
    public platform: Platform,
    public confData: HotelProvider,
    public storage: Storage,
    public splashScreen: SplashScreen,
    private app: App
  ) {
    this.app._setDisableScroll(true);
    this.rootPage = HotelListPage;
    confData.load();



  }

  findHotels() {
    console.log(this.type_search);
    this.confData.find(this.type_search.name).subscribe((hotels: any[]) => {
      console.log(hotels);
      this.openPage(this.appPages[0]);
    });
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
}
