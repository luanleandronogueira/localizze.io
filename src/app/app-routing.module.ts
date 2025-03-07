import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard/dashboard.page';
import { CadastraRotaPage } from './cadastra-rota/cadastra-rota.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardPage,
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'cadastra-rota', component: CadastraRotaPage,
    loadChildren: () => import('./cadastra-rota/cadastra-rota.module').then( m => m.CadastraRotaPageModule)
  },
  {
    path: 'finaliza-rota/:id_rota',
    loadChildren: () => import('./finaliza-rota/finaliza-rota.module').then( m => m.FinalizaRotaPageModule)
  },
  {
    path: 'finaliza-rota',
    loadChildren: () => import('./finaliza-rota/finaliza-rota.module').then( m => m.FinalizaRotaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
