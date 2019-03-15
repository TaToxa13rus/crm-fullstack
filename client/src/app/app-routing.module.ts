import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent }
    ]
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'overview', component: OverviewPageComponent },
      { path: 'analytics', component: AnalyticsPageComponent },
      { path: 'history', component: HistoryPageComponent },
      { path: 'order', component: OrderPageComponent },
      { path: 'categories', component: CategoriesPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
