import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Employee} from "../../models/employee";
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {DataSharingService} from "../../services/datasharing.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  employee: Employee[] = []
  user: User[] = []
  private employeeId: number = Number(this.cookieService.get('empId').valueOf())
  private userId: number = Number(this.cookieService.get('userId').valueOf())

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private dataSharingService: DataSharingService,
              private router: Router
  ) { }

   ngOnInit(): void {
    this.authService.getEmployee(this.employeeId).subscribe(employee => {
      this.employee = employee
    })
    this.authService.getUser(this.userId).subscribe(user => {
      this.user = user
    })
   }

  output() {
    this.router.navigate(['/']).then(() => {
      this.dataSharingService.isUserLoggedIn.next(false)
    })
  }
}
