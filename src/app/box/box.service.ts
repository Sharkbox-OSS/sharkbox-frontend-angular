import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  constructor(private http: HttpClient) {
  }

  retrieveBoxes(): Observable<Box[]> {
    return this.http.get<Box[]>('/api/v1/box');
  }

  retrieveBox(slug: string): Observable<Box> {
    return this.http.get<Box>(`/api/v1/box/${slug}`);
  }
}

export interface Box {
  id: number;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  access: string;
}
