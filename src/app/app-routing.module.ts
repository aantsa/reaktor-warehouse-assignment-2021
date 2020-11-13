import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessoriesComponent } from './accessories/accessories.component';
import { HomeComponent } from './home/home.component';
import { JacketsComponent } from './jackets/jackets.component';
import { ShirtsComponent } from './shirts/shirts.component';

const routes: Routes = [
  {path: 'jackets', component: JacketsComponent},
  {path: 'accessories', component: AccessoriesComponent},
  {path: 'shirts', component: ShirtsComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
