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

  public add(mots: string[], images: string[], solution: string) {
    const date = new Date().getTime();
    return this.http.post(this.baseUrl, { mots, images, solution, date });
  }
}
