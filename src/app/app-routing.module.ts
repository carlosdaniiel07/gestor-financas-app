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
  { path: 'subcategorias', loadChildren: './subcategorias/subcategorias.module#SubcategoriasPageModule', canLoad: [ RouteGuard ] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
