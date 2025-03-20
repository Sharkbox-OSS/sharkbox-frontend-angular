import { inject, Injectable } from "@angular/core";
import { Box } from "../box/box.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  httpClient = inject(HttpClient);

  getThreadsForBox(slug: string): Observable<Thread[]> {
    return this.httpClient.get<Thread[]>(`/api/v1/box/${slug}/threads`);
  }
}

export interface Thread {
  id: number;
  title: string;
  type: string;
  content: string;
  mimeType: string;
  description: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  box: Box;
}
