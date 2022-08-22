import {Component, OnInit} from "@angular/core";
import {Employee} from "../../models/employee";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {Login} from "../../models/login";
import {CookieService} from "ngx-cookie-service";
import {DataSharingService} from "../../services/datasharing.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit{
  title = 'Авторизация'
  form: FormGroup
  employees: Employee[] = []
  users: User[] = []
  username: string

  constructor (private authService: AuthService,
               private router: Router,
               private cookieService: CookieService,
               private dataSharingService: DataSharingService,
               private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title)

    this.authService.getEmployees().subscribe(employees => {
      this.employees = employees
    })

    this.form = new FormGroup({
      employee: new FormControl(null, [
        Validators.required
      ]),
      user: new FormControl(1, [
        Validators.required
      ]),
      password: new FormControl(1, [
        Validators.required
      ])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const login: Login = {
      employeeId: this.form.value.employee,
      userId: this.form.value.user
    }

    this.authService.login(login).subscribe(data => {
      this.form.reset()
      if (data != 'OK') {
        return
      }
      this.cookieService.set('empId', login.employeeId.toString(), 7)
      this.cookieService.set('userId', login.userId.toString(), 7)
      switch (this.username.substring(0,8)) {
        case 'Админист': {
          this.router.navigate(['admin']).then(() => {
            this.dataSharingService.isUserLoggedIn.next(true)
          })
          break
        }
        case 'Владелец': {
          this.router.navigate(['owner']).then(() => {
            this.dataSharingService.isUserLoggedIn.next(true)
          })
          break
        }
        default: {
          this.router.navigate(['user']).then(() => {
            this.dataSharingService.isUserLoggedIn.next(true)
          })
          break
        }
      }


    })
  }

  onclick(empId: number) {
    this.authService.getUsers(empId).subscribe(users => {
      this.users = users
    })
  }
}
