import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  constructor(private http: HttpClient) {
  }

  retrieveBoxes(): Observable<any[]> {
    return this.http.get<any[]>('/api/v1/box');
  }
}
