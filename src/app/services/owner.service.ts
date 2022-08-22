import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {PutRequest, Request} from "../models/request";

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  constructor(private http: HttpClient) { }

  getRequests(userId: number): Observable<Request[]> {
    return this.http.get<Request[]>("http://localhost:8081/api/owner", {
      params: new HttpParams().append('userId', userId)
    })
  }

  confirmRequest(request: PutRequest): Observable<number> {
    return this.http.post<number>("http://localhost:8081/api/owner/confirm", request)
  }

  dismissRequest(request: PutRequest): Observable<number> {
    return this.http.post<number>("http://localhost:8081/api/owner/dismiss", request)
  }
}
