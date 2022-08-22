import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

import {Service, ServiceId, ServiceInterface} from "../models/service";
import {Role} from "../models/role";
import {PutRequest, Request} from "../models/request";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>("http://localhost:8081/api/get_services",)
  }
  getService(serviceId: number): Observable<ServiceInterface> {
    return this.http.get<ServiceInterface>("http://localhost:8081/api/get_service", {
      params: new HttpParams().append('serviceId', serviceId)
    })
  }
  getRoles(userId: number): Observable<Role[]> {
    return this.http.get<Role[]>("http://localhost:8081/api/get_roles", {
      params: new HttpParams().append('userId', userId)
    })
  }
  getRequests(userId: number): Observable<Request[]> {
    return this.http.get<Request[]>("http://localhost:8081/api/get_requests", {
      params: new HttpParams().append('userId', userId)
    })
  }
  addRequest(request: PutRequest): Observable<any> {
    return this.http.put<PutRequest[]>("http://localhost:8081/api/put_request", request)
  }
  removeRequest(requestId: number): Observable<Request[]> {
    confirm('Вы уверены?')
    return this.http.delete<Request[]>("http://localhost:8081/api/remove", {
      params: new HttpParams().append('requestId', requestId)
    })
  }
  getSysRoles(request: ServiceId): Observable<Role[]> {
    return this.http.post<Role[]>("http://localhost:8081/api/user/get_sys_roles", request)
  }
}
