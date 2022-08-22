import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataSharingService} from "../../services/datasharing.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  public href = ""
  isUserLoggedIn: boolean;

  constructor(private router: Router, private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value
    })
  }

  ngOnInit(): void {
    this.href = this.router.url
    if (this.isUserLoggedIn == false) {
      this.router.navigate(['/'])
    }
  }
}
