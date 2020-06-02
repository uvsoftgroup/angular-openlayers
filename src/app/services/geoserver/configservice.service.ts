import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigserviceService {
  private separator = '/';
  private proxyConfigUrl = '/geoservermapservice';
  baseurl: any;

  public constructor(private http: HttpClient) {
    this.baseurl = http.get('/geoservermapservice');
    console.log('--------------geoservermapservice:' + this.baseurl);
  }
  public getGeoUrl() {
    return this.proxyConfigUrl;

  }
}
