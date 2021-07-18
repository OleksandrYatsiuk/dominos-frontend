import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'pizza', loadChildren: () => import('./pizza/pizza.module').then(mod => mod.PizzaModule) }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]

})
export class ProductsRoutingModule { }
