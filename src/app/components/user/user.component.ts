import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Service, ServiceId} from "../../models/service";
import {Role} from "../../models/role";
import {PutRequest, Request} from "../../models/request";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  title = 'Заявки пользователя'
  form: FormGroup
  services: Service[] = []
  roles: Role[] = []
  sysRoles: string =''
  requests: Request[] = []
  private userId: number = Number(this.cookieService.get('userId')).valueOf()

  constructor (
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title)

    this.userService.getServices().subscribe(data => {
      this.services = data
    })

    this.userService.getRoles(this.userId).subscribe(data => {
      this.roles = data
    })

    this.userService.getRequests(this.userId).subscribe(data => {
      this.requests = data
    })

    this.form = new FormGroup({
      service: new FormControl(null, [
        Validators.required
      ]),
      role: new FormControl(null, [
        Validators.required
      ]),
      comment: new FormControl(null, [
        Validators.maxLength(1000)
      ])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const request: PutRequest = {
      employeeId: Number(this.cookieService.get('empId')),
      userId: Number(this.cookieService.get('userId')),
      serviceId: this.form.value.service,
      roleId: this.form.value.role,
      coment: this.form.value.comment
    }

    this.userService.addRequest(request).subscribe(data => {
      if (data == 'NOT_ACCEPTABLE') {
        return alert('У этой роли нет доступа к выбранному сервису!')
      } else {
        this.userService.getRequests(this.userId).subscribe(data => {
          this.requests = data
        })
      }
    })
  }

  edit(requestId: number, serviceId: number, roleId: number, coment: string) {
    this.cookieService.set('requestIdEdit', requestId.toString(), 1)
    this.cookieService.set('serviceIdEdit', serviceId.toString(), 1)
    this.cookieService.set('roleIdEdit', roleId.toString(), 1)
    this.cookieService.set('comentEdit', coment, 1)
    this.router.navigate(['edit'])
  }
  remove(requestId: number) {
    this.userService.removeRequest(requestId).subscribe(() => {
      this.userService.getRequests(this.userId).subscribe(data => {
        this.requests = data
      })
    })
  }
  getSysRoles(serviceId: number, reqId: number) {
    const request: ServiceId = {serviceId: serviceId}
    this.userService.getSysRoles(request).subscribe(data => {
      data.forEach(data => {
        this.sysRoles = this.sysRoles + data.role + '<br />'
      })
      console.log(document.getElementById('small'+reqId)!.innerText)
      if (document.getElementById('small'+reqId)!.innerText == '') {
        document.getElementById('small' + reqId)!.innerHTML = '<br />'+this.sysRoles
      } else {
        document.getElementById('small'+reqId)!.innerText = ''
        this.sysRoles = ''
      }
    })
  }
}
