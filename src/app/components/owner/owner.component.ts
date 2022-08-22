import { Component, OnInit } from '@angular/core';
import {PutRequest, Request} from "../../models/request";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {OwnerService} from "../../services/owner.service";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  requests: Request[] = []
  private userId: number = Number(this.cookieService.get('userId')).valueOf()

  constructor (
    private ownerService: OwnerService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.ownerService.getRequests(this.userId).subscribe(request => {
      this.requests = request
    })
  }


  confirm(requestId: number) {
    const request: PutRequest = {
      reqId: requestId
    }
    this.ownerService.confirmRequest(request).subscribe(response => {
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
    this.ownerService.dismissRequest(request).subscribe(response => {
      if (response != requestId) {
        alert('Действие не удалось!')
      }

      this.ngOnInit()
    })
  }
}

