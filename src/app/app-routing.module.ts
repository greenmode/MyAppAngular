import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./components/auth/auth.component";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {UserComponent} from "./components/user/user.component";
import {ShowserviceComponent} from "./components/showservice/showservice.component";
import {EditComponent} from "./components/edit/edit.component";
import {AdminComponent} from "./components/admin/admin.component";
import {OwnerComponent} from "./components/owner/owner.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: AuthComponent },
      { path: 'auth', component: AuthComponent },
      { path: 'user', component: UserComponent },
      { path: 'showservice/:serviceId', component: ShowserviceComponent },
      { path: 'edit', component: EditComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'owner', component: OwnerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
