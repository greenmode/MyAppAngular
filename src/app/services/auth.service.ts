import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/employee";
import {User} from "../models/user";
import {Login} from "../models/login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>("http://localhost:8081/api/auth")
  }
  getUsers(empId: number): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8081/api/auth/", {
      params: new HttpParams().append('empId', empId)
    })
  }
  login(login: Login): Observable<any> {
    return this.http.post(`http://localhost:8081/api/auth/enter`, login)

  }

  getEmployee(employeeId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>("http://localhost:8081/api/employee", {
      params: new HttpParams().append('employeeId', employeeId)
    })
  }
  getUser(userId: number): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8081/api/user", {
      params: new HttpParams().append('userId', userId)
    })
  }
}
