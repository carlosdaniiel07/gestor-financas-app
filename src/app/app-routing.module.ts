import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RouteGuard } from './route.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canLoad: [ RouteGuard ] },
  { path: 'categorias', loadChildren: './categorias/categorias.module#CategoriasPageModule', canLoad: [ RouteGuard ] },
  { path: 'subcategorias', loadChildren: './subcategorias/subcategorias.module#SubcategoriasPageModule', canLoad: [ RouteGuard ] },
  { path: 'contas', loadChildren: './contas/contas.module#ContasPageModule', canLoad: [ RouteGuard ] },
  { path: 'tipos-conta', loadChildren: './tipos-conta/tipos-conta.module#TiposContaPageModule', canLoad: [ RouteGuard ] },
  { path: 'projetos', loadChildren: './projetos/projetos.module#ProjetosPageModule', canLoad: [ RouteGuard ] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
