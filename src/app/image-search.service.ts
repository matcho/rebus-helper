import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ImageSearchService {

  private customSearchEngineID: string;
  private apiKey: string;

  constructor(private http: HttpClient) {
    this.customSearchEngineID = CONFIG.google_search.search_engine_id;
    this.apiKey = CONFIG.google_search.api_key;
  }

  public search(q: string) {
    const apiUrl = 'https://www.googleapis.com/customsearch/v1?searchType=image&';
    const searchUrl = apiUrl + 'cx=' + this.customSearchEngineID + '&key=' + this.apiKey + '&q=' + q;
    return this.http.get(searchUrl);
  }
}
