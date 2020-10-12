import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'hero'
},
{
  path: 'hero',
  loadChildren: () => import('./hero/hero.module').then(m => m.HeroModule)
},
{
  path: 'contato',
  loadChildren: () => import('./contato/contato.module').then(m => m.ContatoModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
