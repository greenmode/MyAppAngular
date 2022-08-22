import { Component, OnInit } from '@angular/core'
import {PutRequest, Request} from "../../models/request"
import {Router} from "@angular/router"
import {CookieService} from "ngx-cookie-service"
import {AdminService} from "../../services/admin.service"
import {Title} from "@angular/platform-browser"
import {Role} from "../../models/role"
import {ServiceId} from "../../models/service"
import {User} from "../../models/user"

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title = "Администратор"
  requests: Request[] = []
  roles: Role[] = []
  users: String[] = []
  count_of_complited_requests_to_the_service: number = 0
  count_of_service_requests: number = 0
  private userId: number = Number(this.cookieService.get('userId')).valueOf()

  constructor (
    private adminService: AdminService,
    private router: Router,
    private cookieService: CookieService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title)

    this.adminService.getRequests(this.userId).subscribe(request => {
      this.requests = request
    })
  }

  confirm(requestId: number) {
    const request: PutRequest = {
      reqId: requestId
    }
    this.adminService.confirmRequest(request).subscribe(response => {
      if (response != requestId) {
        alert('Действие не удалось!')
      }

      this.ngOnInit()
    })
  }

  dismiss(requestId: number) {
    const request: PutRequest = {
      reqId: requestId
    }
    this.adminService.dismissRequest(request).subscribe(response => {
      if (response != requestId) {
        alert('Действие не удалось!')
      }

      this.ngOnInit()
    })
  }

  getRoles(serviceId: number): void {
    const request: ServiceId = {serviceId: serviceId}
    this.adminService.getRoles(request).subscribe(data => {
      this.roles = data
    })

    this.adminService.getUsers(request).subscribe(data => {
      this.users = uniq_fast(data)
      function uniq_fast(a:User[]) {
        let users = []
        let len = a.length
        firstcycle: for(let i=0; i<len; i++) {
          for(let j=0; j<=i; j++) {
            if (users[j] == a[i].username) {
              continue firstcycle
            }
          }
          users[i] = a[i].username
        }
        return users
      }
    })

    this.adminService.countOfServiceRequests(request).subscribe(data => {
      this.count_of_service_requests = data
    })

    this.adminService.countOfComplitedRequestsToTheService(request).subscribe(data => {
      this.count_of_complited_requests_to_the_service = data
    })
  }
}
