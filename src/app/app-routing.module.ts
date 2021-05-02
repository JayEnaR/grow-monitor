import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigComponent } from './config/config/config.component';
import { MonitorComponent } from "./monitor/monitor.component";
import { AuthGuardService as AuthGuard } from "./services/auth-guard.service";

const routes: Routes = [
  {path: '', component: MonitorComponent},
  {path: 'config', component: ConfigComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
