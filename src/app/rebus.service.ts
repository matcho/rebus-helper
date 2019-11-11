import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RebusService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost/rebus-helper/api/service.php";
  }

  public list() {
    return this.http.get(this.baseUrl + "/rebus");
  }

  public get(id: string) {
    return this.http.get(this.baseUrl + "/rebus/" + id);
  }
}
