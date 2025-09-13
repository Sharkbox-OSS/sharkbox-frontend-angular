import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  httpClient = inject(HttpClient);

  retrieveBoxes(): Observable<Box[]> {
    return this.httpClient.get<Box[]>('/api/v1/box');
  }

  retrieveBox(slug: string): Observable<Box> {
    return this.httpClient.get<Box>(`/api/v1/box/${slug}`);
  }

  createBox(name: string | null, slug: string | null, description: string | null, access = 'PUBLIC'): Observable<Box> {
    return this.httpClient.post<Box>('/api/v1/box', {
      name,
      slug,
      description,
      access
    });
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
