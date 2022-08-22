import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {PutRequest, Request} from "../models/request";
import {ServiceId} from "../models/service";
import {Role} from "../models/role";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  getRequests(userId: number): Observable<Request[]> {
    return this.http.get<Request[]>("http://localhost:8081/api/admin", {
      params: new HttpParams().append('userId', userId)
    })
  }

  confirmRequest(request: PutRequest): Observable<number> {
    return this.http.post<number>("http://localhost:8081/api/admin/confirm", request)
  }

  dismissRequest(request: PutRequest): Observable<number> {
    return this.http.post<number>("http://localhost:8081/api/admin/dismiss", request)
  }

  getRoles(request: ServiceId): Observable<Role[]> {
    return this.http.post<Role[]>("http://localhost:8081/api/admin/get_all_roles", request)
  }
  getUsers(request: ServiceId): Observable<User[]> {
    return this.http.post<User[]>("http://localhost:8081/api/admin/get_all_users", request)
  }
  countOfServiceRequests(request: ServiceId): Observable<number> {
    return this.http.post<number>("http://localhost:8081/api/admin/count_of_service_requests", request)
  }
  countOfComplitedRequestsToTheService(request: ServiceId): Observable<number> {
    return this.http.post<number>("http://localhost:8081/api/admin/count_of_complited_requests_to_the_service", request)
  }
}
