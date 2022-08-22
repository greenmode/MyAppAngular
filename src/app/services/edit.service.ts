import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

import {Service} from "../models/service";
import {Role} from "../models/role";
import {PutRequest} from "../models/request";

@Injectable({
  providedIn: 'root'
})
export class EditService {
  constructor(private http: HttpClient) {
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>("http://localhost:8081/api/get_services",)
  }

  getRoles(userId: number): Observable<Role[]> {
    return this.http.get<Role[]>("http://localhost:8081/api/get_roles", {
      params: new HttpParams().append('userId', userId)
    })
  }

  editRequest(request: PutRequest): Observable<any> {
    console.log('request to api')
    return this.http.put<PutRequest[]>("http://localhost:8081/api/edit_request", request)
  }
}
