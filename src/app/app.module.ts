import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserComponent} from "./components/user/user.component";
import {HttpClientModule} from "@angular/common/http";
import {AuthComponent} from "./components/auth/auth.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {HeaderComponent} from "./layout/header/header.component";
import {FooterComponent} from "./layout/footer/footer.component";
import {ShowserviceComponent} from "./components/showservice/showservice.component";
import {EditComponent} from "./components/edit/edit.component";
import { OwnerComponent } from './components/owner/owner.component';
import {AdminComponent} from "./components/admin/admin.component";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AuthComponent,
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    ShowserviceComponent,
    EditComponent,
    OwnerComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
