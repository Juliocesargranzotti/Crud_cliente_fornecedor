import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { HomeComponent } from './home/home.component';
import { SupplierComponent } from './supplier/supplier.component';

const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'supplier', component: SupplierComponent},
  {path: 'clientes', component: ClientesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
