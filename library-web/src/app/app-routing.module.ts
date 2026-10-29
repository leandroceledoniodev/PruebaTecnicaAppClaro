import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'books' },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then((m) => m.BooksModule),
  },
  {
    path: 'authors',
    loadChildren: () => import('./authors/authors.module').then((m) => m.AuthorsModule),
  },
  { path: '**', redirectTo: 'books' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
