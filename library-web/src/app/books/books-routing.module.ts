import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookListComponent } from './pages/book-list/book-list.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';

const routes: Routes = [
  { path: '', component: BookListComponent, title: 'Libros' },
  { path: ':id', component: BookDetailComponent, title: 'Detalle del libro' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
