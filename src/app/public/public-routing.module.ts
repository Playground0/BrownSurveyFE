import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component'; 
import { CreateFormComponent } from './components/create-form/create-form.component'; 
import { ViewFormComponent } from './components/view-form/view-form.component'; 
import { LoginComponent } from './components/login/login.component'; 
import { AboutUsComponent } from './components/about-us/about-us.component'; 
import { SubscribePlanComponent } from './components/subscribe-plan/subscribe-plan.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'view-form/:id',
    component: ViewFormComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login/create-user',
    component: LoginComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'plans',
    component: SubscribePlanComponent,
  },
  {
    path: 'create/:formType',
    component: CreateFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
