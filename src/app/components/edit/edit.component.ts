import {Component} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {Router} from "@angular/router"
import {CookieService} from "ngx-cookie-service"
import {Service} from "../../models/service"
import {Role} from "../../models/role"
import {PutRequest} from "../../models/request"
import {EditService} from "../../services/edit.service"
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  title = 'Редактирование заявки'
  form: FormGroup
  services: Service[] = []
  roles: Role[] = []
  private userId: number = Number(this.cookieService.get('userId')).valueOf()
  public serviceIdEdit: number = Number(this.cookieService.get('serviceIdEdit')).valueOf()
  public roleIdEdit: number = Number(this.cookieService.get('roleIdEdit')).valueOf()

  constructor (
    private editService: EditService,
    private router: Router,
    public cookieService: CookieService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title)

    this.editService.getServices().subscribe(data => {
      this.services = data
    })
    this.editService.getRoles(this.userId).subscribe(data => {
      this.roles = data
    })

    this.form = new FormGroup({
      service: new FormControl(this.serviceIdEdit, [
        Validators.required
      ]),
      role: new FormControl(this.roleIdEdit, [
        Validators.required
      ]),
      coment: new FormControl(this.cookieService.get('comentEdit')!='null'?this.cookieService.get('comentEdit'):'', [
        Validators.maxLength(1000)
      ])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const request: PutRequest = {
      reqId: Number(this.cookieService.get('requestIdEdit')),
      serviceId: this.form.value.service,
      roleId: this.form.value.role,
      coment: this.form.value.coment
    }

    this.editService.editRequest(request).subscribe(data => {
      if (data == 'NOT_FOUND') {
        return alert('Запрос не найден в базе!')
      }
      if (data == 'NOT_MODIFIED') {
        return alert('У этой роли нет доступа к выбранному сервису!')
      } else {
        return this.router.navigate(["user"])
      }
    })
  }
}
