import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

/*
 Generated class for the SensorProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class HotelProvider {
  private usersSubject = new BehaviorSubject([]);
  data: any;

  constructor(public http: Http) {
    console.log('Hello SensorProvider Provider');
  }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('http://127.0.0.1:3000/users')
        .map(this.processData, this);
    }
  }

  find(name: String): any {
    var retorno: any;
    retorno = this.http.get('http://127.0.0.1:3000/users/'+name)
      .map(this.processData, this);
      return retorno;
  }

  private refresh() {
    // Emitir los nuevos valores para que todos los que dependan se actualicen.
    this.usersSubject.next(this.data);
  }

  processData(data: any) {
    this.data = data.json();
    this.refresh();
    return this.data;
  }

  getHotels() {
    return  this.load();
  }

}
