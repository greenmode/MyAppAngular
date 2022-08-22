import {Component, OnInit} from "@angular/core";
import {Service, ServiceInterface} from "../../models/service";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-showservice',
  templateUrl: './showservice.component.html',
  styleUrls: ['./showservice.component.scss']
})
export class ShowserviceComponent implements OnInit{
  title: 'Сервис'
  service$: Observable<ServiceInterface>

  constructor (
    private userService: UserService,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title)

    this.service$ = this.route.params.pipe(switchMap((params: Params) => {
      return this.userService.getService(params['serviceId'])
    }))
  }
}
