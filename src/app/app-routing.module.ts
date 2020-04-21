import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { LoginComponent } from './login/login.component';
import { CaseEntryComponent } from './case-entry/case-entry.component';
import { AppComponent } from './app.component';

const routes: Routes = [

  { path: '', component: DashboardComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'cases', component: CaseEntryComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'dashboard' }];

  @NgModule({
    imports: [RouterModule.forRoot(routes,{useHash:true})],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

  export const routing = RouterModule.forRoot(routes,{useHash:true});
