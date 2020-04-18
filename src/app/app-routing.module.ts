import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { LoginComponent } from './login/login.component';
import { CaseEntryComponent } from './case-entry/case-entry.component';

const routes: Routes = [

  {
      path: '',
      component: SiteLayoutComponent,
      children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'login', component: LoginComponent },
        { path: 'cases', component: CaseEntryComponent }
      ]
  },

  //no layout routes
  //{ path: 'login', component: LoginComponent},
  //{ path: 'register', component: RegisterComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }];

  @NgModule({
    imports: [RouterModule.forRoot(routes,{useHash:true})],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

  export const routing = RouterModule.forRoot(routes,{useHash:true});
