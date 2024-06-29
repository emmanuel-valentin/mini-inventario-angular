import { Routes } from '@angular/router';

import { CategoriasPageComponent } from './pages/categorias/categorias-page/categorias-page.component';
import { NewCategoriaPageComponent } from './pages/categorias/new-categoria-page/new-categoria-page.component';
import { NewProductoPageComponent } from './pages/productos/new-producto-page/new-producto-page.component';
import { ProductosPageComponent } from './pages/productos/productos-page/productos-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/categories',
    pathMatch: 'full',
  },
  {
    path: 'categories',
    component: CategoriasPageComponent,
  },
  {
    path: 'categories/edit/:id',
    component: NewCategoriaPageComponent,
  },
  {
    path: 'new-category',
    component: NewCategoriaPageComponent,
  },
  {
    path: 'products',
    component: ProductosPageComponent,
  },
  {
    path: 'products/edit/:id',
    component: NewProductoPageComponent,
  },
  {
    path: 'new-product',
    component: NewProductoPageComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
